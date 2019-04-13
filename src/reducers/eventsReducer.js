import {
  EVENTS_ADD,
  EVENTS_CLEAR,
  EVENTS_DELETE,
  EVENTS_FILTER,
} from '../actions/events';
import events from '../data/events';

const initialState = {
  events,
  filterBy: '',
};

export default function eventsReducer(state = initialState, action) {
  const { events, filterBy } = action.payload || {};

  switch (action.type) {
    case EVENTS_CLEAR:
      return { ...state, events: [] };
    case EVENTS_DELETE:
      return { ...state, events };
    case EVENTS_FILTER:
      return { ...state, filterBy };
    case EVENTS_ADD:
      // tutaj tylko aktualizacja
      // zauważ, że dla EVENTS_DELETE I EVENTS_ADD robimy to samo...
      // w takiej sytuacji można pomyśleć o bardziej ogólnej akcji, np. EVENTS_UPDATE
      return { ...state, events };
    default:
      return { ...state };
  }
}
