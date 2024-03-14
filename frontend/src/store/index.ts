
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { counterSlice , snackResultSlice, reloadSlice} from './slices';

export const mainStore = configureStore({
  reducer: {
    counter: counterSlice,
    snackResult: snackResultSlice, 
    reloadSlice: reloadSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof mainStore.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof mainStore.dispatch;

export { default as Providers } from './Providers';

//? Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
