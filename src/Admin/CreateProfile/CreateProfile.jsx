import React, { useEffect, useState } from 'react'
import { updateEmployeeProfile } from '../../Action/Employees'
import {createEmployeeProfile} from '../../Action/Admin'
import { useSelector, useDispatch } from 'react-redux';
import { styles } from '../../Employees/ProfileGrid/ProfileGrid.style'
import { inputStyles } from '../../components/FormInput.style'
import {
    Box,
    Grid,
    Typography,
    TextField,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Radio,
    Stack,
    Tooltip,
    Button,
    Fade,
    Avatar,
    CardContent,
    Select,
    Chip,
    CircularProgress

} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import Alert from '@mui/material/Alert';
import CustomCard from '../../components/CustomCard/CustomCard';
import ImageUploading from "react-images-uploading";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import dateFormat, { masks } from "dateformat";


export default function CreateProfile(props) {

    const [createEmployee, setCreateEmployee] = useState()
    const [updateEmployee, setUpdateEmployee] = useState()
    const [submitButtonclick, setSubmitButtonClick] = useState(false);
    const [imagePath, setImagePath] = useState();
    const [isImgUrl, setIsImgUrl] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditInputValues, setIsEditInputValues] = useState(props.id ? props.empProfileData : 
        {
            emp_first_name: "",
            emp_last_name: "",
            emp_code: "",
            emp_email: "",
            emp_company_email:"info@strokeinfotech.com",
            emp_mo_no: "",
            emp_birthdate: "",
            emp_gender: "male",
            emp_marital_status: "single",
            emp_state: "Gujarat",
            emp_city: "Ahmedabad",
            emp_address: "",
            emp_designation: "",
            emp_bio: "",
            emp_skills: [],
            emp_basic_salary: "",
            emp_joining_date: "",
            emp_total_experience: "",
            emp_pan_card:"",
            emp_next_increment:"",
            emp_status:1,
        }
    )
    const [currentCity,setCurrentCity] = useState();
    const [empNextIncrement ,setEmpNextIncrement] = useState();
    const [min,setMin] = useState();

    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const maxNumber = 69;
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const ListOfSkills = ["java", "Spring", "MySql", "HTML", "CSS", "java-script", "Bootstrap", "Matirial-UI", "node js", "mongodb", "React Js"]
    const statusData = ["single", "married", "widowed", "divorced"]
    const data = [
        { city: "Ahmedabad", state: "Gujarat" },

    ]
    const cityData = ["Anand","Ahmedabad","Bhavnagar","Gandhinagar","Junagadh","Rajkot","Surat","Una","Vadodara",]
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);

    useEffect(()=>{
        
            if(props.empProfileData?.emp_next_increment)
            {
            const temp = props.empProfileData?.emp_next_increment.split('-');
            const newDate = temp[1]+"-"+temp[0];
            setEmpNextIncrement(newDate)
            }
    },[])
    
      
    // input values
    const handleProfileValues = (event) => {
        const { value, name } = event.target
       
        if(name === "emp_next_increment")
        {
            setEmpNextIncrement(value)
            setIsEditInputValues({ ...isEditInputValues, [name]: dateFormat(value,'mm-yyyy') })
        }
        else if(name === "emp_status")
        {
            setIsEditInputValues({ ...isEditInputValues, [name]: value.replace(/[^0-1]/g, '') })
        }
        else{
            setIsEditInputValues({ ...isEditInputValues, [name]: value })
        }
    }

    const handleCurrentCity =(value) => {
       
    }

    // add employee data
    const empProfileDataCreated = useSelector(
        (state) => state.CreateEmployeeReducer?.createEmp
    );

    // submit button 
    useEffect(() => {
        if (submitButtonclick) {
            if (props.id) {
                dispatch(updateEmployeeProfile(props.id, updateEmployee,props.setLoading,navigate))
            }
            else {
                dispatch(createEmployeeProfile(createEmployee,setLoading,navigate))
            }
        }
        // setSubmitButtonClick(false);
    }, [submitButtonclick])

    useEffect(() => {
        if (submitButtonclick) {
            if (Object.keys(empProfileDataCreated).length !== 0) {
                toast("Create Employee Successfully");
                setTimeout(() => {
                    navigate('/employees');
                }, [3000])
            }
            setSubmitButtonClick(false);
        }
    }, [empProfileDataCreated])

    //update employee data 
    const empProfileDataUpdated = useSelector(
        (state) => state.UpdateEmployeeReducer?.updatedata
    );

    useEffect(() => {
        if (submitButtonclick) {
            if (Object.keys(empProfileDataUpdated).length !== 0) {
                toast("Data Updated Successfully");
                setTimeout(() => {
                    navigate('/employees');
                }, [3000])
            }
            setSubmitButtonClick(false);
        }
    }, [empProfileDataUpdated])

    //upload images
    const hanldeImages = (event) => {
        const file = event[0].data_url
        const temp = file.split(",", 2)
        const filebase64 = temp[1]
        const fileName = event[0].file
        const name = fileName.name
        
        setIsImgUrl(true)
        setImagePath(file)
        setIsEditInputValues({ ...isEditInputValues, emp_image_name: name, emp_image: filebase64 })
    };

    //submit button
    const onSubmit = (data) => {

        if (props.id) {
            props.setLoading(true)
            setUpdateEmployee(isEditInputValues)
            setSubmitButtonClick(true);   
        }
        else {
            setLoading(true)
            setCreateEmployee(isEditInputValues)
            setSubmitButtonClick(true);
        }
    };

    useEffect(()=>{
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
    
        var minDate= year + '-' + month ;
        setMin(minDate);
    },[])
    

    return (

        <Grid container spacing={3} key={props.id ? isEditInputValues.emp_code : ""} className={props.id ? isEditInputValues.emp_code : ""}>
            <Grid item xs={11} >
                <Box sx={styles.basicInfosection} >
                    <CustomCard>
                        <CardContent sx={styles.cardContentEmpty} >

                            <form onSubmit={handleSubmit(onSubmit)}>

                                {/* <TextField type="file" name="emp_image_name" onChange={handleProfileValues} /> */}

                                <Box sx={{ marginTop: "10px" }}>

                                    <Box sx={styles.userProfileImage}>

                                        <ImageUploading
                                            name="emp_image_name"
                                            onChange={hanldeImages}
                                            maxNumber={maxNumber}
                                            dataURLKey="data_url"
                                        >
                                            {({
                                                onImageUpload,
                                                onImageUpdate,
                                                dragProps
                                            }) => (

                                                <Box className="upload__image-wrapper">
                                                    <Box  className="image-item" >
                                                        <Avatar sx={styles.empName} src={isImgUrl ? imagePath : isEditInputValues.emp_image_name}  >
                                                        </Avatar>
                                                    </Box>
                                                    <Box sx={styles.editProfileImage}>
                                                        <Button onClick={isEditInputValues.emp_image_name ? onImageUpdate : onImageUpload}   {...dragProps} sx={styles.editProfileButton} startIcon={<FileUploadOutlinedIcon />}>Upload</Button>
                                                    </Box>
                                                </Box>
                                            )}
                                        </ImageUploading>
                                    </Box>


                                    {/* Basic information section */}
                                    <Box sx={styles.empInfoHeadingSection}>
                                        <Typography variant='h2' sx={styles.empIntroTitle}>Basic Information {/* <ModeEditOutlinedIcon sx={{marginLeft:'10px'}} />*/}</Typography>
                                    </Box>
                                    <Box sx={styles.empInfo}>
                                        <Grid container rowSpacing={3} columnSpacing={{ xs: 3 }}>
                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">First Name*</Typography>
                                                <TextField type="text" sx={inputStyles.formInput} placeholder="Enter First Name" value={isEditInputValues.emp_first_name ? isEditInputValues.emp_first_name : ""} name="emp_first_name" {...register("emp_first_name", {
                                                    required: "First Name is required", pattern: {
                                                        value: /^[A-Za-z]+$/,
                                                        message: 'Please Enter valid First Name'
                                                    }
                                                })} /* */ onChange={handleProfileValues} />
                                                {errors.emp_first_name ? <Alert severity="error"> {errors.emp_first_name?.message}</Alert> : ""}
                                            </Grid>

                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Last Name*</Typography>
                                                <TextField type="text" sx={inputStyles.formInput} placeholder="Enter last Name" value={isEditInputValues.emp_last_name ? isEditInputValues.emp_last_name : ""} name="emp_last_name" {...register("emp_last_name", {
                                                    required: "Last Name is required", pattern: {
                                                        value: /^[A-Za-z]+$/,
                                                        message: 'Please Enter valid Last Name'
                                                    }
                                                })} /* */ onChange={handleProfileValues} />
                                                {errors.emp_last_name ? <Alert severity="error"> {errors.emp_last_name?.message}</Alert> : ""}
                                            </Grid>
                                            <Grid item xs={6} md={4} sx={styles.infoList} >
                                                <Typography className="title">employee code*</Typography>
                                                <TextField type="text" sx={inputStyles.formInput} disabled={props.id ? true : false} className="emp-code" placeholder="Enter Employee code" value={isEditInputValues.emp_code ? isEditInputValues.emp_code.toUpperCase() : ""} name="emp_code"  {...register("emp_code", props.id ? "" : {
                                                    required: "Employee code is required"
                                                })} onChange={handleProfileValues} />
                                                {errors.emp_code ? <Alert severity="error"> {errors.emp_code?.message}</Alert> : ""}
                                            </Grid>

                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Email*</Typography>
                                                <TextField type="email" sx={inputStyles.formInput} placeholder="enter email" value={isEditInputValues.emp_email ? isEditInputValues.emp_email : ""} name="emp_email" {...register("emp_email", {
                                                    required: "Email is required", pattern: {
                                                        value: /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
                                                        message: 'Please Enter valid Email'
                                                    }
                                                })} onChange={handleProfileValues} />
                                                {errors.emp_email ? <Alert severity="error"> {errors.emp_email?.message}</Alert> : ""}
                                            </Grid>
                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Company Email</Typography>
                                                <TextField type="email" sx={inputStyles.formInput} placeholder="enter company email" value={isEditInputValues.emp_company_email ? isEditInputValues.emp_company_email : ""} name="emp_company_email" {...register("emp_company_email", {
                                                     pattern: {
                                                        value: /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
                                                        message: 'Please Enter valid Email'
                                                    }
                                                })} onChange={handleProfileValues} />
                                                {errors.emp_company_email ? <Alert severity="error"> {errors.emp_company_email?.message}</Alert> : ""}
                                            </Grid>

                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Mobile No</Typography>
                                                <TextField type="text" sx={inputStyles.formInput} placeholder="enter mobile no" value={isEditInputValues.emp_mo_no ? isEditInputValues.emp_mo_no : ""} name="emp_mo_no" {...register("emp_mo_no", {
                                                    pattern: {
                                                        value: /^\d{10}$/,
                                                        message: 'Please Enter valid Mobile number'
                                                    }
                                                })} onChange={handleProfileValues} />
                                                {errors.emp_mo_no ? <Alert severity="error"> {errors.emp_mo_no?.message}</Alert> : ""}
                                            </Grid>

                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Birth Date</Typography>
                                                <TextField type="date" sx={inputStyles.formInput} placeholder="select birth date" value={isEditInputValues.emp_birthdate ? isEditInputValues.emp_birthdate : ""} name="emp_birthdate" onChange={handleProfileValues} />
                                            </Grid>
                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Gender</Typography>
                                                <FormControl >
                                                    <RadioGroup sx={inputStyles.formInput} row
                                                        name="emp_gender"
                                                        value={isEditInputValues.emp_gender ? isEditInputValues.emp_gender : ""}
                                                        defaultValue="male"
                                                        onChange={handleProfileValues}
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                    >
                                                        <FormControlLabel value="female" control={<Radio color="secondary" />} label="Female" />
                                                        <FormControlLabel value="male" control={<Radio color="secondary" />} label="Male" />
                                                        <FormControlLabel value="other" control={<Radio color="secondary" />} label="Other" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Marital status</Typography>
                                               
                                                <Select
                                                    sx={inputStyles.formSelectInput}
                                                    displayEmpty
                                                    name="emp_marital_status"
                                                    value={isEditInputValues.emp_marital_status ? isEditInputValues.emp_marital_status : ""}
                                                    onChange={handleProfileValues}
                                                    input={<OutlinedInput />}
                                                    MenuProps={MenuProps}
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    {statusData.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>

                                                    ))}
                                                </Select>
                                            </Grid>

                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">State</Typography>
                                                <Select
                                                    sx={inputStyles.formSelectInput}
                                                    displayEmpty
                                                    name="emp_state"
                                                    value={isEditInputValues.emp_state ? isEditInputValues.emp_state : ""}
                                                    onChange={handleProfileValues}
                                                    onFocus={() => handleCurrentCity(isEditInputValues?.emp_state)}
                                                    input={<OutlinedInput />}
                                                    renderValue={(selected) => {
                                                        if (selected.length === 0) {
                                                            return <Typography sx={inputStyles.selectPlaceholder}>Select Sate</Typography>;
                                                        }

                                                        return selected;
                                                    }}
                                                    MenuProps={MenuProps}
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    <MenuItem disabled value="">
                                                        Select Sate
                                                    </MenuItem>
                                                    {data.map((option, index) => (
                                                        <MenuItem key={index} value={option.state}>
                                                            {option.state}
                                                        </MenuItem>
                                                    ))}
                                                </Select>


                                            </Grid>

                                          

                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">City</Typography>
                                              
                                                <Select
                                                    sx={inputStyles.formSelectInput}
                                                    displayEmpty
                                                    name="emp_city"
                                                    value={isEditInputValues.emp_city ? isEditInputValues.emp_city : ""}
                                                    onChange={handleProfileValues}
                                                    input={<OutlinedInput />}
                                                    renderValue={(selected) => {
                                                        if (selected.length === 0) {
                                                            return <Typography sx={inputStyles.selectPlaceholder}>Select City</Typography>;
                                                        }

                                                        return selected;
                                                    }}
                                                    MenuProps={MenuProps}
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    <MenuItem disabled value="">
                                                        <em>Select City</em>
                                                    </MenuItem>

                                                   { isEditInputValues?.emp_state !== "" ?
                                                   cityData.map((option, index) => (
                                                        <MenuItem key={index} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))
                                                    : ""
                                                    }
                                                </Select>
                                            </Grid>
                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">PAN Card</Typography>
                                                <TextField type="text" sx={inputStyles.formInput} placeholder="Enter PAN card number" value={isEditInputValues.emp_pan_card ? isEditInputValues.emp_pan_card : ""} name="emp_pan_card" 
                                                 onChange={handleProfileValues} />
                                            </Grid>
                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Address</Typography>
                                                <TextField
                                                    sx={inputStyles.formInput}
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    name="emp_address"
                                                    value={isEditInputValues.emp_address ? isEditInputValues.emp_address : ""}
                                                    rows={3}
                                                    placeholder="Enter address"
                                                    onChange={handleProfileValues}
                                                />
                                            </Grid>


                                           
                                            
                                        </Grid>
                                    </Box>

                                    {/* Technical infomation */}
                                    <Box sx={styles.empInfoHeadingSection} style={{ marginTop: "30px" }}>
                                        <Typography variant='h2' sx={styles.empIntroTitle}>Technical Information</Typography>
                                    </Box>
                                    <Box sx={styles.empInfo}>

                                        <Grid container rowSpacing={3} columnSpacing={{ xs: 3, }}>
                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Designation</Typography>
                                                <TextField type="text" name="emp_designation" value={isEditInputValues.emp_designation ? isEditInputValues.emp_designation : ""} sx={inputStyles.formInput} placeholder="Enter Designation" onChange={handleProfileValues} />
                                            </Grid>
                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">BIO</Typography>
                                                <TextField type="text" name="emp_bio" value={isEditInputValues.emp_bio ? isEditInputValues.emp_bio : ""} style={{ lineHeight: "20px" }} multiline rows={3} sx={inputStyles.formInput} placeholder="Please Enter BIO" onChange={handleProfileValues} />
                                            </Grid>
                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">skills</Typography>
                                                <Box sx={styles.userSkils}>

                                                    <FormControl sx={{ width: "100%" }} >
                                                        <Select sx={inputStyles.formInput}
                                                            labelId="demo-multiple-chip-label"
                                                            id="demo-multiple-chip"
                                                            displayEmpty
                                                            multiple
                                                            rows={3}
                                                            name="emp_skills"
                                                            value={isEditInputValues?.emp_skills}
                                                            onChange={handleProfileValues}
                                                            renderValue={(selected) => (
                                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                    {selected.length === 0 ? <Typography sx={inputStyles.selectPlaceholder}>Select Skill</Typography> :
                                                                        selected.map((value) => (
                                                                            <Chip key={value} label={value} />
                                                                        ))

                                                                    }
                                                                </Box>
                                                            )}
                                                            MenuProps={MenuProps}
                                                        >
                                                            <MenuItem disabled value="">
                                                                <em>Select Skills</em>
                                                            </MenuItem>
                                                            {ListOfSkills.map((ListOfSkill) => (
                                                                <MenuItem
                                                                    key={ListOfSkill}
                                                                    value={ListOfSkill}
                                                                >
                                                                    {ListOfSkill}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>


                                                </Box>
                                            </Grid>

                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Salary (INR)</Typography>
                                                <TextField type="number" sx={inputStyles.formInput} placeholder="enter salary" value={isEditInputValues.emp_basic_salary ? isEditInputValues.emp_basic_salary : ""} name="emp_basic_salary" onChange={handleProfileValues} />
                                            </Grid>


                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Date of Joining</Typography>
                                                <TextField type="date" sx={inputStyles.formInput} placeholder="select date of joining" value={isEditInputValues.emp_joining_date ? isEditInputValues.emp_joining_date : ""} name="emp_joining_date" onChange={handleProfileValues} />
                                            </Grid>
                                            
                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Next Increment</Typography>
                                                <TextField inputProps={{min:min}} type="month" sx={inputStyles.formInput} id="txtDate" min={min} placeholder="select date of next increment" value={empNextIncrement ? empNextIncrement : ""} name="emp_next_increment" onChange={handleProfileValues} />

                                            </Grid>
                                            <Grid item xs={6} md={4} sx={styles.infoList}>
                                                <Typography className="title">Status</Typography>
                                                <TextField type="number" sx={inputStyles.formInput} placeholder="enter status" value={isEditInputValues?.emp_status } name="emp_status" onChange={handleProfileValues} />
                                            </Grid>

                                        </Grid>

                                    </Box>

                                    <Stack direction="row" spacing={2} sx={{ justifyContent: "center", margin: "30px 0 10px" }} >
                                        <Tooltip title="Submit" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                                            <Button type="submit" disabled={props.loading || loading ? true : false}  style={{color : props.loading || loading ? "transparent" : "#fff"}} sx={styles.primaryButton} variant="contained" /* onClick={handlecreateEmpIntro} */>
                                                Submit 
                                                  {props.id ?  
                                                 props.loading ? <CircularProgress size={20} sx={styles.showLoader} /> : "" :
                                                 loading ? <CircularProgress size={20} sx={styles.showLoader} /> : ""
                                            }  
                                            </Button>
                                        </Tooltip>
                                    </Stack>

                                </Box>
                            </form>
                            <Box sx={inputStyles.toastContainer}>
                                <ToastContainer limit={2} position="bottom-right" autoClose={2000} />
                            </Box>
                        </CardContent>
                    </CustomCard>

                </Box>
            </Grid>
        </Grid>

    )
}
