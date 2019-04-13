const initialState = {
  event: undefined,
};

// na razie reducer, który nic nie robi
export default function detailsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
