import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { login, logout } from './authThunks'

type AuthState = {
  token: string | null
  authenticated: boolean
}

const slice = createSlice({
  name: 'auth',
  initialState: { token: null, authenticated: false } as AuthState,
  reducers: {
    setToken: (
      state,
      { payload: token }: PayloadAction<string>
    ) => {
      state.token = token
    },
    forceLogout: (
      state
    ) => {
      state.authenticated = false
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.authenticated = true
      state.token = action.payload
    }),
      builder.addCase(logout.fulfilled, (state, action) => {
        state.authenticated = false
      })
  }
})

export const { setToken, forceLogout } = slice.actions

export default slice.reducer


