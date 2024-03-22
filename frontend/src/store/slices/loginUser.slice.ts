import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

type Account = {id: number, username: string, language:string}
type Token =string

export type LoginUserState = {
    account: Account | null,
    token: Token | null
};

const defaultState: LoginUserState = {
    account: null,
    token: null
};

export const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState: defaultState,
    reducers: {
        setAccount(state, action: PayloadAction<Account|null>) { 
            state.account = action.payload; 
        },
        setToken(state,action: PayloadAction<Token | null>){
            state.token = action.payload;
        }
    }
});

export const { setAccount, setToken } = loginUserSlice.actions;

export default loginUserSlice.reducer;
