import React from 'react';
import {
    Box,
    Toolbar
} from '@mui/material';
import { styles } from '../components/SideNavForPages.style';
import EmployeeLeaves from '../components/EmployeeLeaves/EmployeeLeaves'

export default function EmployeeLeavesPage() {
    return (
        <>
            <Box sx={styles.pageContent} component="main">
                <Toolbar />
                <EmployeeLeaves />
            </Box>
        </>
    )
}
