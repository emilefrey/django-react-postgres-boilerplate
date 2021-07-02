import React, { createContext, useState } from 'react';
import Button from '@material-ui/core/Button';

export type DialogContextProps = {
  OpenDialog: (title: string, body: JSX.Element, actions?: any) => void,
  showDialog: boolean,
  dialogTitle: string,
  dialogBody: JSX.Element,
  dialogActions: JSX.Element,
  handleDialogClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined
};

export const DialogContext = createContext<DialogContextProps>({
  OpenDialog: () => { },
  showDialog: false,
  dialogTitle: '',
  dialogBody: <></>,
  dialogActions: <></>,
  handleDialogClose: () => { }
});

const DialogContextProvider = (props: any) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogBody, setDialogBody] = useState(<></>);
  const [dialogActions, setDialogActions] = useState(<></>);

  const OpenDialog = (title: string, body: JSX.Element, actions: any = undefined) => {
    setDialogTitle(title);
    setDialogBody(body);
    if (actions)
      setDialogActions(actions);
    else
      setDialogActions(<Button onClick={() => setShowDialog(false)} variant="contained">Close Dialog</Button>)
    setShowDialog(true)
  }

  const handleDialogClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    setShowDialog(false);
  };

  return (
    <DialogContext.Provider value={{
      showDialog,
      dialogTitle,
      dialogBody,
      dialogActions,
      handleDialogClose,
      OpenDialog
    }}>
      {props.children}
    </DialogContext.Provider>
  )
}

export default DialogContextProvider;
