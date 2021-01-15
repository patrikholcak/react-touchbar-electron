import * as React from "react";
import { useRegisterItem, useUpdateItem, useItemAction } from "../context";
import { uuid } from "../util";
import { ItemAction, ItemType } from "../types";

export interface ColorPickerProps {
  /**
   * For debug purposes
   */
  id?: string;

  /**
   * Array of hex color strings to appear as possible colors to select.
   */
  availableColors?: string[];

  /**
   * The selected hex color in the picker.
   */
  selectedColor?: string;

  /**
   * Function to call when a color is selected.
   *
   * @param {string} color The color that the user selected from the picker.
   */
  onChange?: (color: string) => any;
}

function ColorPickerComponent({ id, onChange, ...props }: ColorPickerProps) {
  const componentId = React.useRef(id ?? uuid());

  useRegisterItem(componentId.current, ItemType.TouchBarColorPicker, props);
  useUpdateItem(componentId.current, props);
  useItemAction(componentId.current, ItemAction.change, onChange);

  return null;
}

export const ColorPicker = React.memo(ColorPickerComponent);
