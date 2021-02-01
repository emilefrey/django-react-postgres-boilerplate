import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { APP_NAME } from '../../settings'
import { AppProps } from '../../App'
import { AccountCircle } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import DropdownMenu from '../Layout/DropdownMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  authToolbar: {
    paddingLeft: "96px"
  }
}));

export default function TopBar(props: AppProps) {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar className={props.isAuthenticated ? classes.authToolbar : undefined}>
        <Typography variant="h5" align="center" className={classes.title}>
          {APP_NAME}
        </Typography>
        {props.isAuthenticated && (
          <DropdownMenu dropdownButtonIcon={<AccountCircle />}>
            <div>
              <MenuItem component='a' href='/change_password'>Change Password</MenuItem>
              <MenuItem onClick={() => props.logout()}>Logout</MenuItem>
            </div>
          </DropdownMenu>
        )}
      </Toolbar>
    </AppBar>
  );
}
