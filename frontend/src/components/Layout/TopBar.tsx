import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { APP_NAME } from '../../settings'
import { AccountCircle } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import DropdownMenu from './DropdownMenu';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleDarkMode } from '../../redux/darkMode/darkModeSlice';
import { forceLogout } from '../../redux/auth/authSlice';
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

export default function TopBar(props: any) {
  const classes = useStyles();
  const history = useHistory()

  const { authenticated } = useAppSelector(state => state.auth)
  const { darkMode } = useAppSelector(state => state.darkMode)
  const dispatch = useAppDispatch()

  return (
    <AppBar position="relative">
      <Toolbar className={authenticated ? classes.authToolbar : undefined}>
        <Typography variant="h5" align="center" className={classes.title}>
          {APP_NAME}
        </Typography>
        <Tooltip title={`Toggle light/dark theme`}>
          <IconButton color="inherit" onClick={() => dispatch(toggleDarkMode())} >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
        {authenticated && (
          <DropdownMenu dropdownButtonIcon={<AccountCircle />}>
            <div>
              <MenuItem component='a' onClick={() => history.push('/change_password/')}>Change Password</MenuItem>
              <MenuItem onClick={() => dispatch(forceLogout())}>Logout</MenuItem>
            </div>
          </DropdownMenu>
        )
        }
      </Toolbar>
    </AppBar>
  );
}
