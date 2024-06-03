import React, { useEffect, useState } from 'react'
import { updateEmployeeProfile, getEmployee } from '../../Action/Employees'
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './ProfileGrid.style';
import { inputStyles } from '../../components/FormInput.style'
import {
    Box,
    Grid,
    Typography,
    TextField,
    Stack,
    Tooltip,
    Button,
    Fade,
    CircularProgress
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import dateFormat, { masks } from "dateformat";


export default function TechnicalInfoEditForm(props) {

    const [saveButtonclick, setSaveButtonClick] = useState(false);
    const [updateEmp, setUpdateEmp] = useState()
    const [isEditInputValues, setIsEditInputValues] = useState(props.empProfileData ? props.empProfileData : "")
    const [loading, setLoading] = useState(false);
    const [empNextIncrement, setEmpNextIncrement] = useState();
    const [min, setMin] = useState();

    const id = props.empProfileData?.emp_code
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);
    const role = userAsObjectAgain?.user_role

    useEffect(()=>{
        // props.empProfileData ? props.empProfileData.emp_next_increment: "" 
        if( props.empProfileData?.emp_next_increment !== null && props.empProfileData?.emp_next_increment !== "")
        {
            const temp = props.empProfileData?.emp_next_increment.split('-');
            const newDate = temp[1]+"-"+temp[0];
            setEmpNextIncrement(newDate)
        }
    },[])

    function handleUpdateTechnicalInfo(event) {
        const { value, name } = event.target
        if (name === "emp_next_increment") {
            setEmpNextIncrement(value)
            setIsEditInputValues({ ...isEditInputValues, [name]: dateFormat(value, 'mm-yyyy') })
        }
        else if(name === "emp_status")
        {
            setIsEditInputValues({ ...isEditInputValues, [name]: value.replace(/[^0-1]/g, '') })
        }
        else {
            setIsEditInputValues({ ...isEditInputValues, [name]: value })
        }
    }
    const handleupdateEmpIntro = (e) => {
        e.preventDefault();
        setLoading(true)
        setUpdateEmp(isEditInputValues)
        setSaveButtonClick(true);
    }
    //get 
    const empProfileData = useSelector(
        (state) => state.EmployeeReducer?.employee
    );
    //update
    const empProfileDataUpdated = useSelector(
        (state) => state.UpdateEmployeeReducer?.updatedata
    );

    useEffect(() => {
        if (saveButtonclick) {
            dispatch(updateEmployeeProfile(id, updateEmp, setLoading, navigate))
        }
    }, [saveButtonclick])

    useEffect(() => {
        if (saveButtonclick) {
            if (Object.keys(empProfileDataUpdated).length !== 0) {
                dispatch(getEmployee(id, setLoading, navigate))
                setTimeout(() => {
                    toast("Data Updated Successfully");
                }, [1000])

                props.setIsEditTechnicalInfoOpen(!props.isEditTechnicalInfoOpen)
            }
            /* if(empProfileDataUpdated.acknowledged !== undefined){
                if(empProfileDataUpdated.acknowledged){
                toast("Data Updated Successfully");
                props.setIsEditTechnicalInfoOpen(!props.isEditTechnicalInfoOpen)
                }
            } */
            else {
                props.setIsEditTechnicalInfoOpen(!props.isEditTechnicalInfoOpen)
            }
        }
    }, [empProfileDataUpdated])

    useEffect(() => {
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        var minDate = year + '-' + month;
        setMin(minDate);
    }, [])


    return (
        <>
            <Box sx={styles.empInfo}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 3, }}>
                    <Grid item xs={6} sx={styles.infoList}>
                        <Typography className="title">Salary (INR)</Typography>
                        <TextField type="number" sx={inputStyles.formInput} placeholder="enter salary" name="emp_basic_salary" value={isEditInputValues.emp_basic_salary ? isEditInputValues.emp_basic_salary : ""} onChange={handleUpdateTechnicalInfo} />
                    </Grid>


                    <Grid item xs={6} sx={styles.infoList}>
                        <Typography className="title">Date of Joining</Typography>
                        <TextField type="date" sx={inputStyles.formInput} placeholder="select date of joining" name="emp_joining_date" value={isEditInputValues?.emp_joining_date} onChange={handleUpdateTechnicalInfo} />
                    </Grid>
                    {/* <Grid item xs={6} sx={styles.infoList}>
                        <Typography className="title">Total Experience</Typography>
                        <TextField type="number" sx={inputStyles.formInput} placeholder="enter experience" name="emp_total_experience" value={isEditInputValues.emp_total_experience ? isEditInputValues.emp_total_experience.replace(/[^0-9]/g, '') : ""} onChange={handleUpdateTechnicalInfo} />
                    </Grid> */}
                    {role === 1 &&
                        (
                            <>
                                <Grid item xs={6} sx={styles.infoList}>
                                    <Typography className="title">Next Increment</Typography>
                                    <TextField inputProps={{ min: min }} type="month" sx={inputStyles.formInput} id="txtDate" placeholder="select date of next increment" 
                                    // value={isEditInputValues.emp_next_increment ? isEditInputValues.emp_next_increment : empNextIncrement} 
                                    value={empNextIncrement ? empNextIncrement :""}
                                    name="emp_next_increment" onChange={handleUpdateTechnicalInfo} />
                                </Grid>

                                <Grid item xs={6} sx={styles.infoList}>
                                    <Typography className="title">Status</Typography>
                                    <TextField type="number" sx={inputStyles.formInput}  placeholder="enter status" name="emp_status" value={isEditInputValues?.emp_status } onChange={handleUpdateTechnicalInfo} />
                                    {/* inputProps={{   maxLength: 0,}} */}
                                    {/* .replace(/[^0-1]/g, '') */}
                                </Grid>
                            </>
                        )}

                </Grid>

            </Box>
            <Stack direction="row" spacing={2} sx={styles.editProfileButtonSection} >

                <Tooltip title="Save" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                    <Button disabled={loading ? true : false} style={{ color: loading ? "transparent" : "#fff" }} sx={styles.primaryButton} variant="contained" onClick={handleupdateEmpIntro}>
                        save
                        {loading ? <CircularProgress size={20} sx={styles.showLoader} /> : ""}
                    </Button>
                </Tooltip>
                <Button sx={styles.secondaryButton} variant="outlined" onClick={() => { props.setIsEditTechnicalInfoOpen(!props.isEditTechnicalInfoOpen) }}>
                    Cancel
                </Button>
            </Stack>
        </>
    )
}
