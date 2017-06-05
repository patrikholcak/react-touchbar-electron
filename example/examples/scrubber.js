// @flow

import React, { Component } from 'react';
import Controls from '../controls';

import { TouchBar, Spacer, Scrubber, ScrubberItem } from '../..';

const items = new Array(30).fill(0);

export default class Example extends Component {
  render() {
    return (
      <div>
        <TouchBar clearOnUnmount={false}>
          <Scrubber>
            {items.map((item, index) =>
              <ScrubberItem key={index} label={(index + 1).toString()} />
            )}
          </Scrubber>

          <Spacer size="flexible" />
          <Controls />
        </TouchBar>

        <h1>Scrubber</h1>
      </div>
    );
  }
}
