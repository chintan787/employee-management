import React from 'react'
import { styles } from './ProfileGrid.style'
import {
    Box,
    Grid,
    Typography,
} from '@mui/material';
import dateFormat, { masks } from "dateformat";
import { QrCodeScannerOutlined } from '@mui/icons-material';

export default function TechnicalInfo(props) {



    const experience = props.empProfileData?.emp_total_experience
    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);
    const role = userAsObjectAgain?.user_role;



    function calculateYearDifference(startDate, endDate) {
        const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25; 
        const differenceInMilliseconds = endDate - startDate;
        return differenceInMilliseconds / millisecondsPerYear;
    }
  
    let endDate = new Date();
    let startDate = new Date(props?.empProfileData?.emp_joining_date);
    const yearDifferencess = calculateYearDifference(startDate, endDate);
    const roundedNumber = yearDifferencess.toFixed(1);
    return (

        <Box sx={styles.empInfo}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, }}>
                <Grid item xs={6} /* sm={8}  */ md={4} sx={styles.infoList}>
                    <Typography className="title">Current Salary (INR)</Typography>
                    <Typography className="info">{props.empProfileData.emp_basic_salary ? props.empProfileData.emp_basic_salary : "-"}</Typography>

                </Grid>


                <Grid item xs={6} md={4} sx={styles.infoList}>
                    <Typography className="title">Date of Joining</Typography>
                    <Typography className="info">{props.empProfileData.emp_joining_date ? dateFormat(props.empProfileData.emp_joining_date, 'dd-mm-yyyy') : "-"}</Typography>

                </Grid>
                <Grid item xs={6} md={4} sx={styles.infoList}>
                    <Typography className="title">Years in Company</Typography>
                    <Typography className="info">
                        {props.empProfileData?.emp_status === 1 ? props?.empProfileData?.emp_joining_date ? roundedNumber : '-' : '-'}
                        </Typography>
                </Grid>
                {role === 1 && (
                    <>
                        <Grid item xs={6} md={4} sx={styles.infoList}>
                            <Typography className="title">Next Increment</Typography>
                            <Typography className="info">
                                {props.empProfileData.emp_next_increment ? props.empProfileData.emp_next_increment : "-"}
                                </Typography>
                        </Grid>
                        <Grid item xs={6} md={4} sx={styles.infoList}>
                            <Typography className="title">Status</Typography>
                            <Typography className="info">{props.empProfileData?.emp_status === 1 ? "Active" : "InActive"}</Typography>
                        </Grid>
                    </>)}

            </Grid>
        </Box>


    )
}
