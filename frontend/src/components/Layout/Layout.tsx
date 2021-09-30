import React from 'react';
import TopBar from "./TopBar"
import { Box, Tooltip, ListItem, Divider, Container, makeStyles, List } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { appArray } from '../../routes/Routes'
import { useAppSelector } from '../../redux/hooks';

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: theme.palette.background.paper,
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.secondary.main,
    fontFamily: 'Calibri',
  },
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  navBar: {
    backgroundColor: theme.palette.secondary.main,
    padding: 0,
    margin: 0,
    zIndex: 1102,
  },
  ListContainer: {
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
  },
  ListItem: {
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
  },
}));


function Layout(props: { children: JSX.Element }) {
  const classes = useStyles();
  let location = useLocation();
  let history = useHistory();
  const { authenticated } = useAppSelector(state => state.auth)

  const mainListItems = (
    <Box className={classes.ListContainer}>
      {appArray
        .filter(route => location.pathname !== 'login')
        .map((route, index) => {
          const { buttonTitle, baseRoute, Icon } = route;
          return (
            <Tooltip title={buttonTitle ?? ""} aria-label={buttonTitle} key={index}>
              <ListItem className={classes.ListItem} button onClick={() => history.push(baseRoute)} selected={location.pathname.startsWith(baseRoute)}>
                {Icon && <Icon />}
              </ListItem>
            </Tooltip>
          );
        })}
    </Box>
  );


  return (
    <div className={classes.body}>
      <Divider />
      {authenticated && <List className={classes.navBar}>{mainListItems}</List>}
      <Divider />
      <main className={classes.content}>
        {authenticated && <TopBar {...props} />}
        {props.children &&
          <Container maxWidth="xl" className={classes.container}>
            {props.children}
          </Container>
        }
      </main>
    </div>
  )
}

export default Layout