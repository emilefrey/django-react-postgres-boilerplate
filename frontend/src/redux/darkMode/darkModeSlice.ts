import { createSlice } from '@reduxjs/toolkit'

type DarkModeState = {
  darkMode: boolean
}

const slice = createSlice({
  name: 'darkMode',
  initialState: { darkMode: false } as DarkModeState,
  reducers: {
    toggleDarkMode: (
      state
    ) => {
      state.darkMode = !state.darkMode
    },
  },
})

export const { toggleDarkMode } = slice.actions

export default slice.reducer
