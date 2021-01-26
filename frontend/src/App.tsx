import React, { Dispatch } from 'react';
import Router from './routes/Router';
import Layout from './components/Layout/Layout';
import { connect } from 'react-redux';
import * as actions from './auth/authActions';
import { PrivateRouteProps } from './routes/PrivateRoute';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './Theme'
export interface AuthProps {
  logout: Function
  setAuthenticatedIfRequired: Function
  onAuth: Function
  token: string
  error: {
    message: string
    response: {
      data: {
        non_field_errors: string[]
      }
    }
  }
}

export interface AppProps extends AuthProps, PrivateRouteProps { }

function App(props: AppProps) {

  React.useEffect(() => {
    props.setAuthenticatedIfRequired();
  }, [props]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout {...props}>
          <Router {...props} />
        </Layout>
      </ThemeProvider>
    </div>
  );
}

interface MapStateToPropsInterface {
  auth: {
    token: string,
    error: {
      message: string
      response: {
        data: {
          non_field_errors: string[]
        }
      }
    }
  }
}

//This means that one or more of the redux states in the store are available as props
const mapStateToProps = (state: MapStateToPropsInterface) => {
  return {
    isAuthenticated: state.auth.token !== null && typeof state.auth.token !== 'undefined',
    token: state.auth.token,
    error: state.auth.error
  }
}

//This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setAuthenticatedIfRequired: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.authLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
