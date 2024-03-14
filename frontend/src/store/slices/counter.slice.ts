import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type CounterState = {
  value: number;
  isReady: boolean;
};

const defaultState: CounterState = {
  value: 0,
  isReady: false,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: defaultState,
  reducers: {
    initCounterState: (state, action: PayloadAction<{ value: number }>) => {
      //? if my state is set, then don't set the state again.
      if ( state.isReady ) return;

      state.value = action.payload.value;
      state.isReady = true;
    },
    incrementOne: (state) => {
      //? Redux Toolkit allows us to write "mutating" logic in reducers.
      //? It doesn't actually mutate the state because it uses the "Immer" library,
      //? which detects changes to a "draft state" and produces
      //? a new immutable state based off those changes.
      state.value++;
    },
    decrementOne: (state) => {
      if (state.value === 0) return;
      state.value--;
    },
    resetCounter: (state, action: PayloadAction<{ value: number }>) => {
      state.value = action.payload.value;
    },
  }
});

//? Action creators are generated for each case reducer function
export const {
  initCounterState,
  incrementOne,
  decrementOne,
  resetCounter,
} = counterSlice.actions;

export default counterSlice.reducer;
