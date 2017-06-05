// @flow

import React, { Component } from 'react';
import Controls from '../controls';

import { TouchBar, Spacer, Button } from '../..';

export default class Example extends Component {
  state = {
    first: false,
    color: false,
    unicorns: false
  };

  render() {
    return (
      <div>
        <TouchBar clearOnUnmount={false}>
          <Button
            label="Button"
            onClick={() => this.setState({ first: !this.state.first })}
          />
          <Button
            label={this.state.color ? 'Red button' : 'Blue Button'}
            backgroundColor={this.state.color ? '#e62117' : '#3b5998'}
            onClick={() => this.setState({ color: !this.state.color })}
          />
          <Button
            label="Unicorn!"
            iconPosition={this.state.unicorns ? 'right' : 'left'}
            icon="/example/static/unicorn@2x.png"
            onClick={() => this.setState({ unicorns: !this.state.unicorns })}
          />

          <Spacer size="flexible" />
          <Controls />
        </TouchBar>

        <h1>Button</h1>

        <p>Press the first button and see!</p>

        <div className="example">
          {this.state.first ? '😻' : '😾'}
        </div>
      </div>
    );
  }
}
