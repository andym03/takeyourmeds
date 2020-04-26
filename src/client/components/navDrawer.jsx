import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import GitHubIcon from '@material-ui/icons/GitHub';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PetsIcon from '@material-ui/icons/Pets';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import List from '@material-ui/core/List';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {
  BrowserRouter as Router,
  Link,
  useLocation
} from 'react-router-dom';

import './navDrawer.css';

const drawerWidth = 240;

// // create your forceUpdate hook
// function useForceUpdate() {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => ++value); // update the state to force render
// }

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    margin: theme.spacing(2),
  },
  hide: {
    visibility: 'hidden',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NavDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Link to="/">
            <h4 className="medsLogo">Take Your Meds</h4>
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List className="listbuttonStyles">
          <Link to="/about">
            <ListItem
              button
              key="About us"
              className={classes.listButtonStyles}
            >
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="About us" />
            </ListItem>
          </Link>
          <Link to="/settings">
            <ListItem
              button
              key="Email-Settings"
              className={classes.listButtonStyles}
            >
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
          <a href="https://paypal.me/andrewmcmenemy03">
            <ListItem
              button
              key="Donate"
              className={classes.listButtonStyles}
            >
              <ListItemIcon><CreditCardIcon /></ListItemIcon>
              <ListItemText primary="Donate" />
            </ListItem>
          </a>
          <Divider />
          <Link to="/memes">
            <ListItem
              button
              key="Youtube"
              className={classes.listButtonStyles}
            >
              <ListItemIcon><YouTubeIcon /></ListItemIcon>
              <ListItemText primary="Wholesome Memes" />
            </ListItem>
          </Link>
          <Link to="/animal_crossing">
            <ListItem
              button
              key="Animal Crossing"
              className={classes.listButtonStyles}
            >
              <ListItemIcon><PetsIcon /></ListItemIcon>
              <ListItemText primary="Animal Crossing" />
            </ListItem>
          </Link>
          <a href="https://github.com/andym03/takeyourmeds">
            <ListItem
              button
              key="Github"
              className={classes.listButtonStyles}
            >
              <ListItemIcon><GitHubIcon /></ListItemIcon>
              <ListItemText primary="Source Code" />
            </ListItem>
          </a>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
