import * as React from "react";
import { useRegisterItem, useUpdateItem } from "../context";
import { uuid } from "../util";
import { ItemType } from "../types";

export interface LabelProps {
  /**
   * For debug purposes
   */
  id?: string;

  /**
   * Text to display.
   */
  label?: string;

  /**
   * A short description of the label for use by screenreaders like VoiceOver.
   */
  accessibilityLabel?: string;

  /**
   * Hex color of the label.
   */
  textColor?: string;
}

function LabelComponent({ id, ...props }: LabelProps) {
  const componentId = React.useRef(id ?? uuid());

  useRegisterItem(componentId.current, ItemType.TouchBarLabel, props);
  useUpdateItem(componentId.current, props);

  return null;
}

export const Label = React.memo(LabelComponent);
