import * as React from "react";
import { useRegisterItem, useUpdateItem, useItemAction } from "../context";
import { uuid } from "../util";
import { ItemAction, ItemType } from "../types";

export interface ButtonProps {
  /**
   * For debug purposes
   */
  id?: string;

  /**
   * Button text.
   */
  label?: string;

  /**
   * A short description of the button for use by screenreaders like VoiceOver.
   */
  accessibilityLabel?: string;

  /**
   * Whether the button is in an enabled state.
   *
   * @default true
   */
  enabled?: boolean;

  /**
   * Button background color in hex format.
   */
  backgroundColor?: string;

  /**
   * Path to an icon that will be displayed.
   */
  icon?: string;

  /**
   * Position of icon on the button. Only applicable if `icon` present.
   *
   * @default overlay
   */
  iconPosition?: "left" | "right" | "overlay";

  /**
   * Function to call when the button is clicked.
   */
  onClick?: () => any;
}

function ButtonComponent({ id, onClick, ...props }: ButtonProps) {
  const componentId = React.useRef(id ?? uuid());

  useRegisterItem(componentId.current, ItemType.TouchBarButton, props);
  useUpdateItem(componentId.current, props);
  useItemAction(componentId.current, ItemAction.click, onClick);

  return null;
}

export const Button = React.memo(ButtonComponent);
