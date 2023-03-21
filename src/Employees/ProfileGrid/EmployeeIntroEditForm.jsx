import React, { useEffect, useState } from 'react'
import { updateEmployeeProfile ,getEmployee } from '../../Action/Employees'
import { useSelector, useDispatch } from 'react-redux';
import ImageUploading from "react-images-uploading";
import { styles } from './ProfileGrid.style'
import { inputStyles } from '../../components/FormInput.style'
import {
    Box,
    Typography,
    Avatar,
    TextField,
    MenuItem,
    FormControl,
    Select,
    Chip,
    Stack,
    Tooltip,
    Button,
    Fade,
    CircularProgress

} from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import Alert from '@mui/material/Alert';

export default function EmployeeIntroEditForm(props) {


    const [selectSkills, setSelectSkills] = useState(props.empProfileData.emp_skills)
    const [saveButtonclick, setSaveButtonClick] = useState(false);
    const [updateEmp, setUpdateEmp] = useState()
    const [imagePath, setImagePath] = useState();
    const [imageName, setImageName] = useState();
    const [imageBase64, setImageBase64] = useState();

    const [isImgUrl, setIsImgUrl] = useState(false);
    const [isEditInputValues, setIsEditInputValues] = useState(props.empProfileData)
    const [loading, setLoading] = useState(false);

    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    const maxNumber = 69;
    const id = props.empProfileData.emp_code
    const dispatch = useDispatch()
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
    const skillsValues = isEditInputValues.emp_skills?.toString() || '';
    const ListOfSkills = ["java", "Spring", "MySql", "HTML", "CSS", "java-script", "Bootstrap", "Matirial-UI", "node js", "mongodb", "React Js"]

    // console.log("isEditInputValues", isEditInputValues);
    function handleEmployeeIntroChangeValues(event) {
        const { value, name } = event.target;
        setIsEditInputValues({ ...isEditInputValues, [name]: value })
    }

    const handleupdateEmpIntro = (e) => {
        e.preventDefault();
        const result = { selectSkills, isEditInputValues }
        setUpdateEmp(isEditInputValues)
        // setSaveButtonClick(true);
    }

    //get api
    const empProfileData = useSelector(
        (state) => state.EmployeeReducer?.employee
    );
   

    //update api
    const empProfileDataUpdated = useSelector(
        (state) => state.UpdateEmployeeReducer?.updatedata
    );

    
    useEffect(() => {
        if (saveButtonclick) {
            dispatch(updateEmployeeProfile(id, updateEmp,setLoading))
        }
    }, [saveButtonclick])

    useEffect(() => {
        if (saveButtonclick) {
            if (Object.keys(empProfileDataUpdated).length !== 0) {
                dispatch(getEmployee(id, setLoading))
                setTimeout(()=>{
                    toast("Data Updated Successfully");
                },[1000])
                props.setIsEditEmpIntroOpen(!props.isEditEmpIntroOpen)
            }

            /*  if (empProfileDataUpdated.acknowledged !== undefined) {
                 if (empProfileDataUpdated.acknowledged) {
                     toast("Data Updated Successfully");
                     props.setIsEditEmpIntroOpen(!props.isEditEmpIntroOpen)
                 }
             } */
            else {
                props.setIsEditEmpIntroOpen(!props.isEditEmpIntroOpen)
            }
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
        setImageBase64(filebase64);
        setImageName(name);
        setImagePath(file)
        setIsEditInputValues({ ...isEditInputValues, emp_image_name: name, emp_image: filebase64 })
    };

    const onSubmit = (data) => {
        const result = { selectSkills, isEditInputValues }
        setLoading(true)
        setUpdateEmp(isEditInputValues)
        setSaveButtonClick(true);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box key={props.empProfileData?.emp_code}>

                    <Box sx={styles.userProfileImage}>

                        <ImageUploading
                            name="emp_image_name"
                            // value={id ? isEditInputValues.emp_image_name : imagePath }
                            // value={imagePath}
                            onChange={hanldeImages}
                            //    onChange={handleProfileValues}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                        >
                            {({
                                //  imageList,
                                onImageUpload,
                                onImageUpdate,
                                dragProps
                            }) => (

                                <Box className="upload__image-wrapper">
                                    {/* {imageList.map((image, index) => ( */}

                                    <Box  /* key={index} */ className="image-item" >
                                        <Avatar sx={styles.empName} src={isImgUrl ? imagePath : isEditInputValues.emp_image_name}  >
                                            {/* {props.empProfileData?.emp_first_name.charAt(0)}{props.empProfileData?.emp_last_name.charAt(0)} */}
                                        </Avatar>
                                    </Box>
                                    {/* ))}  */}
                                    <Box sx={styles.editProfileImage}>
                                        {/* onClick={imagePath ? onImageUpload : onImageUpdate } */}
                                        <Button onClick={isEditInputValues?.emp_image_name ? onImageUpdate : onImageUpload}  {...dragProps} sx={styles.editProfileButton} startIcon={<FileUploadOutlinedIcon />}>Upload</Button>
                                    </Box>
                                </Box>
                            )}
                        </ImageUploading>
                    </Box>

                    <Box sx={styles.infoList} >

                        <Typography className="title">Emp Code</Typography>
                        <TextField type="text" name="emp_code" style={{ marginBottom: "15px" }} sx={inputStyles.formInput} placeholder="Enter Emp code" disabled value={isEditInputValues.emp_code} />

                        <Typography className="title">First Name*</Typography>
                        <TextField type="text" name="emp_first_name" {...register("emp_first_name", {
                            required: "First Name is required", pattern: {
                                value: /^[A-Za-z]+$/,
                                message: 'Please Enter valid First Name'
                            }
                        })} style={{ marginBottom: "15px" }} sx={inputStyles.formInput} placeholder="Enter First Name" value={isEditInputValues.emp_first_name} onChange={handleEmployeeIntroChangeValues} />
                        {errors.emp_first_name ? <Alert severity="error"> {errors.emp_first_name?.message}</Alert> : ""}


                        <Typography className="title">Last Name*</Typography>
                        <TextField type="text" name="emp_last_name" {...register("emp_last_name", {
                            required: "Last Name is required", pattern: {
                                value: /^[A-Za-z]+$/,
                                message: 'Please Enter valid Last Name'
                            }
                        })} style={{ marginBottom: "15px" }} sx={inputStyles.formInput} placeholder="Enter Last Name" value={isEditInputValues.emp_last_name} onChange={handleEmployeeIntroChangeValues} />
                        {errors.emp_last_name ? <Alert severity="error"> {errors.emp_last_name?.message}</Alert> : ""}

                        <Typography className="title">Designation</Typography>
                        <TextField type="text" name="emp_designation" style={{ marginBottom: "15px" }} sx={inputStyles.formInput} placeholder="Enter Designation" value={isEditInputValues.emp_designation} onChange={handleEmployeeIntroChangeValues} />

                        <Typography className="title">BIO</Typography>
                        <TextField type="text" name="emp_bio" style={{ marginBottom: "15px", lineHeight: "20px" }} multiline rows={5} sx={inputStyles.formInput} placeholder="Enter BIO" value={isEditInputValues.emp_bio} onChange={handleEmployeeIntroChangeValues} />


                    </Box>


                    <Box sx={styles.infoList}>
                        <Typography variant='h2' className="title">skills</Typography>
                        <Box sx={styles.userSkils}>
                            {/* <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }}> */}
                            <FormControl sx={{ width: "100%" }} >
                                <Select sx={inputStyles.formInput}
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    displayEmpty
                                    multiple
                                    rows={3}
                                    name="emp_skills"
                                    value={isEditInputValues?.emp_skills}
                                    onChange={handleEmployeeIntroChangeValues}
                                    //    value={selectSkills}
                                    //  onChange={handleEditSkillValues}
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

                            {/*} <TextField type="text" sx={styles.formInput} select
                            placeholder="select matital status"
                            value={selectSkills}
                            onChange={setSelectSkills}
                        >
                            {ListOfSkill.map((option) => (
                                <MenuItem key={option} value={option.skill}>
                                    {option.skill}
                                </MenuItem>
                            ))}
                        </TextField> */}
                            {/* </Grid> */}

                        </Box>

                    </Box>

                </Box>
                <Stack direction="row" spacing={2} sx={styles.editProfileButtonSection}>
                    <Tooltip title="Save" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <Button type="submit" disabled={loading ? true : false}  style={{color : loading ? "transparent" : "#fff"}} sx={styles.primaryButton} variant="contained" /*  onClick={handleupdateEmpIntro} */ >
                        save
                        {loading ? <CircularProgress size={20} sx={styles.showLoader} /> : ""}
                        </Button>
                    </Tooltip>
                    <Button sx={styles.secondaryButton} variant="outlined" onClick={() => { props.setIsEditEmpIntroOpen(!props.isEditEmpIntroOpen) }}>
                        Cancel
                    </Button>
                </Stack>

            </form>
        </>
    )
}
