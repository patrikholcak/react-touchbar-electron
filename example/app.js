// @flow

import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, NavLink } from 'react-router-dom';

import Button from './examples/button';
import Slider from './examples/slider';
import ColorPicker from './examples/color-picker';
import Label from './examples/label';
import Spacer from './examples/spacer';
import Popover from './examples/popover';
import SegmentedControl from './examples/segmented-control';
import Group from './examples/group';
import Scrubber from './examples/scrubber';

const examples = [
  { title: 'Button', path: '/', component: Button },
  { title: 'Slider', path: '/slider', component: Slider },
  { title: 'Color Picker', path: '/picker', component: ColorPicker },
  { title: 'Label', path: '/label', component: Label },
  { title: 'Spacer', path: '/spacer', component: Spacer },
  { title: 'Popover', path: '/popover', component: Popover },
  {
    title: 'SegmentedControl',
    path: '/segmented',
    component: SegmentedControl
  },
  { title: 'Group', path: '/group', component: Group },
  { title: 'Scrubber', path: '/scrubber', component: Scrubber }
];

const App = ({ history }: Object) =>
  <ConnectedRouter history={history}>
    <div id="app">
      <div className="menu">
        <h2>Contents:</h2>
        <ul>
          {examples.map(example =>
            <li key={example.title}>
              <NavLink exact to={example.path}>{example.title}</NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="content">
        {examples.map(example =>
          <Route
            key={example.title}
            exact
            path={example.path}
            component={example.component}
          />
        )}
      </div>
    </div>
  </ConnectedRouter>;

export default App;
