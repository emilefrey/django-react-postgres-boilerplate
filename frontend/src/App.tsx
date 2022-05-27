import React, { useContext, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
  useHistory,
} from "react-router-dom";
import { 
  ThemeProvider, 
  CssBaseline, 
  Snackbar, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions } from "@material-ui/core";

import { useAppSelector } from './redux/hooks';
import { Login } from './components/Login/Login';
import { appArray } from "./routes/Routes";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout/Layout";
import { theme } from "./Theme";
import { DialogContext } from "./contexts/DialogContext";
import { Alert } from "@material-ui/lab";
import { AlertContext } from "./contexts/AlertContext";
import PasswordUpdate from "./components/Login/PasswordUpdate";
import PasswordReset from "./components/Login/PasswordReset";

export function App() {
  const location = useLocation();
  const { authenticated } = useAppSelector(state => state.auth)
  const { darkMode } = useAppSelector(state => state.darkMode)
  const history = useHistory()
  const { showDialog, dialogTitle, dialogBody, dialogActions, handleDialogClose } = useContext(DialogContext);
  const { alertType, openAlert, alertMessage, handleAlertClose } = useContext(AlertContext);
  
  const publicRoutes = [
    { path: "login", component: Login, exact: true },
    { path: "password_reset", component: PasswordReset, exact: true }
  ]

  const atPublicRoute = publicRoutes.findIndex(route => location.pathname.includes(route.path)) !== -1

  useEffect(() => {
    // when un-authenticated, redirect to login (only for non-public routes)
    if (!authenticated && !atPublicRoute) {
      history.push({ pathname: "/login", state: { from: location } })
    }
  }, [authenticated, location.pathname])

  const generateAppRoutes = () => {
    return appArray
      .map((app, index1) => {
        let result = app.routes?.map((route, index2) => {
          const key = `${index1}_${index2}`
          return <PrivateRoute key={key} exact={route.exact} path={route.path} component={route.component} />;
        })
        return result
      })
  }

  const privateRoutes = useMemo(() => generateAppRoutes(), []);

  return (
    <ThemeProvider theme={theme(darkMode ? "dark" : "light")}>
      <CssBaseline />
      <Snackbar id="appAlertSnackbar" open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert variant="filled" onClose={handleAlertClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Dialog maxWidth="md" fullWidth open={showDialog} onClose={handleDialogClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          {dialogBody}
        </DialogContent>
        <DialogActions>
          {dialogActions}
        </DialogActions>
      </Dialog>
      <Layout>
        <div className={atPublicRoute ? "" : "content-wrap"}>
          <div className={atPublicRoute ? "" : "container-fluid body main_container"}>
            <Switch>
              {publicRoutes.map((route, index) =>
                <Route key={index} component={route.component} path={"/" + route.path} exact={route.exact} />
              )}
              {privateRoutes}
              <PrivateRoute component={PasswordUpdate} path={"/change_password"}/>
              <Redirect from="/" to={"/home"} />
            </Switch>
          </div>
        </div>
      </Layout>
    </ThemeProvider>
  )
}

export function MainPage() {
  return (
    //@ts-ignore - TODO: NEED TO ADDRESS TS ERROR HERE
    <Router>
      <App />
    </Router>
  )
}