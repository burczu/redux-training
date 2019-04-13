export const EVENTS_CLEAR = 'EVENTS_CLEAR';

// kreator akcji to zwykła funkcja zwracająca akcję
export function clearEvents() {
  // akcja to zwykły obiekt, któr musi zawierać właściwość "type"
  // może też zawierać inne właściwości, ale o tym później
  return {
    // typ akcji to zwykły ciąg znaków - zwyczajowo typy przypisuje się do stałych,
    // ponieważ będą one potrzebne w kilku miejscach w aplikacji
    type: EVENTS_CLEAR,
  };
}
