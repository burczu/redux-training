export const EVENTS_CLEAR = 'EVENTS_CLEAR';
export const EVENTS_DELETE = 'EVENTS_DELETE';
export const EVENTS_FILTER = 'EVENTS_FILTER';
export const EVENTS_ADD = 'EVENTS_ADD';

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

export function filterEvents(filterBy) {
  return {
    type: EVENTS_FILTER,
    payload: {
      filterBy,
    },
  };
}

export function addEvent(name, place, date, time) {
  // po raz kolejny korzystamy z redux-thunk i zwracamy funkcję a nie obiekt
  return (dispatch, getState) => {
    const events = getState().events;

    dispatch({
      type: EVENTS_ADD,
      payload: {
        // w akcji przekazujemy zaktualizowaną tabicę events
        events: [
          ...events, // ES6: do nowej tablicy skopiuj zawartość starej
          { // dodatkowo dodaj do nowej tablicy jeszcze jeden obiekt
            id: events.length + 1,
            name,
            place,
            date,
            time,
          },
        ],
      },
    });
  };
}
