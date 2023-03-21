import React from 'react'
import { styles } from '../SideNav/SideNav.style';
import {
    AppBar,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header(props) {

    const [mobileOpen, setMobileOpen] = React.useState(false);
    /* const [contact ,setContact] = useState(data); */
    const drawerWidth = 250;
    const { window } = props;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

  return (
      <>
    <CssBaseline />
    <AppBar
      position="fixed"
      sx={{
          boxShadow:'none',
          borderBottom:'1px solid #EDF2F7',
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ background: '#fff' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2,color:'#4C6FFF', display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={styles.pageHeading}>
         Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
    </>
  )
}
