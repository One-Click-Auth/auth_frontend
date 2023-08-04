import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Auth/authSlice';
import keySlice from './Org/keySlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    keys: keySlice
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
