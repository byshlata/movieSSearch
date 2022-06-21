import React from 'react';

import ReactDOM from 'react-dom/client';
import 'index.sass';
import { Provider } from 'react-redux';

import { App } from './app/App';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
