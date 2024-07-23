import React, { useState, useEffect } from 'react';
import { getOPT } from '../../Action/Users'
import { useSelector, useDispatch } from 'react-redux';
import { styles } from '../Login/Login.style';
import { inputStyles } from '../FormInput.style'
import { Link } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Button,

} from '@mui/material';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import Alert from '@mui/material/Alert'



export default function EmailForm(props) {
   
    const [resetPasswordtButtonClick, setResetPasswordButtonClick] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [userEmail, setUserEmail] = useState();

    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const dispatch = useDispatch()

    const emailForResetPassword = (event) => {
        const { value, name } = event.target
        props.setIsEmail({ [name]: value })
    }

    const getUserOPT = useSelector(
        (state) => state.OTPReducer?.otp
    );

    useEffect(() => {
        if (resetPasswordtButtonClick) {
            dispatch(getOPT(userEmail, setOpenAlert))
        }
    }, [resetPasswordtButtonClick])

    if (openAlert) {
        setTimeout(() => {
            props.setIsGetOTP(true);
        }, [2000])
    }
    useEffect(() => {
        setResetPasswordButtonClick(false);
    }, [getUserOPT])

    const onSubmit = (data) => {
        setUserEmail(props.isEmail)
        setResetPasswordButtonClick(true);

    };


    return (

        <>
            <Box sx={styles.headingSection}>
                <Typography sx={styles.formHeading} variant='h2' component='h2'>Password Reset </Typography>
                <Typography sx={styles.formSubheading} variant='subtitle1' gutterBottom component="p">Enter your email and we will send you a verification code</Typography>
            </Box>

            <Box sx={styles.formContent}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>E-mail</label>
                    <TextField type="email" sx={inputStyles.formInput} name="user_email" style={{ marginBottom: errors.user_email ? "8px" : "30px" }} className="form-textfield-email" placeholder='Type your e-mail' variant='outlined'
                        {...register("user_email", {
                            required: "Email is required", pattern: {
                                value: /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
                                message: "Enter valid Email"
                            }
                        })} onChange={emailForResetPassword} />
                    {errors.user_email ? <Alert severity="error" >{errors.user_email?.message}</Alert> : ""}

                    <Button type="submit" sx={styles.formButton} variant='contained' style={{ marginBottom: openAlert ? "8px" : "30px" }}>Send {/* me the link */}</Button>
                    
                </form>
            </Box>
        </>

    )
}
