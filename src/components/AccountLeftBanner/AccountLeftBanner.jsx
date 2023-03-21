import React from 'react';
import { styles } from '../Login/Login.style';
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Hidden
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
 


export default function AccountLeftBanner(props) {
/*     constructor(props) {
        super(props);

    } */
    
  return (
  
      <Hidden only={['xs']}>
        <Grid item sm={4} md={4}  sx={styles.leftContent}  >
          <Hidden only={['xs']}>
            <Box sx={styles.logoSection}>
              <Link to='/' ><img className='logo-dashboard' src='/dashboard.svg' alt='logo_image' /></Link>
              <Link to='/' > <img className='logo-clever' src='/clever.svg' alt='clever' /></Link>
            </Box>
          </Hidden>

          <Box sx={styles.textContent}>
            <Typography variant='h2' sx={styles.introHeading}>{props.introHeading}</Typography>
            <Typography sx={styles.introSubheading}>{props.introSubHeading} </Typography>
          </Box>

          <Box>
            <Link to='/' > <Box sx={styles.messageIcon}> <CommentIcon className='message-icon' /></Box></Link>
            <Box sx={styles.ellipse}></Box>
          </Box>

        </Grid>
      </Hidden>
    
  )
}
