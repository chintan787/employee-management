import React from 'react';
import {
    Box,
    Toolbar
  } from '@mui/material';
import { styles } from '../components/SideNavForPages.style';
import ProfileGrid from '../Employees/ProfileGrid/ProfileGrid';
 import { useParams } from 'react-router-dom'; 
 

export default function ProfilePage() {

   const { id } = useParams(); 

  return (
    <Box sx={styles.pageContent} component="main">
    <Toolbar />
{/* <h1>details :-{id}</h1> */}

    <ProfileGrid id={id} />
      
    </Box>
  )
}
