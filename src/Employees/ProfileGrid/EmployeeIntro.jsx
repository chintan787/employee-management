import React from 'react'
import { styles } from './ProfileGrid.style'
import {
    Box,
    Grid,
    Typography,
    Avatar,
} from '@mui/material';

export default function EmployeeIntro(props) {
    const skills = props.empProfileData?.emp_skills;
    return (
        <Box key={props.empProfileData.emp_code}>
            <Box sx={styles.userProfileImage}>

                <Avatar sx={styles.empName} src={props.empProfileData?.emp_image_name}>
                    {props.empProfileData?.emp_first_name.charAt(0)}{props.empProfileData?.emp_last_name.charAt(0)}
                </Avatar>

            </Box>
            <Box sx={styles.userIntro}>
                <Typography sx={styles.userName}>{props.empProfileData.emp_first_name ? props.empProfileData.emp_first_name : "-"} {props.empProfileData.emp_last_name}</Typography>
                <Typography sx={styles.userDesignation}>{props.empProfileData.emp_designation ? props.empProfileData.emp_designation : ""}</Typography>
                <Typography sx={styles.empCode}>{props.empProfileData.emp_code ? props.empProfileData.emp_code : "-"}</Typography>
                <Typography sx={styles.userIntroDesc}>{props.empProfileData.emp_bio ? props.empProfileData.emp_bio : ""}</Typography>
            </Box>
            <Box sx={styles.userSkilSection}>
                {skills && skills?.length > 0  ? <>
                <Typography variant='h2' sx={styles.empIntroTitle}>skills</Typography>
                <Box sx={styles.userSkils}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1}}>
                    
                          {skills && skills?.length > 0 ?  skills.map(name => (
                            <Grid item sx={styles.userSkilList} key={name}>
                                <Typography>{name}</Typography>
                            </Grid> 
                         ))  : <Typography>{skills}</Typography>} 


                    </Grid>
                </Box>
                </> : ""}
            </Box>
        </Box>
    )
}
