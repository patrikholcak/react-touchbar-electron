// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHashHistory from 'history/createHashHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import { TouchBarProvider } from '..';

import App from './app';

const history = createHashHistory();
const store = createStore(
  routerReducer,
  applyMiddleware(routerMiddleware(history))
);

const rootEl = document.getElementById('root');
const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <TouchBarProvider>
        <Provider store={store}>
          <App history={history} />
        </Provider>
      </TouchBarProvider>
    </AppContainer>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./app', () => renderApp());
}

renderApp();
