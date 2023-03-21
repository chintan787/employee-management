import React from 'react';
import {
    Box,
    Toolbar
  } from '@mui/material';
import { styles } from '../components/SideNavForPages.style';
import ProfileGrid from '../Employees/ProfileGrid/ProfileGrid';
 import { useParams } from 'react-router-dom'; 
import EmployeeSalarySlip from '../components/EmployeeSalaryslip/EmployeeSalarySlip';
 

export default function PayRollPage() {
  return (
    <Box sx={styles.pageContent} component="main">
    <Toolbar />
    <EmployeeSalarySlip /> 
    </Box>
  )
}
