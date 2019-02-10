export const EVENTS_CLEAR = 'EVENTS_CLEAR';
export const EVENTS_DELETE = 'EVENTS_DELETE';

export function clearEvents() {
  return {
    type: EVENTS_CLEAR,
  };
}

export function deleteEvent(eventId) {
  return (dispatch, getState) => {
    const events = getState().events;

    dispatch({
      type: EVENTS_DELETE,
      payload: {
        events: events.filter(event => event.id !== eventId),
      }
    });
  };
}
