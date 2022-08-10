import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@zart/react-native/navigation/slice/authSlice'
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector
  } from 'react-redux';

export const store = configureStore({
    reducer: {
        userAuth: authSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector