import {
  EVENTS_CLEAR,
  EVENTS_DELETE,
  EVENTS_FILTER,
} from '../actions/events';
import events from '../data/events';

const initialState = {
  events,
  filterBy: '', // dodatkowa właściwość stanu początkowego!!
};

export default function eventsReducer(state = initialState, action) {
  const { events, filterBy } = action.payload || {};

  switch (action.type) {
    case EVENTS_CLEAR:
      return { ...state, events: [] };
    case EVENTS_DELETE:
      return { ...state, events };
    // tylko zapisanie aktualnej wartości filtra (jak zawsze, zwracamy nowy obiekt)
    case EVENTS_FILTER:
      return { ...state, filterBy };
    default:
      return { ...state };
  }
}
