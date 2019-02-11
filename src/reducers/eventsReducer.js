import {
  EVENTS_ADD,
  EVENTS_CLEAR,
  EVENTS_DELETE,
  EVENTS_FILTER,
  EVENTS_GET_START,
  EVENTS_GET_SUCCESS,
  EVENTS_GET_ERROR,
} from '../actions/events';

const initialState = {
  events: [],
  eventsLoading: true,
  eventsError: false,
  eventsErrorMessage: '',
  filterBy: '',
};

export default function eventsReducer(state = initialState, action) {
  const { events, filterBy, message } = action.payload || {};

  switch (action.type) {
    case EVENTS_CLEAR:
      return { ...state, events: [] };
    case EVENTS_DELETE:
      return { ...state, events };
    case EVENTS_FILTER:
      return { ...state, filterBy };
    case EVENTS_ADD:
      return { ...state, events };
    case EVENTS_GET_START:
      return {
        ...state,
        eventsLoading: true,
        eventsError: false,
        eventsErrorMessage: '',
      };
    case EVENTS_GET_SUCCESS:
      return {
        ...state,
        eventsLoading: false,
        eventsError: false,
        eventsErrorMessage: '',
        events
      };
    case EVENTS_GET_ERROR:
      return {
        ...state,
        eventsLoading: false,
        eventsError: true,
        eventsErrorMessage: message,
      };
    default:
      return { ...state };
  }
}
