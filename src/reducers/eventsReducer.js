import { EVENTS_CLEAR, EVENTS_DELETE } from '../actions/events';
import events from '../data/events';

const initialState = {
  events,
};

export default function eventsReducer(state = initialState, action) {
  const { events } = action.payload || {};

  switch (action.type) {
    case EVENTS_CLEAR:
      return { ...state, events: [] };
    case EVENTS_DELETE:
      return { ...state, events };
    default:
      return { ...state };
  }
}
