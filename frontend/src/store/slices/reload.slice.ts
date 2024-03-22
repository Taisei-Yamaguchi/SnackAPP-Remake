import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ReloadState = {
    reloading:boolean,
    searchLoad:boolean,
};

const defaultState: ReloadState = {
    reloading: false,
    searchLoad: false,
};

export const reloadSlice = createSlice({
    name: 'Reload',
    initialState: defaultState,
    reducers: {
        setReloading(state, action: PayloadAction<boolean>) { 
            state.reloading = action.payload; 
        },
        setSearchLoad(state, action: PayloadAction<boolean>) { 
            state.searchLoad = action.payload; 
        },
    }
});

export const { setReloading,setSearchLoad } = reloadSlice.actions;

export default reloadSlice.reducer;
