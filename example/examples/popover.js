// @flow

import React, { Component } from 'react';
import Controls from '../controls';

import { TouchBar, Spacer, Popover, Button } from '../..';

export default class Example extends Component {
  render() {
    return (
      <div>
        <TouchBar clearOnUnmount={false}>
          <Popover label="Popover">
            <Button label="Button 1" />
            <Button label="Button 2" />
          </Popover>

          <Popover
            label="Magic Popover"
            icon="/example/static/unicorn@2x.png"
            showCloseButton={false}
          >
            <Button label="Button 1" />
            <Button label="Button 2" />
          </Popover>

          <Spacer size="flexible" />
          <Controls />
        </TouchBar>

        <h1>Popover</h1>
      </div>
    );
  }
}
