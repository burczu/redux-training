export const DETAILS_SELECT = 'DETAILS_SELECT';

export function selectEvent(eventId) {
  return (dispatch, getState) => {
    const events = getState().eventsState.events;
    const event = events.find(item => item.id === eventId);

    dispatch({
      type: DETAILS_SELECT,
      payload: {
        event,
      }
    });
  };
}
