import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import darkModeReducer from "./darkMode/darkModeSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({ auth: authReducer, darkMode: darkModeReducer })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development"
})

export let persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch