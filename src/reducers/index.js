import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import detailsReducer from './detailsReducer';

export const rootReducer = combineReducers({
  eventsState: eventsReducer,
  detailsState: detailsReducer,
});
