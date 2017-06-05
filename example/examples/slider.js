// @flow

import React, { Component } from 'react';
import Controls from '../controls';

import { TouchBar, Spacer, Slider } from '../..';

export default class Example extends Component {
  state = {
    sliderValue: 0
  };

  render() {
    return (
      <div>
        <TouchBar clearOnUnmount={false}>
          <Slider
            label="Slider"
            value={this.state.sliderValue}
            minValue={0}
            maxValue={100}
            onChange={(sliderValue: number) => this.setState({ sliderValue })}
          />

          <Spacer size="flexible" />
          <Controls />
        </TouchBar>

        <h1>Slider</h1>

        <div className="example">
          <input
            type="range"
            min={0}
            max={100}
            value={this.state.sliderValue}
            onChange={(ev: Object) =>
              this.setState({ sliderValue: parseInt(ev.target.value, 10) })}
          />
        </div>

      </div>
    );
  }
}
