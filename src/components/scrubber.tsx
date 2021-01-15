import * as React from "react";
import { useRegisterItem, useUpdateItem, useItemAction } from "../context";
import { uuid } from "../util";
import { ItemAction, ItemType } from "../types";

export interface ScrubberProps {
  /**
   * For debug purposes
   */
  id?: string;

  /**
   * Selected item style.
   *
   * @default none
   */
  selectedStyle?: "none" | "background" | "outline";

  /**
   * Selected overlay item style.
   *
   * @default none
   */
  overlayStyle?: "none" | "background" | "outline";

  /**
   * @default false
   */
  showArrowButtons?: boolean;

  /**
   * @default free
   */
  mode?: "free" | "fixed";

  /**
   * @default true
   */
  continuous?: boolean;

  /**
   * An array of items to place in this scrubber.
   */
  items: Array<{ label: string; icon?: string }>;

  /**
   * Called when the user taps an item that was not the last tapped item.
   *
   * @param {number} selectedIndex The index of the item the user selected.
   */
  onChange?: (selectedIndex: number) => any;

  /**
   * Called when the user taps any item.
   *
   * @param {number} highlightedIndex The index of the item the user touched.
   */
  onClick?: (highlightedIndex: number) => any;
}

function ScrubberComponent({ id, onChange, onClick, ...props }: ScrubberProps) {
  const componentId = React.useRef(id ?? uuid());

  useRegisterItem(componentId.current, ItemType.TouchBarScrubber, props);
  useUpdateItem(componentId.current, props);
  useItemAction(componentId.current, ItemAction.change, onChange);
  useItemAction(componentId.current, ItemAction.click, onClick);

  return null;
}

export const Scrubber = React.memo(ScrubberComponent);
