import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { APP_NAME } from '../../settings'
import { AccountCircle } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import DropdownMenu from '../Layout/DropdownMenu';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AppProps } from '../../App';
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
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <AppBar position="relative">
      <Toolbar className={props.isAuthenticated ? classes.authToolbar : undefined}>
        <Typography variant="h5" align="center" className={classes.title}>
          {APP_NAME}
        </Typography>
        <Tooltip title={`Toggle light/dark theme`}>
          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)} >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
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
