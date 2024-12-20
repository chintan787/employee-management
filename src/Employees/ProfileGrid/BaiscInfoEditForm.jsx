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
    MenuItem,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormHelperText,
    Radio,
    Stack,
    Tooltip,
    Button,
    Fade,
    Select,
    CircularProgress

} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import Alert from '@mui/material/Alert';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useNavigate } from "react-router-dom";


export default function BaiscInfoEditForm(props) {

    const [updateEmp, setUpdateEmp] = useState()
    const [saveButtonclick, setSaveButtonClick] = useState(false);
    const [isEditInputValues, setIsEditInputValues] = useState(props.empProfileData ? props.empProfileData : "")
    const [loading, setLoading] = useState(false);

    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const navigate = useNavigate();
    const id = props.empProfileData?.emp_code
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
    const dispatch = useDispatch()
    const statusData = ["single", "married", "widowed", "divorced"]
    const data = [
        // { city: "Philps", state: "New york" },
        // { city: "Square", state: "Chicago" },
        // { city: "Market", state: "New york" },

        // { city: "Booket", state: "Texas" },
        // { city: "Brookfield", state: "Florida" },
        // { city: "old street", state: "florida" },
        { city: "Ahmedabad", state: "Gujarat" },
        // { city: "Jaipur", state: "Rajasthan" },

    ]
    const cityData = ["Anand", "Ahmedabad", "Bhavnagar", "Gandhinagar", "Junagadh", "Rajkot", "Surat", "Una", "Vadodara",]

    const statusDatalowerCase = statusData.map(name => name.toLowerCase());
    const dataLowerCase = JSON.stringify(data, function (key, value) {
        if (key == "city") {
            return value.toLowerCase();
        }
        else if (key == "state") {
            return value.toLowerCase();
        } else {
            return value;
        }
    });

    function handleChangeBasicInfoValues(event) {
        const { value, name } = event.target
        setIsEditInputValues({ ...isEditInputValues, [name]: value })
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

                props.setIsEditBasicInfoOpen(!props.isEditBasicInfoOpen)

            }

            else {
                props.setIsEditBasicInfoOpen(!props.isEditBasicInfoOpen)
            }
        }
    }, [empProfileDataUpdated])

    const onSubmit = (data) => {
        setLoading(true)
        setUpdateEmp(isEditInputValues)
        setSaveButtonClick(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={styles.empInfo} key={props.emp_code ? props.emp_code : ""}>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 3 }}>
                        <Grid item xs={6} sx={styles.infoList}>
                            <Typography className="title">First Name*</Typography>
                            <TextField type="text" sx={inputStyles.formInput} placeholder="Enter First Name" name="emp_first_name" {...register("emp_first_name", {
                                required: "First Name is required", pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: 'Please Enter valid First Name'
                                }
                            })} value={isEditInputValues?.emp_first_name} onChange={handleChangeBasicInfoValues} />
                            {errors.emp_first_name ? <Alert severity="error"> {errors.emp_first_name?.message}</Alert> : ""}
                        </Grid>

                        <Grid item xs={6} sx={styles.infoList}>
                            <Typography className="title">Last Name*</Typography>
                            <TextField type="text" sx={inputStyles.formInput} placeholder="Enter last Name" name="emp_last_name" {...register("emp_last_name", {
                                required: "Last Name is required", pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: 'Please Enter valid Last Name'
                                }
                            })} value={isEditInputValues?.emp_last_name} onChange={handleChangeBasicInfoValues} />
                            {errors.emp_last_name ? <Alert severity="error"> {errors.emp_last_name?.message}</Alert> : ""}
                        </Grid>


                        <Grid item xs={6} sx={styles.infoList}>
                            <Typography className="title">Email*</Typography>
                            <TextField type="email" sx={inputStyles.formInput} placeholder="enter email" name="emp_email" {...register("emp_email", {
                                required: "Email is required", pattern: {
                                    value: /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
                                    message: 'Please Enter valid Email'
                                }
                            })} value={isEditInputValues?.emp_email} onChange={handleChangeBasicInfoValues} />
                            {errors.emp_email ? <Alert severity="error"> {errors.emp_email?.message}</Alert> : ""}
                        </Grid>
                        <Grid item xs={6} sx={styles.infoList}>
                            <Typography className="title">Company Email</Typography>
                            <TextField type="email" sx={inputStyles.formInput} placeholder="enter company email" name="emp_company_email" {...register("emp_company_email", {
                                required: "Email is required", pattern: {
                                    value: /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
                                    message: 'Please Enter valid Email'
                                }
                            })} value={isEditInputValues?.emp_company_email} onChange={handleChangeBasicInfoValues} />
                            {errors.emp_company_email ? <Alert severity="error"> {errors.emp_company_email?.message}</Alert> : ""}
                        </Grid>

                        <Grid item xs={6} sx={styles.infoList}>
                            <Typography className="title">Mobile No</Typography>
                            <TextField type="text" sx={inputStyles.formInput} placeholder="enter mobile no" name="emp_mo_no" {...register("emp_mo_no", {
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: 'Please Enter valid Mobile number'
                                }
                            })} value={isEditInputValues.emp_mo_no ? isEditInputValues.emp_mo_no : ""} onChange={handleChangeBasicInfoValues} />
                            {errors.emp_mo_no ? <Alert severity="error"> {errors.emp_mo_no?.message}</Alert> : ""}
                        </Grid>

                        <Grid item xs={6} sx={styles.infoList}>
                            <Typography className="title">State</Typography>

                            <Select
                                sx={inputStyles.formSelectInput}
                                displayEmpty
                                name="emp_state"
                                value={isEditInputValues?.emp_state.toLowerCase()}
                                onChange={handleChangeBasicInfoValues}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <Typography sx={inputStyles.selectPlaceholder}>Select State</Typography>;
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

                        <Grid item xs={6} sx={styles.infoList}>
                            <Typography className="title">City</Typography>

                            <Select
                                sx={inputStyles.formSelectInput}
                                displayEmpty
                                name="emp_city"
                                // value={isEditInputValues.emp_city ? isEditInputValues.emp_city : ""}
                                value={isEditInputValues?.emp_city.toLowerCase()}
                                // onChange={handleProfileValues}
                                onChange={handleChangeBasicInfoValues}
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

                                {isEditInputValues?.emp_state !== "" ?
                                    cityData.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))
                                    : ""
                                }
                            </Select>
                        </Grid>



                        <Grid item xs={6} sx={styles.infoList}>
                            <Typography className="title">Birth Date</Typography>
                            <TextField type="date" sx={inputStyles.formInput} placeholder="select birth date" name="emp_birthdate" value={isEditInputValues?.emp_birthdate} onChange={handleChangeBasicInfoValues} />

                        </Grid>

                        <Grid item xs={6} sx={styles.infoList}>
                            <Typography className="title">Gender</Typography>
                            <FormControl >
                                <RadioGroup sx={inputStyles.formInput} row
                                    name="emp_gender"
                                    value={isEditInputValues?.emp_gender}
                                    onChange={handleChangeBasicInfoValues}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                /* name="row-radio-buttons-group" */>
                                    <FormControlLabel value="female" control={<Radio color="secondary" />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio color="secondary" />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio color="secondary" />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sx={styles.infoList}>
                            <Typography className="title">Marital status</Typography>
                            <TextField type="text" sx={inputStyles.formSelectInput}
                                select
                                name="emp_marital_status"
                                value={isEditInputValues.emp_marital_status ? isEditInputValues.emp_marital_status.toLowerCase() : ""}
                                onChange={handleChangeBasicInfoValues} >

                                {statusDatalowerCase.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Grid>
                        <Grid item xs={6} sx={styles.infoList}>
                            <Typography className="title">PAN Card</Typography>
                            <TextField type="text" sx={inputStyles.formInput} placeholder="Enter PAN card number" name="emp_pan_card"
                                value={isEditInputValues?.emp_pan_card} onChange={handleChangeBasicInfoValues} />
                        </Grid>
                        <Grid item xs={6} sx={styles.infoList}>
                            <Typography className="title">Address</Typography>
                            <TextField
                                sx={inputStyles.formInput}
                                id="outlined-multiline-static"
                                multiline
                                name="emp_address"
                                rows={3}
                                placeholder="Enter address"
                                value={isEditInputValues?.emp_address}
                                onChange={handleChangeBasicInfoValues}
                            />
                        </Grid>

                        
                    </Grid>
                </Box>
                <Stack direction="row" spacing={2} sx={styles.editProfileButtonSection} >

                    <Tooltip title="Save" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                        <Button type="submit" disabled={loading ? true : false} style={{ color: loading ? "transparent" : "#fff" }} sx={styles.primaryButton} variant="contained" /* onClick={handleupdateEmpIntro} */>
                            save
                            {loading ? <CircularProgress size={20} sx={styles.showLoader} /> : ""}
                        </Button>
                    </Tooltip>

                    <Button sx={styles.secondaryButton} variant="outlined" onClick={() => { props.setIsEditBasicInfoOpen(!props.isEditBasicInfoOpen) }}>
                        Cancel
                    </Button>
                </Stack>

            </form>
        </>
    )
}
