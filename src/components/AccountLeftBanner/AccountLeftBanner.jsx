import React from 'react';
import { styles } from '../Login/Login.style';
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Hidden
} from '@mui/material';
 


export default function AccountLeftBanner(props) {

    
  return (
  
      <Hidden only={['xs']}>
        <Grid item sm={4} md={4}  sx={styles.leftContent}  >
          <Hidden only={['xs']}>
            <Box sx={styles.logoSection}>
              <Link to="/dashboard"><img className='sidenav-logo' src="/square-logo.jpg" alt='logo_image' /> </Link>
            </Box>
          </Hidden>

          <Box sx={styles.textContent}>
            <Typography variant='h2' sx={styles.introHeading}>Connecting <span className='highlight'>People</span> , Driving <span className='highlight'>Performance</span> & <span className='highlight'>Empowering</span> Organizations </Typography>
          </Box>

          {/* <Box>
            <Link to='/' > <Box sx={styles.messageIcon}> <CommentIcon className='message-icon' /></Box></Link>
            <Box sx={styles.ellipse}></Box>
          </Box> */}

        </Grid>
      </Hidden>
    
  )
}
