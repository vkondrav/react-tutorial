// @ts-nocheck
interface State {
  count: number;
  user: string | null;
}

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_USER'; payload: string }
  | { type: 'LOGOUT' };
