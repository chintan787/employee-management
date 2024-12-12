import React, { useEffect } from 'react'
import { styles } from './ProfileGrid.style'
import {
    Box,
    Grid,
    Typography,
} from '@mui/material';
import dateFormat, { masks } from "dateformat";

export default function TechnicalInfo(props) {



    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);
    const role = userAsObjectAgain?.user_role;
    let employeeTenure;

    function calculateYearsAndMonths(startDate) {
        if (!(startDate instanceof Date) || isNaN(startDate)) {
            console.error("Invalid start date provided");
            return "Please provide a valid date.";
        }
        const endDate = new Date(); // Use today's date as the end date
        // Calculate full years and months
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();

        // Adjust for negative months (when end month is earlier than start month)
        if (months < 0) {
            years -= 1;
            months += 12;
        }

        // Format the result
        const yearsText = years > 1 ? `${years} years` : `${years} year`;
        const monthsText = months > 1 ? `${months} months` : `${months} month`;

        if (years === 0) return monthsText; // If less than a year
        if (months === 0) return yearsText; // If no extra months

        return `${yearsText} and ${monthsText}`; // Both years and months
    }

    if (props?.empProfileData?.emp_joining_date) {
        const startDate = new Date(props?.empProfileData?.emp_joining_date);
        employeeTenure = calculateYearsAndMonths(startDate);
    }

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
                        {props.empProfileData?.emp_status === 1 ? props?.empProfileData?.emp_joining_date ? employeeTenure : '-' : '-'}
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
