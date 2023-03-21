import React, { useEffect, useState } from 'react'
import { styles } from './ProfileGrid.style'
import { inputStyles } from '../../components/FormInput.style'
import { getEmployee } from '../../Action/Employees';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    CardContent,
    Grid,
    Typography,
    IconButton,
    Avatar,
    Stack,
    Button,
    Tooltip,
    Fade,
    CircularProgress

} from '@mui/material';
import { Link } from 'react-router-dom'
import CustomCard from '../../components/CustomCard/CustomCard';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import GetAppIcon from '@mui/icons-material/GetApp';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

import BasicInfo from './BasicInfo';
import TechnicalInfo from './TechnicalInfo';
import BaiscInfoEditForm from './BaiscInfoEditForm';
import TechnicalInfoEditForm from './TechnicalInfoEditForm';
import EmployeeIntro from './EmployeeIntro';
import EmployeeIntroEditForm from './EmployeeIntroEditForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileGrid(props) {
    const [isEditBasicInfoOpen, setIsEditBasicInfoOpen] = useState(false);
    const [isEditTechnicalInfoOpen, setIsEditTechnicalInfoOpen] = useState(false);
    const [isEditEmpIntroOpen, setIsEditEmpIntroOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);
    // console.log("userAsObjectAgain", userAsObjectAgain?.user_role)
    const role = userAsObjectAgain?.user_role

    const dispatch = useDispatch()
    const empProfileData = useSelector(
        (state) => state.EmployeeReducer?.employee
    );
    useEffect(() => {
        setLoading(true)
        dispatch(getEmployee(props.id, setLoading))
    }, [])

    useEffect(() => {
        console.log("empProfileData", empProfileData)
    }, [empProfileData])

    const skills = empProfileData.emp_skills;
    /* const ListOfSkills = empProfileData.emp_skills?.toString() || '';
    console.log("temp", ListOfSkills.split(',').join(', ')); */

    const handleupdateEmpIntro = (e) => {
        console.log(e.target.value)
    }


    return (
        <>
            {role === 1 ? 
            <Grid container spacing={3} >
                <Grid item xs={12} xl={11} >
                    <Stack direction="row" spacing={2} sx={styles.buttonSection}>
                        <Link to={`/employees/update/${props.id}`}>
                            <Button sx={styles.secondaryButton} className='buttons secondaryButton' variant="outlined" startIcon={<ModeEditOutlinedIcon />} >
                                edit
                            </Button>
                        </Link>
                        <Link to="/employees/create">
                            <Button sx={styles.primaryButton} className='buttons primaryButton' variant="contained" endIcon={<AddOutlinedIcon />}>
                                create
                            </Button>
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
             : "" } 

            <Box>

                <Grid container spacing={3} >


                    {loading ? <Grid item xs={12} >
                        <Box sx={styles.basicInfosection} >
                            <CustomCard>
                                <CardContent sx={styles.cardContentEmpty}>
                                    <CircularProgress sx={styles.loaderColor} />
                                </CardContent>
                            </CustomCard>
                        </Box>
                    </Grid> :
                        Object.keys(empProfileData).length !== 0 ?
                            <>
                                <Grid item xs={12} md={4} sx={styles.stickyProfileGird}>
                                    <CustomCard>
                                      
                                        <Box sx={styles.empIntroductionSection}>
                                        {role === 1 ?
                                            <Tooltip title="Edit" placement="right" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                                                <IconButton aria-label="edit" sx={styles.empEditButton} onClick={() => { setIsEditEmpIntroOpen(!isEditEmpIntroOpen) }}>
                                                    < ModeEditOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>
                                        : "" }
                                        </Box> 
                                        
                                        <CardContent sx={styles.cardContentUserProfile} >
                                            {isEditEmpIntroOpen ? <EmployeeIntroEditForm empProfileData={empProfileData} handleupdateEmpIntro={handleupdateEmpIntro} isEditEmpIntroOpen={isEditEmpIntroOpen} setIsEditEmpIntroOpen={setIsEditEmpIntroOpen} /> :
                                                <EmployeeIntro empProfileData={empProfileData} />
                                            }

                                        </CardContent>
                                    </CustomCard>
                                </Grid>

                                <Grid item xs={12} md={8} xl={7} >
                                    <Box sx={styles.basicInfosection}>
                                        <CustomCard>
                                            <CardContent sx={styles.cardContent} >
                                                <Box sx={styles.empInfoHeadingSection}>
                                                    <Typography variant='h2' sx={styles.empIntroTitle}>Basic Information {/* <ModeEditOutlinedIcon sx={{marginLeft:'10px'}} />*/}</Typography>
                                                    {role === 1 ?
                                                    <Tooltip title="Edit" placement="right" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                                                        <IconButton aria-label="edit" sx={styles.empEditButton} onClick={() => { setIsEditBasicInfoOpen(!isEditBasicInfoOpen) }}>
                                                            < ModeEditOutlinedIcon label="edit" />
                                                        </IconButton>
                                                    </Tooltip> : "" }
                                                </Box>
                                                {isEditBasicInfoOpen ? <BaiscInfoEditForm empProfileData={empProfileData} isEditBasicInfoOpen={isEditBasicInfoOpen} setIsEditBasicInfoOpen={setIsEditBasicInfoOpen} />
                                                    : <BasicInfo empProfileData={empProfileData} />
                                                }

                                            </CardContent>

                                        </CustomCard>
                                    </Box>


                                    <Box sx={styles.techInfosection}>
                                        <CustomCard>
                                            <CardContent sx={styles.cardContent} /* style={{ background: isEditTechnicalInfoOpen ? "#f7fafc" : "#fff" }} */>
                                                <Box sx={styles.empInfoHeadingSection}>
                                                    <Typography variant='h2' sx={styles.empIntroTitle}>Technical Information</Typography>
                                                    {role === 1 ?
                                                    <Tooltip title="Edit" placement="right" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                                                        <IconButton aria-label="edit" sx={styles.empEditButton} onClick={() => { setIsEditTechnicalInfoOpen(!isEditTechnicalInfoOpen) }}>
                                                            < ModeEditOutlinedIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    : "" }
                                                </Box>
                                                {isEditTechnicalInfoOpen ? <TechnicalInfoEditForm empProfileData={empProfileData} isEditTechnicalInfoOpen={isEditTechnicalInfoOpen} setIsEditTechnicalInfoOpen={setIsEditTechnicalInfoOpen} />
                                                    : <TechnicalInfo empProfileData={empProfileData} />
                                                }


                                            </CardContent>
                                        </CustomCard>
                                    </Box>
                                </Grid>

                                <Box sx={inputStyles.toastContainer}>
                                    <ToastContainer limit={2} position="bottom-right" autoClose={2000} />
                                </Box>
                            </>
                            :
                            <Grid item xs={12} >
                                <Box sx={styles.basicInfosection} >
                                    <CustomCard>
                                        <CardContent sx={styles.cardContentEmpty}>

                                            <Typography variant='h2' sx={styles.empIntroTitle}>Profile Doesn't Match</Typography>
                                        </CardContent>
                                    </CustomCard>
                                </Box>
                            </Grid>
                    }
                </Grid>
            </Box>
        </>
    )
}
export default ProfileGrid