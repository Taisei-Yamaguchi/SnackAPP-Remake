import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SnackResultState = {
    snackResult: any[]; // 
};

const defaultState: SnackResultState = {
    snackResult: []
};

export const snackResultSlice = createSlice({
    name: 'snackResult',
    initialState: defaultState,
    reducers: {
        setSnackResult(state, action: PayloadAction<any[]>) { 
            state.snackResult = action.payload; 
        },
    }
});

export const { setSnackResult } = snackResultSlice.actions;

export default snackResultSlice.reducer;
