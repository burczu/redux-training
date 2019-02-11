import axios from 'axios';

export const EVENTS_CLEAR = 'EVENTS_CLEAR';
export const EVENTS_DELETE = 'EVENTS_DELETE';
export const EVENTS_FILTER = 'EVENTS_FILTER';
export const EVENTS_ADD = 'EVENTS_ADD';

export const EVENTS_GET_START = 'EVENTS_GET_START';
export const EVENTS_GET_SUCCESS = 'EVENTS_GET_SUCCESS';
export const EVENTS_GET_ERROR = 'EVENTS_GET_ERROR';

export function getEvents() {
  return (dispatch) => {
    dispatch({
      type: EVENTS_GET_START,
    });

    axios.get('http://frontendinsights.com/events.json')
      .then(response => {
        dispatch({
          type: EVENTS_GET_SUCCESS,
          payload: {
            events: response.data,
          }
        });
      })
      .catch(error => {
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
