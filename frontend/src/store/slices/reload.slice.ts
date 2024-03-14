import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ReloadState = {
    reloading:boolean
};

const defaultState: ReloadState = {
    reloading: false
};

export const reloadSlice = createSlice({
    name: 'Reload',
    initialState: defaultState,
    reducers: {
        setReloading(state, action: PayloadAction<boolean>) { 
            state.reloading = action.payload; 
        },
    }
});

export const { setReloading } = reloadSlice.actions;

export default reloadSlice.reducer;
