import React, { useState } from 'react';

import { styles } from '../Login/Login.style';
import { inputStyles } from '../FormInput.style'
import { Link } from "react-router-dom";
import {
    Box,
    Grid,
    Hidden,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import ConfirmOTP from './ConfirmOTP';
import EmailForm from './EmailForm';
import NewPassword from './NewPassword';


export default function ResetPassword() {



    const [isGetOTP, setIsGetOTP] = useState(false);
    const [isconfirmOTP, setIsConfirmOTP] = useState(false);
    const [isEmail, setIsEmail] = useState()

    const { register, formState: { errors }, handleSubmit, watch } = useForm();
   
    const userEmail = isEmail?.user_email

    return (
        <>
            <Grid item xs={12} sm={8} md={8} sx={styles.rightContent}>
                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                    <Box sx={styles.logoSection}>
                        <Link to='/' > <img className='logo-dashboard' src='/dashboard-md.svg' alt='logo_image' /></Link>
                        <Link to='/' >  <img className='logo-clever' src='/clever-md.svg' alt='clever' /></Link>
                    </Box>
                </Hidden>
                <Box className='right-wrapper'>
                    <Box sx={styles.helloEmoji}><img src='/icon-password.png' alt='' /></Box>
                    
                    {/* <ConfirmOTP isconfirmOTP={isconfirmOTP} setIsConfirmOTP={setIsConfirmOTP} /> */}
                    {isGetOTP && !isconfirmOTP ?
                        <ConfirmOTP isconfirmOTP={isconfirmOTP} setIsConfirmOTP={setIsConfirmOTP} />
                        : !isconfirmOTP ? <EmailForm isGetOTP={isGetOTP} setIsGetOTP={setIsGetOTP} isEmail={isEmail} setIsEmail={setIsEmail} /> : ""
                    }

                    {isconfirmOTP ? <NewPassword userEmail={userEmail} isEmail={isEmail} /> : ""}

                </Box>

                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                    <Box>
                        <Link to='/' > <Box sx={styles.messageIcon}> <CommentIcon className='message-icon' /></Box></Link>
                    </Box>
                </Hidden>
                <Box sx={styles.toastContainer}>
                    <ToastContainer limit={2} position="bottom-right" autoClose={3000} />
                </Box>
            </Grid>



        </>
    )
}
