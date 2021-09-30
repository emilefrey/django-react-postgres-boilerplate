import React from 'react';
import ReactDOM from 'react-dom';
import { MainPage } from './App';

import AlertContextProvider from './contexts/AlertContext'
import DialogContextProvider from './contexts/DialogContext'
import { persistor, store } from './redux/store'
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { axiosRequestInterceptor, axiosResponseInterceptor } from './axiosInterceptors'

if (process.env.NODE_ENV === "development" && process.env.NODE_ENV !== "test") {
  module.hot.accept(); // hot reloading when in develop mode
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertContextProvider>
          <DialogContextProvider>
            <MainPage />
          </DialogContextProvider>
        </AlertContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);