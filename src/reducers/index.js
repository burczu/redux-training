// importujemy combineReducers czyli metodę, pozwalającą użyć wielu reducerów
import { combineReducers } from 'redux';

// importujemy oba reducery
import eventsReducer from './eventsReducer';
import detailsReducer from './detailsReducer';

// łączymy reducery
export const rootReducer = combineReducers({
  // do combineReducers przekazujemy obiekt zawierający
  // właściwości odpowiadające poszczególnym reducerom
  eventsState: eventsReducer,
  detailsState: detailsReducer,
});
