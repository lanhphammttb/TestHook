// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import breedsReducer from './breedsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    breeds: breedsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
