import React from 'react';
import TopBar from "./TopBar"
import Footer from "./Footer"
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from '../../App'

function Layout(props: AppProps) {
  return (
    <React.Fragment>
      <CssBaseline />
      <TopBar {...props} />
      <div>
        {props.children}
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Layout