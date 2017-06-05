# React TouchBar Electron
> Proof of concept

Using TouchBar has never been easier — define custom TouchBar layout in your React routes or components and have it automagically mounted. Easily map events, directly update state or dispatch actions.

## Example
```js
import { TouchBar, Button, Slider } from 'react-touchbar-electron';

const App = ({ sliderValue, onSliderChange }) => (
  <div>
    <TouchBar>
      <Button label="Do action!" onClick={() => alert('Yo!')} />
      <Slider value={sliderValue} onChange={onSliderChange} />
    </TouchBar>

    <h1>App</h1>
    …
  </div>
)

export default App;
```

## Disclaimer
This is an experimental software, distributed as is, without any warranty or support.

## Requirements
- `react@^16.0.0-alpha` or newer. Older versions are not supported due to the way they render children.
- `electron@^1.6.3` or newer. Older versions do not support TouchBar.

## Installation
```
$ yarn add react-touchbar-electron

$ yarn add react@^16.0.0-alpha.12
$ yarn add react-dom@^16.0.0-alpha.12
$ yarn add electron@^1.7.2
```

Edit your electron `main.js`:

```js
const { touchBarWrapper } = require('react-touchbar-electron');

mainWindow = new BrowserWindow({ … });
touchBarWrapper(mainWindow);
```

Edit your electron `renderer.js`

```js
import { TouchBarProvider } from 'react-touchbar-electron';

ReactDOM.render(
  <TouchBarProvider>
    <App />
  </TouchBarProvider>,
  rootEl
);
```

## Known bugs
- removing and appending items might not work correctly - this will be solved by rendering items using custom react fiber renderer.

## How it works
TouchBar implements 2 types of objects - groups and items. This library simply
creates an object tree using contexts, which is then sent to the main process,
where the TouchBar is constructed.


## API
The api is basically the same as [electron](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md)
TouchBar API.

- #### TouchBar
  - clearOnUnmount: `boolean` — destroy TouchBar instance on unmount, default
    `true`

- #### Button
  - label: `string`
  - backgroundColor: `string`, hex
  - icon: `string` — all icons are resolved from `process.cwd()`
  - iconPosition: `'left' | 'right' | 'overlay'`
  - onClick: `() => any`

- #### ColorPicker
  - availableColors: `Array<string>`
  - selectedColor: `string`
  - onChange: `(activeColor: string) => any`

- #### Group
  - groups together one or more TouchBar items

- #### Label
  - label: `string`
  - textColor: `string`

- #### Popover
  - label: `string`
  - icon: `string` — all icons are resolved from `process.cwd()`
  - showCloseButton: `boolean`

- #### Scrubber
  - selectedStyle: `'background' | 'outline'`
  - overlayStyle: `'background' | 'outline'`
  - showArrowButtons: `boolean`
  - mode: `'fixed' | 'free'`
  - onChange: `(item: any) => any`
  - onClick: `(item: any) => any`

- #### ScrubberItem
  - label: `string`
  - icon: `string` — all icons are resolved from `process.cwd()`

- #### SegmentedControl
    - segmentStyle: `'automatic' | 'rounded' | 'textured-rounded' |
      'round-rect' | 'textured-square' | 'capsule' | 'small-square' | 'separated'`
    - mode: `'single' | 'multiple' | 'buttons'`
    - selectedIndex: `number`
    - onChange: `(selectedIndex: number, isSelected: boolean) => any`

- #### Segment
  - label: `string`
  - icon: `string` — all icons are resolved from `process.cwd()`
  - enabled: `boolean`

- #### Slider
  - label: `string`
  - value: `number`
  - minValue: `number`
  - maxValue: `number`
  - onChange: `(value: number) => any`

- #### Spacer
  - size: `'small' | 'large' | 'flexible'`

## Licence
MIT