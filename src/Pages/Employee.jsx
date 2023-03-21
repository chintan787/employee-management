import React from 'react';
import {
    Box,
    Toolbar
  } from '@mui/material';
import { styles } from '../components/SideNavForPages.style'; 
import EmployeesTable from '../components/EmployeesTable/EmployeesTable';

export default function Employee() {
  return (
    <Box sx={styles.pageContent} component="main">
      <Toolbar />
         <EmployeesTable />  
      </Box>
  )
}
