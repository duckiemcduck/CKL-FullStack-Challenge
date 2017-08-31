import React from "react";
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import { Provider } from 'react-redux';
import App from './containers/App-container.js'
import configureStore from './store/configureStore'
import styles from './app.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);


if (module.hot)
{
  module.hot.accept();
}