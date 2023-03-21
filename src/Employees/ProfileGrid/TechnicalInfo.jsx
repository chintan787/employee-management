import React from 'react'
import { styles } from './ProfileGrid.style'
import {
    Box,
    Grid,
    Typography,
} from '@mui/material';

export default function TechnicalInfo(props) {
    

    /* const ListOfSkills = props.empProfileData.emp_skills?.toString() || '';
    console.log("temp", ListOfSkills.split(',').join(', ')); */
    // .includes("year") ? "year" : ""
const experience = props.empProfileData?.emp_total_experience


    return (
     
                    <Box sx={styles.empInfo}>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, }}>
                            <Grid item xs={6} /* sm={8}  */ md={4} sx={styles.infoList}>
                                <Typography className="title">Salary (INR)</Typography>
                                <Typography className="info">{props.empProfileData.emp_basic_salary ? props.empProfileData.emp_basic_salary  : "-"}</Typography>

                            </Grid>
                          {/*   <Grid item xs={6} md={4} sx={styles.infoList}>
                                <Typography className="title">Designation</Typography>
                                <Typography className="info">{props.empProfileData.emp_designation}</Typography>
                            </Grid> */}
                            {/* <Grid item xs={6} md={4} sx={styles.infoList}>
                                                        <Typography className="title">Skills</Typography>
                                                        <Typography className="info">{ListOfSkills.split(',').join(', ')}</Typography>
                                                     */}    {/*  {skills && skills.length ? skills.map(name => (
                                                    <Typography className="info">{name}</Typography>
                                                )) : null}  */}

                            {/*  </Grid> */}

                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                <Typography className="title">Date of Joining</Typography>
                                <Typography className="info">{props.empProfileData.emp_joining_date ? props.empProfileData.emp_joining_date : "-" }</Typography>

                            </Grid>
                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                <Typography className="title">Total Experience</Typography>
                                {/* experience.includes("year") ? experience : experience+"year" */}
                                <Typography className="info">{ experience.length > 0 ? experience.includes("year") ? experience : experience+" year" : "-"}</Typography>
                            </Grid>

                        </Grid>
                    </Box>

               
    )
}
