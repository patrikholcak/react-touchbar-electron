// @flow

import React, { Component } from 'react';
import Controls from '../controls';

import { TouchBar, Spacer, Button, Group } from '../..';

const modes = ['single', 'multiple', 'buttons'];

export default class Example extends Component {
  render() {
    return (
      <div>
        <TouchBar clearOnUnmount={false}>
          <Group>
            <Button label="Button 1" />
            <Button label="Button 2" />
          </Group>

          <Spacer size="flexible" />
          <Controls />
        </TouchBar>

        <h1>Group</h1>
      </div>
    );
  }
}
