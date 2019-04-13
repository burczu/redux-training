import axios from 'axios';

export const EVENTS_CLEAR = 'EVENTS_CLEAR';
export const EVENTS_DELETE = 'EVENTS_DELETE';
export const EVENTS_FILTER = 'EVENTS_FILTER';
export const EVENTS_ADD = 'EVENTS_ADD';

// przy operacjach asynchronicznych potrzebne nam będą trzy typy akcji:
// akcja informująca o rozpoczęcziu pobierania danych
// akcja wykonywana w przypadku pobierania zakończonego sukcesem
// akcja wykonywana w przypadku błędu pobierania danych
export const EVENTS_GET_START = 'EVENTS_GET_START';
export const EVENTS_GET_SUCCESS = 'EVENTS_GET_SUCCESS';
export const EVENTS_GET_ERROR = 'EVENTS_GET_ERROR';

export function getEvents() {
  // przy operacjach asynchronicznych przydatne nam
  // będą możliwości dostarczane przez redux-thunk
  return (dispatch) => {
    // jeszcze przed rozpoczęciem pobierania danych
    // wywołujemy akcję informującą o rozpoczeęciu
    // operacji asynchronicznej (w tym momencie można,
    // na przykład, pokazać loader)
    dispatch({
      type: EVENTS_GET_START,
    });

    // wywołanie operacji asynchronicznej
    axios.get('http://frontendinsights.com/events.json')
      .then(response => {
        // opereacja asynchroniczna zakończyła się powodzeniem
        // w tym momencie wywołujemy akcję, która przekazuje do store
        // pobrane dane - dodatkowo, reducer może wyłączyć loader itp.
        dispatch({
          type: EVENTS_GET_SUCCESS,
          payload: {
            events: response.data,
          }
        });
      })
      .catch(error => {
        // w przypadku, gdy podczas pobierania danych wystąpi błąd
        // wywołujemy akcję błędu - możemy do niej przekazać komunikat,
        // który ma się pojawić na ekranie, a przy okazji wyłączyć też loader
        dispatch({
          type: EVENTS_GET_ERROR,
          payload: {
            message: error.message,
          }
        })
      });
  }
}

export function clearEvents() {
  return {
    type: EVENTS_CLEAR,
  };
}

export function deleteEvent(eventId) {
  return (dispatch, getState) => {
    const events = getState().eventsState.events;

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
  return (dispatch, getState) => {
    const events = getState().eventsState.events;

    dispatch({
      type: EVENTS_ADD,
      payload: {
        events: [
          ...events,
          {
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
