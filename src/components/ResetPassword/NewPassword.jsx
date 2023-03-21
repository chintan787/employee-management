import React, { useState, useEffect } from 'react';
import { setResetPassword } from '../../Action/Users'
import { useSelector, useDispatch } from 'react-redux';
import { styles } from '../Login/Login.style';
import { inputStyles } from '../FormInput.style'
import { Link , useNavigate} from "react-router-dom";
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
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import Alert from '@mui/material/Alert'



export default function NewPassword(props) {

    const [newPassword , setNewPassword] = useState()
    const [userPassword , setUserPassword] = useState()
    const [resetButton ,setResetButton] = useState(false)

    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleNewPassword = (event) => {
        const { value, name } = event.target
        setNewPassword({...newPassword, [name]: value })
    }

    const updateNewPassword = useSelector(
        (state) => state.NewPasswordReducer?.resetpassword
    );

    useEffect(() => {
        if (resetButton) {
            const user_email = props.userEmail;
            dispatch(setResetPassword(user_email ,userPassword))
        }
    }, [resetButton])

    useEffect(() => {
        if(updateNewPassword.acknowledged !== undefined)
        {
            if(updateNewPassword.acknowledged)
            {
                toast("your password has been successfully changed")
                setTimeout(()=>{
                    navigate('/');
                },[5000])
            }
        }
        setResetButton(false);
    }, [updateNewPassword])

    const onSubmit = (data) => {
        setUserPassword(newPassword)
       setResetButton(true);
    };

    return (
        <>
        <Box sx={styles.headingSection}>
                 <Typography sx={styles.formHeading} variant='h2' component='h2'>Create New Password </Typography>
                 <Typography sx={styles.formSubheading} variant='subtitle1' gutterBottom component="p">Your new password must be different from previous passwords</Typography>
             </Box>
        <Box sx={styles.formContent}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Password</label>
                <TextField sx={inputStyles.textfieldPassword} name="new_password" placeholder='Type your New password' type='password' {...register("new_password", {
                    required: "Password is required", pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        message: "Please enter valid Password"
                    }
                })} autoComplete='current-password' onChange={handleNewPassword}
                />{errors.new_password ? <Alert severity="error"> {errors.new_password?.message}</Alert> : ""}
                <Typography sx={styles.warningMsg}>Must be 8 characters at least</Typography>

                <label>Confirm password</label>
                <TextField sx={inputStyles.textfieldPassword} name="confirm_password" placeholder='Type your confirm password' type='password' {...register("confirm_password", {
                    required: "Confirm Password is required", validate: (value) => {
                        /* const { password } = getValues(); */
                        if (watch('new_password') !== value) {
                            return "Password and Confirm Password doesn't match";
                        }
                    },
                }

                )} autoComplete='current-password' onChange={handleNewPassword}
                />{errors.confirm_password ? <Alert severity="error"> {errors.confirm_password?.message}</Alert> : ""}



                <Button type="submit" sx={styles.formButton} variant='contained' /* style={{ marginBottom: openAlert ? "8px" : "30px" }} */> Reset Password </Button>

            </form>
        </Box>
</>
    )
}
