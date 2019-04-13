export const EVENTS_CLEAR = 'EVENTS_CLEAR';
export const EVENTS_DELETE = 'EVENTS_DELETE';

export function clearEvents() {
  return {
    type: EVENTS_CLEAR,
  };
}

export function deleteEvent(eventId) {
  // wykorzystanie redux-thunk - kreator akcji zwraca funkcję, a nie obiekt
  return (dispatch, getState) => {
    // funkcja ta dostaje dwa parametry: funkcję "dispatch" i funkcję "getState"
    // wywołanie getState pozwala nam uzyskać dostęp do stanu Reduxa z poziomu
    // kreatora akcji
    const events = getState().events;

    // dzięki dostępowi do funkcji "dispatch" w creatorze akcji
    // jesteśmy w stanie wywołać "side effect" czyli dowolną akcję z poziomu kreatora
    // jeśli jest taka potrzeba, taki kreator akcji może wywołać wiele akcji
    dispatch({
      type: EVENTS_DELETE,
      // razem z akcją można przekazywać do store jakieś dodatkowe dane
      // dobrą praktyką jest umieszczać je we właściwości "payload"
      payload: {
        // logika filtrowania jest tutaj - do reducera trafią już odfiltrowane dane
        events: events.filter(event => event.id !== eventId),
      }
    });
  };
}
