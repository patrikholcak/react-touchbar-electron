import * as React from "react";
import { useRegisterItem, useUpdateItem, useItemAction } from "../context";
import { uuid } from "../util";
import { ItemAction, ItemType } from "../types";

export interface SliderProps {
  /**
   * For debug purposes
   */
  id?: string;

  /**
   * Label text.
   */
  label?: string;

  /**
   * Selected value.
   */
  value?: number;

  /**
   * Minimum value.
   */
  minValue?: number;

  /**
   * Maximum value.
   */
  maxValue?: number;

  /**
   * Function to call when the slider is changed.
   *
   * @param {number} newValue The value that the user selected on the Slider.
   */
  onChange?: (newValue: number) => any;
}

function SliderComponent({ id, onChange, ...props }: SliderProps) {
  const componentId = React.useRef(id ?? uuid());

  useRegisterItem(componentId.current, ItemType.TouchBarSlider, props);
  useUpdateItem(componentId.current, props);
  useItemAction(componentId.current, ItemAction.change, onChange);

  return null;
}

export const Slider = React.memo(SliderComponent);
