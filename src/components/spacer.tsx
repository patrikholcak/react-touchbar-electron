import * as React from "react";
import { useRegisterItem, useUpdateItem } from "../context";
import { uuid } from "../util";
import { ItemType } from "../types";

export interface SpacerProps {
  /**
   * For debug purposes
   */
  id?: string;

  /**
   * Size of spacer.
   *
   * @default small
   */
  size?: "small" | "large" | "flexible";
}

function SpacerComponent({ id, ...props }: SpacerProps) {
  const componentId = React.useRef(id ?? uuid());

  useRegisterItem(componentId.current, ItemType.TouchBarSpacer, props);
  useUpdateItem(componentId.current, props);

  return null;
}

export const Spacer = React.memo(SpacerComponent);
