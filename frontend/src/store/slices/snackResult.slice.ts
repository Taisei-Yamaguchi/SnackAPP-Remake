import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SnackResultState = {
    snackResult: any[];
    totalPages: number
};

const defaultState: SnackResultState = {
    snackResult: [],
    totalPages:1
};

export const snackResultSlice = createSlice({
    name: 'snackResult',
    initialState: defaultState,
    reducers: {
        setSnackResult(state, action: PayloadAction<any[]>) { 
            state.snackResult = action.payload; 
        },
        setTotalPages(state, action: PayloadAction<number>) { 
            state.totalPages = action.payload; 
        }
    }
});

export const { setSnackResult,setTotalPages } = snackResultSlice.actions;

export default snackResultSlice.reducer;
