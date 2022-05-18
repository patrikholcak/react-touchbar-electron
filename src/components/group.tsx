import * as React from "react";
import { useRegisterItem, useUpdateItem } from "../context";
import { uuid } from "../util";
import { TouchBar } from "./touch-bar";
import { ItemType } from "../types";

export interface GroupProps {
  /**
   * For debug purposes
   */
  id?: string;

  children: React.ReactNode;
}

function GroupComponent({ id, children, ...props }: GroupProps) {
  const componentId = React.useRef(id ?? uuid());

  useRegisterItem(componentId.current, ItemType.TouchBarGroup, props);
  useUpdateItem(componentId.current, props);

  return (
    <TouchBar
      id={componentId.current}
      // @ts-expect-error - "private property"
      registerOnly
      // enable to always render group
      enabled={true}
    >
      {children}
    </TouchBar>
  );
}

export const Group = React.memo(GroupComponent);
