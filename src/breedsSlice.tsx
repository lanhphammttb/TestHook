// src/features/breedsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from './api/axiosInstance';

interface Breed {
  id: string;
  attributes: {
    name: string;
    description: string;
  };
}

interface BreedsState {
  breeds: Breed[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BreedsState = {
  breeds: [],
  status: 'idle',
  error: null
};

// Async thunk for fetching breeds
export const fetchBreeds = createAsyncThunk('breeds/fetchBreeds', async () => {
  const response = await axiosInstance.get('/breeds');
  return response.data.data as Breed[];
});

const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreeds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchBreeds.fulfilled,
        (state, action: PayloadAction<Breed[]>) => {
          state.status = 'succeeded';
          state.breeds = action.payload;
        }
      )
      .addCase(fetchBreeds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export default breedsSlice.reducer;
