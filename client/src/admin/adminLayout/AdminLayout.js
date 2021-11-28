import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { AppBar, Drawer, DrawerHeader } from './layoutHelpers';
import Database from '../database/Database';
import { Link } from 'react-router-dom';

export default function AdminLayout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [linkDisableObject, setLinkDisableObject] = React.useState({
        'dashboard': false,
        'user': false,
        'order': false,
        'product': false,
        'category': false,
        'state': false,
        'city': false,
        'description-type': false,
        'coupon': false,
        'promotionCode': false,
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleLinkDisable = (e, link) => {
        if (linkDisableObject[link]) {
            e.preventDefault();
            return;
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Mini variant drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <Link onClick={e => handleLinkDisable(e, 'user')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/user">
                        <ListItem disabled={linkDisableObject.user} button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link onClick={e => handleLinkDisable(e, 'order')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/order">
                        <ListItem disabled={linkDisableObject.order} button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Orders" />
                        </ListItem>
                    </Link>
                    <Link onClick={e => handleLinkDisable(e, 'product')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/product">
                        <ListItem disabled={linkDisableObject.product} button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                        </ListItem>
                    </Link>
                    <Link onClick={e => handleLinkDisable(e, 'category')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/category">
                        <ListItem disabled={linkDisableObject.category} button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link onClick={e => handleLinkDisable(e, 'coupon')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/coupon">
                        <ListItem disabled={linkDisableObject.coupon} button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Coupons" />
                        </ListItem>
                    </Link>
                    <Link onClick={e => handleLinkDisable(e, 'promotionCode')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/promotion-code">
                        <ListItem disabled={linkDisableObject.promotionCode} button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Promotion Codes" />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link onClick={e => handleLinkDisable(e, 'state')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/state">
                        <ListItem disabled={linkDisableObject.state} button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="States" />
                        </ListItem>
                    </Link>
                    <Link onClick={e => handleLinkDisable(e, 'city')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/city">
                        <ListItem disabled={linkDisableObject.city} button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cities" />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link onClick={e => handleLinkDisable(e, 'description-type')} style={{ color: 'black', textDecoration: 'none' }} to="/admin/description-type">
                        <ListItem disabled={linkDisableObject['description-type']} button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Description Types" />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <div className="margin-global-top-6" />
                <Database
                    linkDisableObject={linkDisableObject}
                    setLinkDisableObject={setLinkDisableObject}
                />
            </Box>
        </Box>
    );
}