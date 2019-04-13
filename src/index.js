import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import eventsReducer from './reducers/eventsReducer';

import './style.css';

// funkcja "createStore" tworzy obiekt store
// jako parametr przyjmuje funkcję reducera
const store = createStore(eventsReducer);

ReactDOM.render(
  // komponentem Provider "owijamy" główny komponent aplikacji
  // dzięki temu store będzie dostępny dla wszystkich komponentów aplikacji
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
