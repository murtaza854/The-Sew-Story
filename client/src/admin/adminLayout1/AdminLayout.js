import React from 'react';
import clsx from 'clsx';
import { AppBar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, MenuItem, Menu, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreIcon from '@mui/icons-material/MoreVert';
import WebIcon from '@mui/icons-material/Web';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import BlockIcon from '@mui/icons-material/Block';
// import BusinessIcon from '@mui/icons-material/Business';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Switch from "@material-ui/core/Switch";
// import { EnhancedTable, AdminForm, DeleteConfirmation } from '../../admin'
import {
  // BrowserRouter as Router,
  // Switch as RouterSwitch,
  Link,
  // Route,
} from "react-router-dom";
import api from '../../api';
import './AdminLayout.scss';


const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1
  },
  listItemIcon: {
    //   minWidth: 40,
    paddingLeft: 10
  }
}));


function AdminLayout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  let color = 'white';
  if (!props.darkState) color = 'black';

  const handleThemeChange = async () => {
    props.setDarkState(!props.darkState);
    // await fetch('http://localhost:4000/api/set-darktheme', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   credentials: 'include',
    //   withCredentials: true,
    //   body: JSON.stringify({darkState:!props.darkState})
    // }); 
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleLogout = async e => {
    e.preventDefault();
    await fetch(`${api}/admin-user/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      withCredentials: true,
    });
    props.user.setUserState(null);
  }

  return (
    // <ThemeProvider theme={darkTheme}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openDrawer,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            Mzushi Admin
          </Typography>
          <Switch checked={props.darkState} onChange={handleThemeChange} />
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
          <Menu
            // className={classes.root}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={_ => window.location.pathname = '/'}>
              <ListItemIcon className={classes.listItemIcon}>
                <WebIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">Go to website</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon className={classes.listItemIcon}>
                <LockIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">Change password</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon className={classes.listItemIcon}>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link style={{ color: color, textDecoration: 'none' }} to={'/admin'}>
            <ListItem button key='Dashboard'>
              <ListItemIcon className={classes.listItemIcon}><DashboardIcon /></ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
          </Link>
          <Divider />
          <Link style={{ color: color, textDecoration: 'none' }} to={'/admin/admin-user'}>
            <ListItem button key='admin-user'>
              <ListItemIcon className={classes.listItemIcon}><SupervisorAccountIcon /></ListItemIcon>
              <ListItemText primary='Admin Users' />
            </ListItem>
          </Link>
          <Link style={{ color: color, textDecoration: 'none' }} to={'/admin/features'}>
            <ListItem button key='features'>
              <ListItemIcon className={classes.listItemIcon}><SupervisorAccountIcon /></ListItemIcon>
              <ListItemText primary='Features' />
            </ListItem>
          </Link>
          <Divider />
          <Link style={{ color: color, textDecoration: 'none' }} to={'/admin/category'}>
            <ListItem button key='category'>
              <ListItemIcon className={classes.listItemIcon}><SupervisorAccountIcon /></ListItemIcon>
              <ListItemText primary='Categories' />
            </ListItem>
          </Link>
          <Link style={{ color: color, textDecoration: 'none' }} to={'/admin/ad-package'}>
            <ListItem button key='ad'>
              <ListItemIcon className={classes.listItemIcon}><PhotoLibraryIcon /></ListItemIcon>
              <ListItemText primary='Ad' />
            </ListItem>
          </Link>
          <Divider />
          <Link style={{ color: color, textDecoration: 'none' }} to={'/admin/product-brand'}>
            <ListItem button key='product-brand'>
              <ListItemIcon className={classes.listItemIcon}><AccountTreeIcon /></ListItemIcon>
              <ListItemText primary='Product Brands' />
            </ListItem>
          </Link>
          <Link style={{ color: color, textDecoration: 'none' }} to={'/admin/product-category'}>
            <ListItem button key='product-category'>
              <ListItemIcon className={classes.listItemIcon}><AccountTreeIcon /></ListItemIcon>
              <ListItemText primary='Product Categories' />
            </ListItem>
          </Link>
          <Link style={{ color: color, textDecoration: 'none' }} to={'/admin/product-sub-category'}>
            <ListItem button key='product-sub-category'>
              <ListItemIcon className={classes.listItemIcon}><AccountTreeIcon /></ListItemIcon>
              <ListItemText primary='Product Sub Categories' />
            </ListItem>
          </Link>
          <Divider />
          <Link style={{ color: color, textDecoration: 'none' }} to={'/admin/country'}>
            <ListItem button key='country'>
              <ListItemIcon className={classes.listItemIcon}><PhotoLibraryIcon /></ListItemIcon>
              <ListItemText primary='Countries' />
            </ListItem>
          </Link>
          <Link style={{ color: color, textDecoration: 'none' }} to={'/admin/province'}>
            <ListItem button key='province'>
              <ListItemIcon className={classes.listItemIcon}><PhotoLibraryIcon /></ListItemIcon>
              <ListItemText primary='Provinces' />
            </ListItem>
          </Link>
          <Link style={{ color: color, textDecoration: 'none' }} to={'/admin/city'}>
            <ListItem button key='city'>
              <ListItemIcon className={classes.listItemIcon}><PhotoLibraryIcon /></ListItemIcon>
              <ListItemText primary='Cities' />
            </ListItem>
          </Link>
          <Link style={{ color: color, textDecoration: 'none' }} to={'/admin/area'}>
            <ListItem button key='area'>
              <ListItemIcon className={classes.listItemIcon}><PhotoLibraryIcon /></ListItemIcon>
              <ListItemText primary='Areas' />
            </ListItem>
          </Link>
        </List>
        <Divider />
        {/* <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <RouterSwitch> */}
          {/* <Route path="/admin/:model/edit/:id" children={<AdminForm />} />
          <Route path="/admin/:model/add" children={<AdminForm />} />
          <Route path="/admin/:model/delete" children={<DeleteConfirmation />} />
          <Route path="/admin/:model" children={<EnhancedTable />} /> */}
        {/* </RouterSwitch> */}
      </main>
    </div>
    // </ThemeProvider>
  );
}

export default AdminLayout;