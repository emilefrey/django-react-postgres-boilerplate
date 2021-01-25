import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { APP_NAME } from '../../settings'
import { AppProps } from '../../App'
import { AccountCircle } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import DropdownMenu from '../Layout/DropdownMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopBar(props: AppProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {APP_NAME}
          </Typography>
          <IconButton aria-label="home page" color="inherit" href="/">
            <HomeIcon />
          </IconButton>
          {props.isAuthenticated && (
            <DropdownMenu dropdownButtonIcon={<AccountCircle />}>
              <div>
                <MenuItem component='a' href='/update_password'>Change Password</MenuItem>
                <MenuItem onClick={() => props.logout()}>Logout</MenuItem>
              </div>
            </DropdownMenu>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
