import * as path from "path";
import * as fs from "fs";
import { ipcMain, TouchBar, BrowserWindow, WebContents } from "electron";
import { ItemAction, IpcEvent, TouchBarItem, ItemType } from "./types";
import { debug } from "./util";

interface CreatePayload {
  id: string;
  items: TouchBarItem[];
  registerOnly?: boolean;
}

interface DestroyPayload {
  id: string;
  prevId?: string;
}

interface UpdatePayload {
  parent: string;
  id: string;
  props: Record<string, any>;
}

interface ItemObject {
  id: string;
  instance: ReturnType<typeof createItem>;
}

/**
 * Holds all TouchBar definitions so we can update them & restore previous
 * states.
 */
let touchBarInstances: Record<
  string,
  {
    items: ItemObject[];
  }
> = {};

/**
 * Resolve icon path from the current script directory.
 */
function resolveIcon(id: string, icon?: string) {
  if (!icon) return null;

  const iconPath = path.normalize(`${__dirname}/${icon}`);

  if (fs.existsSync(iconPath)) return iconPath;

  debug(
    `Tried to resolve icon path for item "${id}" but the path doesn’t exist (${iconPath})`
  );

  return null;
}

/**
 * Some child items like (eg. Scrubber/Segmented Control) might have an `icon`.
 * We need to resolve its path correctly.
 */
function resolveIconForItems<T extends { icon: string }>(
  id: string,
  items: T[]
) {
  return items.map((item) => ({
    ...item,
    icon: resolveIcon(id, item.icon),
  }));
}

/**
 * Create action handler for a given item.
 */
function bindItemAction(parent: WebContents, id: string, action: ItemAction) {
  return (args: any) => {
    debug(`User action "${action}" on item "${id}"`);

    parent.send(IpcEvent.itemAction, { id, action, args });
  };
}

/**
 * Create a TouchBar item instance from item definition.
 */
function createItem(parent: WebContents, item: TouchBarItem) {
  const isGroupLike = [
    ItemType.TouchBarGroup,
    ItemType.TouchBarPopover,
  ].includes(item.type);

  // Bind events
  const events = {
    click: bindItemAction(parent, item.id, ItemAction.click),
    highlight: bindItemAction(parent, item.id, ItemAction.click),
    change: bindItemAction(parent, item.id, ItemAction.change),
    select: bindItemAction(parent, item.id, ItemAction.change),
  };

  debug(
    `Creating a new item of type "${item.type}" (id: "${item.id}") with props:`,
    item.props
  );

  // Resolve any icon paths
  if (item.props.icon) {
    item.props.icon = resolveIcon(item.id, item.props.icon);
  }

  // Segments and items need to be mapped to correctly resolve the icon prop.
  if (item.props.segments?.length) {
    item.props.segments = resolveIconForItems(item.id, item.props.segments);
  }
  if (!isGroupLike && item.props.items?.length) {
    item.props.items = resolveIconForItems(item.id, item.props.items);
  }

  // Popover and group items need to be inside of another TouchBar instance
  if (isGroupLike) {
    item.props.items = new TouchBar({
      items: touchBarInstances[item.id].items.map(({ instance }) => instance),
    });
  }

  return new TouchBar[item.type]({ ...item.props, ...events });
}

/**
 * Create a TouchBar instance. Mutates `touchBarInstances`
 */
function createTouchBarInstance(parent: WebContents, payload: CreatePayload) {
  // Map item definitions to native instances
  const items = payload.items.map((item) => ({
    id: item.id,
    instance: createItem(parent, item),
  }));

  // Save for later so we can update the items
  touchBarInstances[payload.id] = { items };

  if (payload.registerOnly) return;

  return new TouchBar({ items: items.map(({ instance }) => instance) });
}

/**
 * Update props on a TouchBar item. Mutates the original item.
 */
function updateTouchBarItem(item: ItemObject, prop: string, value: any) {
  switch (prop) {
    case "icon":
      // @ts-expect-error
      item.instance[prop] = resolveIcon(item.id, value);
      break;
    case "items":
    case "segments":
      // @ts-expect-error
      item.instance[prop] = resolveIconForItems(item.id, value);
      break;
    default:
      // @ts-expect-error
      item.instance[prop] = value;
  }
}

/**
 * Decorate BrowserWindow to correctly handle updates & events from and to renderer.
 */
export function decorateWindow(browserWindow: BrowserWindow) {
  ipcMain.on(IpcEvent.create, (event, payload: CreatePayload) => {
    debug("Received create event with payload", payload);

    const touchBarInstance = createTouchBarInstance(event.sender, payload);

    /**
     * Child TouchBars (Groups/Popovers) are registered only, we don’t want to
     * set them immediately, we just need to save their native representation so
     * we can add them as items to the currently active TouchBar.
     */
    if (!touchBarInstance || payload.registerOnly) return;

    browserWindow.setTouchBar(touchBarInstance);
  });

  ipcMain.on(IpcEvent.destroy, (_event, payload: DestroyPayload) => {
    debug("Received destroy event with payload", payload);

    delete touchBarInstances[payload.id];

    let prevItems: ItemObject[] = [];
    if (payload.prevId) {
      if (touchBarInstances[payload.prevId]) {
        prevItems = touchBarInstances[payload.prevId].items ?? [];
      } else {
        debug(
          `Tried restoring previous TouchBar instance with id "${payload.prevId}" but it doesn’t exist. Possible ids:`,
          Object.keys(touchBarInstances)
        );
      }
    }

    browserWindow.setTouchBar(
      new TouchBar({ items: prevItems.map(({ instance }) => instance) })
    );
  });

  ipcMain.on(IpcEvent.updateitem, (_event, payload: UpdatePayload) => {
    const item = touchBarInstances[payload.parent]?.items.find(
      (item) => item.id === payload.id
    );

    if (!item) {
      debug(
        `Tried to update item with id "${payload.id}" but it does not exist!`
      );
      return;
    }

    debug(`Updating item with id "${payload.id}" with props:`, payload.props);

    /**
     * Go through the `keys` of the payload and set the value to the item
     * instance. Instance props are reactive, so they’ll update the TouchBar
     * automatically.
     */
    Object.keys(payload.props).forEach((prop) =>
      updateTouchBarItem(item, prop, payload.props[prop])
    );
  });
}
