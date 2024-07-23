import React, { useState, useEffect } from 'react';
import { confirmOTP } from '../../Action/Users'
import { useSelector, useDispatch } from 'react-redux';
import { styles } from '../Login/Login.style';
import { inputStyles } from '../FormInput.style'
import { Link } from "react-router-dom";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Hidden,
    Snackbar
    /* Link */
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set, useForm } from "react-hook-form";
import Alert from '@mui/material/Alert'
import OTPInput from "otp-input-react";



export default function ConfirmOTP(props) {

    const [confirmButtonClick, setConfirmButtonClick] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [userOTP, setUserOTP] = useState({ "OTP": "" });
    const [OTP, setOTP] = useState("");


    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const dispatch = useDispatch()
 

    const confirmUserOPT = useSelector(
        (state) => state.ConfirmOTPReducer?.confirmOTP
    );

    useEffect(() => {
        if (confirmButtonClick) {
            dispatch(confirmOTP(userOTP, setOpenAlert))
        }
    }, [confirmButtonClick])

    if (openAlert) {
        setTimeout(() => {
            props.setIsConfirmOTP(true)
        }, [3000])
    }

    useEffect(() => {
        setConfirmButtonClick(false);
    }, [confirmUserOPT])

    const onSubmit = (data) => {
        setUserOTP({ "OTP": OTP })
        setConfirmButtonClick(true);
    };


    return (
        <>
            <Box sx={styles.headingSection}>
                <Typography sx={styles.formHeading} variant='h2' component='h2'>{/* Check your email */}  Verification</Typography>
                <Typography sx={styles.formSubheading} variant='subtitle1' gutterBottom component="p">Enter the verification code we just send you on your email address </Typography>
            </Box>

            <Box sx={styles.formContent}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Enter OTP</label>
                    <OTPInput className="input-code" value={OTP} name="OTP" onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />

                    {errors.OTP ? <Alert severity="error" >{errors.OTP?.message}</Alert> : ""}
                    
                    <Button type="submit" sx={styles.formButton} variant='contained' /* style={{ marginBottom: openAlert ? "8px" : "30px" }} */> Confirm OTP </Button>
                    
                </form>
            </Box>
        </>


    )
}
