export const DETAILS_SELECT = 'DETAILS_SELECT';

export function selectEvent(eventId) {
  return (dispatch, getState) => {
    // turaj również trzeba skorzystać z redux-thunk
    // w celu wyciągnięcia z aktualnego stanu listy wydarzeń,
    // wśród których następnie wyszukujemy odpowiednie wydarzenie
    const events = getState().eventsState.events;
    const event = events.find(item => item.id === eventId);

    // na koniec wywołujemy akcję, która zapamięta
    // wyszukane wydarzenie w stanie detailsState
    dispatch({
      type: DETAILS_SELECT,
      payload: {
        event,
      }
    });
  };
}
