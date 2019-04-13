import { EVENTS_CLEAR } from '../actions/events';
import events from '../data/events';

// stan początkowy definiujemy zwykle w tym samym pliku co korzystający z niego reducer
// jest to po prostu obiekt, zawierający definicje wartości, potrzebnych w aplikacji globalnie
const initialState = {
  events,
};

// reducer jest zwykłą funkcją, jako parametry przyjmującą stan oraz akcję
export default function eventsReducer(state = initialState, action) {
  // reducer sprawdza typ akcji, która została do niego przekazana
  switch (action.type) {
    case EVENTS_CLEAR:
      // i zwraca nowy, zaktualizowany stan:
      // tutaj zwracana jest kopia starego stanu, oraz nadpisywana jest
      // wartość właściwości events
      return { ...state, events: [] };
    default:
      // jeśli reducer nie zna danej akcji, zwykle po prostu zwraca nie zmieniony stan
      return { ...state };
  }
}
