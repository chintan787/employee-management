import React, { useState, useEffect } from 'react';
import { userLogin } from '../../Action/Users'
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './Login.style';
import { inputStyles } from '../FormInput.style'
import { Link, useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import CommentIcon from '@mui/icons-material/Comment';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Hidden,
  Alert
} from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from "react-cookie";
import LoadingButton from '@mui/lab/LoadingButton';
import SocialLogin from './SocialLogin';
import SocialFBLogin from './SocialFBLogin';




export default function LoginNew() {

  const [loginButtonclick, setLoginButtonClick] = useState(false);
  const [isEditInputValues, setIsEditInputValues] = useState();
  const [userCredential, setUserCredential] = useState();
  const [cookies, setCookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(false);


  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleUserCredential = (event) => {
    const { value, name } = event.target
      setIsEditInputValues({ ...isEditInputValues, [name]: value })
  }

  const userLoginReducer = useSelector(
    (state) => state.UserLoginReducer?.user
  );
  useEffect(() => {
    if (loginButtonclick) {
      dispatch(userLogin(userCredential, setLoading))
    }
  }, [loginButtonclick])

  useEffect(() => {

    if (loginButtonclick) {
      if (userLoginReducer !== undefined) {
        localStorage.setItem('user', JSON.stringify(userLoginReducer));
        const stringifiedUser = localStorage.getItem('user');
        const userAsObjectAgain = JSON.parse(stringifiedUser);

        setCookie("user", userAsObjectAgain.access_token, {
          path: "/",
          maxAge: 24 * 60 * 60
        });
        navigate('/dashboard');
      }
      setLoginButtonClick(false);
    }
  }, [userLoginReducer])
  
  const onSubmit = (data) => {
    setLoading(true);
    setUserCredential(isEditInputValues)
    setLoginButtonClick(true);

  };


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
        <Box sx={styles.helloEmoji}><img src='/emoji.png' alt='' /></Box>
        <Box sx={styles.headingSection}>
          <Typography sx={styles.formHeading} variant='h2'>Welcome back!</Typography>
          <Typography sx={styles.formSubheading} variant='subtitle1' gutterBottom component="p">Let's build someting great</Typography>
        </Box>

        <Box sx={styles.formContent}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>E-mail</label>
            <TextField type="email" style={{ marginBottom: errors.user_email ? "8px" : "30px" }} sx={inputStyles.formInput} name="user_email" className="form-textfield-email" placeholder='Type your e-mail'  {...register("user_email", {
              required: "email is required"
            })} onChange={handleUserCredential} />
            {errors.user_email ? <Alert severity="error"> {errors.user_email?.message}</Alert> : ""}

            <label>Password</label>
            <TextField sx={inputStyles.textfieldPassword} 
            name="user_password" 
            placeholder='Password' 
            type='password'
             autoComplete='current-password' {...register("user_password", { required: "password is required" })}
              onChange={handleUserCredential} />
            {errors.user_password ? <Alert severity="error"> {errors.user_password?.message}</Alert> : ""}

            <Typography><Link className='forgot-password' to='/reset-password'>Forgot your password?</Link></Typography>


            <LoadingButton
              type="submit"
              sx={styles.formButton}
              loading={loading}
              textPrimary
              style={{ color: loading ? "transparent" : "#fff" }}
              variant="outlined"
              disabled={loading ? true : false}
            >
              Sign in
            </LoadingButton>
          </form>
        </Box>

        <Box >
          <Typography sx={styles.socialIconHeading}><span>or do it via other accounts</span></Typography>
        </Box>

       
       

        <Box sx={styles.socialSection}>

        <SocialLogin/>
        <SocialFBLogin/>

         
        </Box>
      </Box>

      <Typography sx={styles.accountLink}>Don’t have an account?<Link to="/register"><span> Get started</span> </Link></Typography>

      <Hidden only={['sm', 'md', 'lg', 'xl']}>
        <Box>
          <Link to='/'> <Box sx={styles.messageIcon}> <CommentIcon className='message-icon' /></Box></Link>
        </Box>
      </Hidden>

      <Box sx={styles.toastContainer}>
        <ToastContainer limit={2} position="bottom-right" autoClose={3000} />
      </Box>


    </Grid>


</>
  )
}
