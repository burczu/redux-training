import { DETAILS_SELECT } from '../actions/details';

const initialState = {
  event: undefined,
};

export default function detailsReducer(state = initialState, action) {
  const { event } = action.payload || {};

  switch (action.type) {
    // obsługa zapisywania wydarzenia w stanie aplikacji
    case DETAILS_SELECT:
      return { ...state, event };
    default:
      return { ...state };
  }
}
