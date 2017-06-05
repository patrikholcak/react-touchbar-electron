// @flow

import React, { Component } from 'react';
import Controls from '../controls';

import { TouchBar, Spacer, Label } from '../..';

const colors = ['#3b5998', '#24292e', '#55acee', '#e62117'];

export default class Example extends Component {
  render() {
    return (
      <div>
        <TouchBar clearOnUnmount={false}>
          {colors.map(color =>
            <Label key={color} label={color} textColor={color} />
          )}

          <Spacer size="flexible" />
          <Controls />
        </TouchBar>

        <h1>Label</h1>
      </div>
    );
  }
}
