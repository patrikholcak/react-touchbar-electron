![](https://repository-images.githubusercontent.com/93372157/8c28ef00-575d-11eb-83fd-8840c4de6be3)

# React TouchBar Electron

Define custom TouchBar layouts in your React components and have it automatically set on component mount. Easily map events, directly update state and dispatch actions.

> _Note:_ `<Popover>` and `<Group>` are broken in Electron 11. See this issue for reference https://github.com/electron/electron/issues/26761

## Example

```tsx
import * as React from "react";
import { TouchBar, Button, Slider } from "react-touchbar-electron";

function App() {
  const [sliderValue, onSliderChange] = React.useState(50);

  return (
    <>
      <TouchBar>
        <Button label="Show alert" onClick={() => alert("Hey!")} />
        <Slider value={sliderValue} onChange={onSliderChange} />
      </TouchBar>
      <div>
        <h1>App</h1>…
      </div>
    </>
  );
}

export default App;
```

## Installation

1. `npm i react-touchbar-electron`

2. Edit your electron `main` script:

```ts
import { decorateWindow } from "react-touchbar-electron/decorate-window";

const mainWindow = new BrowserWindow({
  // Make sure `nodeIntegration` is enabled
  webPreferences: {
    nodeIntegration: true,
  },
  // …
});

decorateWindow(mainWindow);
```

3. edit your electron `renderer` script:

```js
import { TouchBar, Button } from "react-touchbar-electron";

function App() {
  return (
    <TouchBar>
      <Button label="It works!" />
    </TouchBar>
  );
}
```

## How it works

the `TouchBar` component is a context provider, which communicates with the main thread using ipc. Each child component then "registers" itself as a TouchBar item.

## API

The api pretty much copies the official [electron](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md)
TouchBar API with some exceptions to events, to preserve React conventions:

- `click` & `highlight` are `onClick` in your components
- `change` & `select` are `onChange` in your components

> _Note:_ All `icon`s are resolved from the directory where your built electron `main` is. If you `import` your images in your component via webpack/parcel/… they should be resolved correclty.

### TouchBar

- id: `string` - A unique identifier for this TouchBar layout, useful when restoring prev layout.
- prevId: `string` — Restore a previous instance of TouchBar after the actual one is unmounted (eg. dialogs, popovers…)
- children: `ReactNode` - TouchBar items.

### Button

- label: `string` - Button text.
- accessibilityLabel: `string` - A short description of the button for use by screenreaders like VoiceOver.
- enabled: `boolean` - Whether the button is in an enabled state.
- backgroundColor: `string` - Button background color in hex format.
- icon: `string` — Path to an icon that will be displayed.
- iconPosition: `"left" | "right" | "overlay"` - Position of icon on the button. Only applicable if `icon` present.
- onClick: `() => any` - Function to call when the button is clicked.

### ColorPicker

- availableColors: `string[]` - Array of hex color strings to appear as possible colors to select.
- selectedColor: `string` - The selected hex color in the picker.
- onChange: `(color: string) => any` - The color that the user selected from the picker.

### Group

groups together one or more TouchBar items.

- children: `ReactNode` - TouchBar items.

### Label

- label: `string` - Text to display.
- accessibilityLabel: `string` - A short description of the label for use by screenreaders like VoiceOver.
- textColor: `string` - Hex color of the label.

### Popover

- label: `string` - Popover button text.
- icon: `string` — Popover button icon.
- showCloseButton: `boolean` - Display a close button on the left of the popover.
- children: `ReactNode` - Popover items.

### Scrubber

- selectedStyle: `"none" | "background" | "outline"` - Selected item style.
- overlayStyle: `"none" | "background" | "outline"` - Selected overlay item style.
- showArrowButtons: `boolean`
- mode: `"free" | "fixed"`
- items: `Array<{ label: string; icon?: string }>` - An array of items to place in this scrubber.
- onChange: `(selectedIndex: number) => any` - Called when the user taps an item that was not the last tapped item.
- onClick: `(highlightedIndex: number) => any` - Called when the user taps any item.

### SegmentedControl

- segmentStyle: `"automatic" | "rounded" | "textured-rounded" | "round-rect" | "textured-square" | "capsule" | "small-square" | "separated"` - Style of the segments
- mode: `"single" | "multiple" | "buttons"` - The selection mode of the control
- segments: `Array<{ label: string; icon?: string; enabled?: boolean }>` - An array of segments to place in this control.
- selectedIndex: `number` - The index of the currently selected segment.
- onChange: `(selectedIndex: number, isSelected: boolean) => any` - Callback that fires when user changes the value.

### Slider

- label: `string` - Label text.
- value: `number` - Selected value.
- minValue: `number` - Minimum value.
- maxValue: `number` - Maximum value.
- onChange: `(newValue: number) => any` - Function to call when the slider is changed.

### Spacer

- size: `"small" | "large" | "flexible"` - Size of spacer.

## Debugging

- Start the electron main process with `TOUCHBAR_DEBUG=true` and the library will let you know what’s going on.
- Each component has an `id` prop which could be used for debugging. This id must be unique to the current TouchBar instance.

## Licence

[ISC](./LICENSE.md)
