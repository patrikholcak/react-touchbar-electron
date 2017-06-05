// @flow

import React from 'react';
import { connect } from 'react-redux';
import { push as setLocation, goBack, goForward } from 'react-router-redux';

import { Group, Button, Spacer } from '..';

type Props = {
  goBack: () => void,
  setLocation: (path: string) => void,
  goForward: () => void
};

const Controls = (props: Props) =>
  <Group>
    <Button label="⬅️" onClick={() => props.goBack()} />
    <Button label="🏡" onClick={() => props.setLocation('/')} />
    <Button label="️➡️" onClick={() => props.goForward()} />
  </Group>;

export default connect(null, { setLocation, goBack, goForward })(Controls);
