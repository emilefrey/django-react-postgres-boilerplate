import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string, password: string }, thunkAPI) => {
    try {
      const response = await axios.post<Record<"key", string>>('/api/auth/login/', { username: credentials.username, password: credentials.password });
      return response.data.key
    } catch (err) {
      // cast error to expected type
      const error = err as AxiosError<Record<"key", string>>;
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ }, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/logout/");
      return response.data;
    } catch (err) {
      // cast error to expected type
      const error = err as AxiosError<Record<"key", string>>;
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)