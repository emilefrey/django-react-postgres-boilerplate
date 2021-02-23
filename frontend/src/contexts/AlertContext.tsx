import React, { createContext, useState } from 'react';
import { Color } from '@material-ui/lab/Alert';

export type AlertContextProps = {
  TriggerAlert: (message: string, severity: Color) => void,
  openAlert: boolean,
  alertMessage: string,
  alertType: Color,
  handleAlertClose: (event?: React.SyntheticEvent<Element, Event> | undefined, reason?: string | undefined) => void
};

export const AlertContext = createContext<AlertContextProps>({
  TriggerAlert: () => {},
  openAlert: false,
  alertMessage: '',
  alertType: 'info',
  handleAlertClose: () => {}
});

const AlertContextProvider = (props: any) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<Color>('error');

  const TriggerAlert = (message: string, severity: Color = 'info') => {
    setOpenAlert(false);
    setAlertMessage(message);
    setAlertType(severity);
    setOpenAlert(true);
  }

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <AlertContext.Provider value={{
      TriggerAlert,
      openAlert,
      alertMessage,
      alertType,
      handleAlertClose
    }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertContextProvider;
