import { EVENTS_CLEAR } from '../actions/events';
import events from '../data/events';

const initialState = {
  events,
};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS_CLEAR:
      return { ...state, events: [] };
    default:
      return { ...state };
  }
}
