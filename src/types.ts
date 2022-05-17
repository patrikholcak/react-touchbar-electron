export enum IpcEvent {
  create = "createTouchBarInstance",
  destroy = "destroyTouchBarInstance",
  updateitem = "updateTouchBarItem",
  itemAction = "touchBarItemAction",
}

export enum ItemAction {
  click = "click",
  change = "change",
}

export interface EventPayload {
  id: string;
  action: ItemAction;
  args: any;
}

export enum ItemType {
  TouchBarButton = "TouchBarButton",
  TouchBarColorPicker = "TouchBarColorPicker",
  TouchBarGroup = "TouchBarGroup",
  TouchBarLabel = "TouchBarLabel",
  TouchBarPopover = "TouchBarPopover",
  TouchBarScrubber = "TouchBarScrubber",
  TouchBarSegmentedControl = "TouchBarSegmentedControl",
  TouchBarSlider = "TouchBarSlider",
  TouchBarSpacer = "TouchBarSpacer",
}

export interface TouchBarItem {
  id: string;
  type: ItemType;
  childIndex: number;
  props: any;
}

// export interface TouchBarItem {
//   id: string;
//   type: string;
// }

export type IPCListenerFunction = (
  event: Electron.IpcRendererEvent,
  ...args: any[]
) => void;
