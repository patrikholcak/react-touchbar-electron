import * as React from "react";
import { EventEmitter } from "events";
import { getTouchbarAPI, isElectron, uuid } from "../util";
import { TouchBarContext } from "../context";
import { IpcEvent, EventPayload, TouchBarItem } from "../types";

const touchbarAPI = getTouchbarAPI();

export interface TouchBarProps {
  /**
   * Unique identificator for this TouchBar instance. Useful when you want to
   * restore a previous TouchBar (eg. restore from modal)
   *
   */
  id?: string;

  prevId?: string;

  enabled?: "auto" | boolean;

  children: React.ReactNode;
}

function TouchBarComponent(props: TouchBarProps) {
  /**
   * Set-up a state which tracks if the context provider should render
   */
  const [enabled, setEnabled] = React.useState<boolean>(false);

  /**
   * Set-up a state which holds the item definitions.
   */
  const [items, setItems] = React.useState<TouchBarItem[]>([]);

  /**
   * Each TouchBar has its own unique ID. This can be used to restore a previous
   * TouchBar instance on unmount, which could be useful for dialogs.
   */
  const id = React.useRef(props.id ?? uuid());

  /**
   * Event emitter serves as a way to subscribe to item actions. This way items
   * can handle the event disposal/handler update themselves.
   */
  const emitter = React.useRef(new EventEmitter());
  const handleItemAction = React.useRef((_evt: any, args: EventPayload) =>
    emitter.current.emit(args.action, args)
  );

  React.useEffect(() => {
    // Check if not defined or "auto", then use auto detect
    if (props.enabled === undefined || props.enabled === "auto") {
      setEnabled(isElectron());
    } else {
      setEnabled(props.enabled);
    }
  }, []);

  React.useEffect(() => {
    /**
     * Send the registered items to electron to construct the new TouchBar.
     */
    touchbarAPI.send(IpcEvent.create, {
      id: id.current,
      items,
      // @ts-expect-error - "private" property
      registerOnly: props.registerOnly,
    });

    /**
     * Set-up and register item action handler. We only have one listener per
     * TouchBar instance.
     */
    touchbarAPI.on(IpcEvent.itemAction, handleItemAction.current);

    return () => {
      touchbarAPI.send(IpcEvent.destroy, {
        id: id.current,
        prevId: props.prevId,
      });
      touchbarAPI.removeListener(IpcEvent.itemAction, handleItemAction.current);
    };
  }, [items]);

  /**
   * Create context values
   */
  const addItem = React.useRef((item: TouchBarItem) => {
    // Register child at a particular index — serves as order
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(item.childIndex, 0, item);

      return newItems;
    });
  });

  const removeItem = React.useRef((id: string) =>
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  );

  const updateItem = React.useRef((payload: { id: string; props: any }) => {
    // Update in state
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        }

        return item;
      })
    );

    // Send to electron window
    touchbarAPI.send(IpcEvent.updateitem, {
      parent: id.current,
      id: payload.id,
      props: payload.props,
    });
  });

  const value = React.useRef({
    emitter: emitter.current,
    addItem: addItem.current,
    removeItem: removeItem.current,
    updateItem: updateItem.current,
  });

  if (!enabled) {
    return null;
  }

  return (
    <TouchBarContext.Provider value={value.current}>
      {React.Children.map(props.children, (child, childIndex) =>
        React.isValidElement(child)
          ? // Add index prop to every child so we can preserve order
            React.cloneElement(child, { childIndex })
          : child
      )}
    </TouchBarContext.Provider>
  );
}

export const TouchBar = React.memo(TouchBarComponent);
