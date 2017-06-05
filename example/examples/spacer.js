// @flow

import React, { Component } from 'react';
import Controls from '../controls';

import { TouchBar, Spacer, Label } from '../..';

export default class Example extends Component {
  render() {
    return (
      <div>
        <TouchBar clearOnUnmount={false}>
          <Label label="Small spacer |" />
          <Spacer size="small" />

          <Label label="| Large spacer |" />
          <Spacer size="large" />

          <Label label="| Flexible spacer |" />
          <Spacer size="flexible" />

          <Controls />
        </TouchBar>

        <h1>Spacer</h1>
      </div>
    );
  }
}
