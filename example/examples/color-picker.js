// @flow

import React, { Component } from 'react';
import Controls from '../controls';

import { TouchBar, Spacer, ColorPicker } from '../..';

const colors = ['#3b5998', '#24292e', '#55acee', '#e62117'];

export default class Example extends Component {
  state = {
    color: colors[0]
  };

  render() {
    return (
      <div>
        <TouchBar clearOnUnmount={false}>
          <ColorPicker
            availableColors={colors}
            selectedColor={this.state.color}
            onChange={(color: string) => this.setState({ color })}
          />

          <Spacer size="flexible" />
          <Controls />
        </TouchBar>

        <h1>Color Picker</h1>

        <select
          value={this.state.color}
          onChange={ev => this.setState({ color: ev.target.value })}
        >
          {colors.map(color =>
            <option key={color} value={color}>{color}</option>
          )}
        </select>
      </div>
    );
  }
}
