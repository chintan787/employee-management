import React from 'react'
import { styles } from './ProfileGrid.style'
import {
    Button,
    Box,
    Grid,
    Typography,
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import dateFormat, { masks } from "dateformat";


export default function BasicInfo(props) {
    
    return (
        <>
        <Box sx={styles.empInfo}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1 }}>
                    <Grid item xs={6} md={4} sx={styles.infoList}>
                        <Typography className="title">First Name*</Typography>
                        <Typography className="info">{props.empProfileData.emp_first_name ? props.empProfileData.emp_first_name : "-"}</Typography>

                    </Grid>
                    <Grid item xs={6} md={4} sx={styles.infoList}>
                        <Typography className="title">Last Name*</Typography>
                        <Typography className="info">{props.empProfileData.emp_last_name ? props.empProfileData.emp_last_name : "-"}</Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={styles.infoList}>
                        <Typography className="title">Email*</Typography>
                        <Typography className="info email">{props.empProfileData.emp_email ? props.empProfileData.emp_email : "-"}</Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={styles.infoList}>
                        <Typography className="title">Company Email</Typography>
                        <Typography className="info email">{props.empProfileData.emp_company_email ? props.empProfileData.emp_company_email : "-"}</Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={styles.infoList}>
                        <Typography className="title">Mobile No</Typography>
                        <Typography className="info">{props.empProfileData.emp_mo_no ? props.empProfileData.emp_mo_no : "-"}</Typography>

                    </Grid>
                    <Grid item xs={6} md={4} sx={styles.infoList}>
                        <Typography className="title">City</Typography>
                        <Typography className="info">{props.empProfileData.emp_city ? props.empProfileData.emp_city : "-"}</Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={styles.infoList}>
                        <Typography className="title">State</Typography>
                        <Typography className="info">{props.empProfileData.emp_state ? props.empProfileData.emp_state : "-"}</Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={styles.infoList}>
                        <Typography className="title">Birth Date</Typography>
                        <Typography className="info">{props.empProfileData.emp_birthdate ? dateFormat(props.empProfileData.emp_birthdate,'dd-mm-yyyy') : "-"}</Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={styles.infoList}>
                        <Typography className="title">Gender</Typography>
                        <Typography className="info">{props.empProfileData.emp_gender ? props.empProfileData.emp_gender : "-"}</Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={styles.infoList}>
                        <Typography className="title">Marital status</Typography>
                        <Typography className="info">{props.empProfileData.emp_marital_status ? props.empProfileData.emp_marital_status : "-"}</Typography>
                    </Grid>
                    <Grid item xs={6} md={4} sx={styles.infoList}>
                        <Typography className="title">Address</Typography>
                        <Typography className="info">{props.empProfileData.emp_address ? props.empProfileData.emp_address : "-"}</Typography>
                    </Grid>
                </Grid>

                
            </Box>
            <Button sx={styles.downloadButton} variant="contained" startIcon={<GetAppIcon />}>
            Download Resume
        </Button>
        <Button sx={styles.downloadButton} variant="contained" startIcon={<AssignmentOutlinedIcon />}>
            Documents
        </Button>
        </>
        
    )
}
