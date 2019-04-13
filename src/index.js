import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import eventsReducer from './reducers/eventsReducer';

import './style.css';

// konfigurujemy store Reduxa razem z middleware: jako drugi parametr
// przekazujemy rezultat wywołania funkcji applyMiddleware
const store = createStore(eventsReducer, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
