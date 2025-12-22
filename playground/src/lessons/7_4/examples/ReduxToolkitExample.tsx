// @ts-nocheck
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const store = configureStore({ reducer: { counter: counterSlice.reducer } });

// Usage
function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(increment())}>{count}</button>;
}
