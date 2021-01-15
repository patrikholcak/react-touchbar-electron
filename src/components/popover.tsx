import * as React from "react";
import { useRegisterItem, useUpdateItem } from "../context";
import { uuid } from "../util";
import { TouchBar } from "./touch-bar";
import { ItemType } from "../types";

export interface PopoverProps {
  /**
   * For debug purposes
   */
  id?: string;

  /**
   * Popover button text.
   */
  label?: string;

  /**
   * Popover button icon.
   */
  icon?: string;

  /**
   * Display a close button on the left of the popover.
   *
   * @default true
   */
  showCloseButton?: boolean;

  children: React.ReactNode;
}

function PopoverComponent({ id, children, ...props }: PopoverProps) {
  const componentId = React.useRef(id ?? uuid());

  useRegisterItem(componentId.current, ItemType.TouchBarPopover, props);
  useUpdateItem(componentId.current, props);

  return (
    <TouchBar
      id={componentId.current}
      // @ts-expect-error - "private property"
      registerOnly
    >
      {children}
    </TouchBar>
  );
}

export const Popover = React.memo(PopoverComponent);
