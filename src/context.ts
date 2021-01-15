import * as React from "react";
import { EventEmitter } from "events";
import { EventPayload, ItemAction, ItemType, TouchBarItem } from "./types";

export const TouchBarContext = React.createContext<{
  emitter: EventEmitter;
  addItem: (item: TouchBarItem) => void;
  removeItem: (id: string) => void;
  updateItem: (payload: any) => void;
}>({
  emitter: new EventEmitter(),
  addItem: () => {},
  removeItem: () => {},
  updateItem: () => {},
});

/**
 * Hook that registers/deregisters the item to the currently active TouchBar.
 */
export function useRegisterItem(
  id: string,
  type: ItemType,
  { childIndex, ...props }: any
) {
  const touchBar = React.useContext(TouchBarContext);

  React.useEffect(() => {
    touchBar.addItem({ id, type, childIndex, props });

    return () => {
      touchBar.removeItem(id);
    };
  }, []);
}

/**
 * Hook that handles action subscription for TouchBar items. It automatically
 * subscribes/unsubscribes on (un)mount
 */
export function useItemAction(
  id: string,
  action: ItemAction,
  handler?: Function
) {
  const touchBar = React.useContext(TouchBarContext);

  const actionHandler = React.useMemo(() => {
    return (payload: EventPayload) => {
      if (payload.id === id) handler?.(payload.args);
    };
  }, [handler]);

  React.useEffect(() => {
    touchBar.emitter.on(action, actionHandler);

    return () => {
      touchBar.emitter.removeListener(action, actionHandler);
    };
  }, [actionHandler]);
}

/**
 * Handle updating item. We only want to call the update function if the first
 * render has passed. Otherwise we’d be wasting a re-render
 */
export function useUpdateItem(id: string, props: any) {
  const touchBar = React.useContext(TouchBarContext);
  const hasMounted = React.useRef(false);

  React.useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    touchBar.updateItem({ id, props });
  }, [props]);
}
