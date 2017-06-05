// @flow

import React, { Component } from 'react';
import Controls from '../controls';

import { TouchBar, Spacer, SegmentedControl, Segment } from '../..';

const styles = [
  'automatic',
  'rounded',
  'textured-rounded',
  'round-rect',
  'textured-square',
  'capsule',
  'small-square',
  'separated'
];

const modes = ['single', 'multiple', 'buttons'];

export default class Example extends Component {
  state = {
    style: styles[0],
    mode: modes[0]
  };

  render() {
    return (
      <div>
        <TouchBar clearOnUnmount={false}>
          <SegmentedControl
            segmentStyle={this.state.style}
            mode={this.state.mode}
            onChange={(selectedIndex: number, isSelected: Boolean) =>
              console.log(selectedIndex, isSelected)}
          >
            <Segment label="Segment 1" />
            <Segment label="Segment 2" enabled={false} />
            <Segment label="Segment 3" icon="/example/static/unicorn@2x.png" />
          </SegmentedControl>

          <Spacer size="flexible" />
          <Controls />
        </TouchBar>

        <h1>Segmented Control</h1>

        <label>
          <span>Style:</span>
          <select onChange={ev => this.setState({ style: ev.target.value })}>
            {styles.map(style => <option key={style}>{style}</option>)}
          </select>
        </label>

        <label>
          <span>Mode:</span>
          <select onChange={ev => this.setState({ mode: ev.target.value })}>
            {modes.map(mode => <option key={mode}>{mode}</option>)}
          </select>
        </label>
      </div>
    );
  }
}
