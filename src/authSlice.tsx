// src/features/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null
};

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post(
      'https://restful-booker.herokuapp.com/auth',
      {
        username,
        password
      }
    );
    return response.data.token;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Authentication failed';
      });
  }
});

export default authSlice.reducer;
