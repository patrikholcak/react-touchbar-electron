import * as React from "react";
import { useRegisterItem, useUpdateItem, useItemAction } from "../context";
import { uuid } from "../util";
import { ItemAction, ItemType } from "../types";

export interface SegmentedControlProps {
  /**
   * For debug purposes
   */
  id?: string;

  /**
   * Style of the segments
   * - `automatic` — Default. The appearance of the segmented control is
   *   automatically determined based on the type of window in which the control
   *   is displayed and the position within the window. Maps to
   *   `NSSegmentStyleAutomatic`.
   *
   * - `rounded` — The control is displayed using the rounded style. Maps to
   *   `NSSegmentStyleRounded`.
   *
   * - `textured-rounded` — The control is displayed using the textured rounded
   *   style. Maps to `NSSegmentStyleTexturedRounded`.
   *
   * - `round-rect` — The control is displayed using the round rect style. Maps
   *   to `NSSegmentStyleRoundRect`.
   *
   * - `textured-square` — The control is displayed using the textured square
   *   style. Maps to `NSSegmentStyleTexturedSquare`.
   *
   * - `capsule` — The control is displayed using the capsule style. Maps to
   *   `NSSegmentStyleCapsule`.
   *
   * - `small-square `- The control is displayed using the small square style.
   *   Maps to `NSSegmentStyleSmallSquare`.
   *
   * - `separated` — The segments in the control are displayed very close to
   *   each other but not touching. Maps to `NSSegmentStyleSeparated`.
   *
   * @default automatic
   */
  segmentStyle?:
    | "automatic"
    | "rounded"
    | "textured-rounded"
    | "round-rect"
    | "textured-square"
    | "capsule"
    | "small-square"
    | "separated";

  /**
   * The selection mode of the control
   *
   * - `single` — Default. One item selected at a time, selecting one deselects
   *   the previously selected item. Maps to `NSSegmentSwitchTrackingSelectOne`.
   *
   * - `multiple` — Multiple items can be selected at a time. Maps to
   *   `NSSegmentSwitchTrackingSelectAny`.
   *
   * - `buttons` — Make the segments act as buttons, each segment can be pressed
   *   and released but never marked as active. Maps to
   *   `NSSegmentSwitchTrackingMomentary`.
   *
   * @default single
   */
  mode?: "single" | "multiple" | "buttons";

  /**
   * An array of segments to place in this control.
   */
  segments: Array<{ label: string; icon?: string; enabled?: boolean }>;

  /**
   * The index of the currently selected segment.
   */
  selectedIndex?: number;

  /**
   * Callback that fires when user changes the value.
   *
   * @param {number} selectedIndex The index of the segment the user selected.
   * @param {boolean} isSelected Whether as a result of user selection the
   * segment is selected or not.
   */
  onChange?: (selectedIndex: number, isSelected?: boolean) => any;
}

function SegmentedControlComponent({
  id,
  onChange,
  ...props
}: SegmentedControlProps) {
  const componentId = React.useRef(id ?? uuid());

  useRegisterItem(
    componentId.current,
    ItemType.TouchBarSegmentedControl,
    props
  );
  useUpdateItem(componentId.current, props);
  useItemAction(componentId.current, ItemAction.change, onChange);

  return null;
}

export const SegmentedControl = React.memo(SegmentedControlComponent);
