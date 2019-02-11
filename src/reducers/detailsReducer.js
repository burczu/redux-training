import events from '../data/events.json';

const initialState = {
  event: undefined,
  events,
};

export default function detailsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
