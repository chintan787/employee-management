import React, { useState } from 'react';
/* import React, { useState } from 'react'; */
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { styles } from './SideNav.style';
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Avatar,
    Button,
    Hidden,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

export default function SideNav(props) {

    const [mobileOpen, setMobileOpen] = useState(false);
    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);
    const role = userAsObjectAgain?.user_role
  
    const location = useLocation();
    const navigation = useNavigate();
    const drawerWidth = 250;
    const { window } = props;

    const contactData = [
        {
            image_url: "/profile-img1.png",
            name: "Marie Claire",
            location: "Paris, FR",
            status: "online"
        },
       
    ]

   
   
    const handleLogout = () => {
        localStorage.clear();
        navigation('/');
    }
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerData = (

        <Box sx={styles.sideNav}>
            <Box sx={styles.logoSection} >
                <Link to="/dashboard"><img className='sidenav-logo' src="/stroke-logo.png" alt='logo_image' /> </Link>
            </Box>

            <List sx={styles.listSection}>
                <NavLink to='/dashboard'>
                    <ListItem disablePadding sx={styles.listItems}>
                        <ListItemIcon className='list-icon'> {<HomeOutlinedIcon />}</ListItemIcon>
                        <ListItemText className='list-title'>Dashboard</ListItemText>
                    </ListItem>
                </NavLink>

                <NavLink to='/employees'>
                    <ListItem disablePadding sx={styles.listItems}>
                        <ListItemIcon className='list-icon'> {<PeopleOutlineOutlinedIcon />}</ListItemIcon>
                        <ListItemText className='list-title'>Employees</ListItemText>
                    </ListItem>
                </NavLink>

                <NavLink to='/' >
                    <ListItem disablePadding sx={styles.listItems}>
                        <ListItemIcon className='list-icon'> {<AssignmentOutlinedIcon />}</ListItemIcon>
                        <ListItemText className='list-title'>Reports</ListItemText>
                    </ListItem>
                </NavLink>
                {role === 1 ?
                <NavLink to='/payroll' >
                    <ListItem disablePadding sx={styles.listItems}>
                        <ListItemIcon className='list-icon'> {<MonetizationOnOutlinedIcon />}</ListItemIcon>
                        <ListItemText className='list-title'>Payroll</ListItemText>
                    </ListItem>
                </NavLink> 
                : "" }
                <NavLink to='/leaves' >
                    <ListItem disablePadding sx={styles.listItems}>
                        <ListItemIcon className='list-icon'> {<EventOutlinedIcon />}</ListItemIcon>
                        <ListItemText className='list-title'>Leaves</ListItemText>
                    </ListItem>
                </NavLink>
                <NavLink to='/' >
                    <ListItem disablePadding sx={styles.listItems}>
                        <ListItemIcon className='list-icon'> {<TopicOutlinedIcon />}</ListItemIcon>
                        <ListItemText className='list-title'>Documents</ListItemText>
                    </ListItem>
                </NavLink>
            </List>

            <Divider sx={styles.divider} />

           
            <List>
                <ListItem disablePadding sx={styles.listItems}>
                    <ListItemIcon className='list-icon'> {<PersonOutlineOutlinedIcon />}</ListItemIcon>
                    <ListItemText className='list-title'>Account</ListItemText>
                </ListItem>
                <ListItem disablePadding sx={styles.listItems} onClick={handleLogout}>
                    <ListItemIcon className='list-icon'> {<LogoutIcon />}</ListItemIcon>
                    <ListItemText className='list-title'>Logout</ListItemText>
                </ListItem>
            </List>
        </Box>

    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 'none',
                    borderBottom: '1px solid #EDF2F7',
                    backgroundColor: '#fff',
                    width: { lg: `calc(100% - ${drawerWidth}px)` },
                    ml: { lg: `${drawerWidth}px` },

                }}>
                <Toolbar sx={styles.headerSection}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, color: 'primary.dark', display: { lg: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h2" noWrap sx={styles.pageHeading}>
                        {location.pathname.split('/')[1]}
                    </Typography>

                    <Box sx={styles.editAdminProfile}>
                        <Avatar sx={styles.userNameCharacter} /* sx={{ width: 60, height: 60 }} */ alt="Marie Claire" src={userAsObjectAgain.user_image} >
                        {userAsObjectAgain.user_fname ? userAsObjectAgain.user_fname.charAt(0) : ""}{userAsObjectAgain.user_lname ? userAsObjectAgain.user_lname.charAt(0) : ""}
                        </Avatar>
                        <Hidden only={['md', 'lg', 'xl']}>
                        <Box sx={styles.editProfileSection}>
                                <Button sx={styles.editProfileButton} startIcon={<ModeEditOutlinedIcon />}>Edit Profile</Button>
                            </Box>
                            </Hidden>
                            <Hidden only={['xs', 'sm']}>
                        <Typography variant="h5" noWrap sx={styles.adminName}>
                           {userAsObjectAgain.user_fname} {userAsObjectAgain.user_lname}
                           <Box sx={styles.editProfileSection}>
                                <Button sx={styles.editProfileButton} startIcon={<ModeEditOutlinedIcon />}>Edit Profile</Button>
                            </Box>
                        </Typography>
                        </Hidden>
                        

                    </Box>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 }, height: { lg: '100vh' } }}
                aria-label="mailbox folders">
                <Drawer
                id="drawer"
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, 
                    }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderColor: "#EDF2F7" },
                    }}>
                    {drawerData}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderColor: "#EDF2F7" },
                    }}
                    open>
                    {drawerData}
                </Drawer>
            </Box>

        </>
    )

}
