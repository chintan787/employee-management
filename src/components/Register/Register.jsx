import React,{ useState ,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userRegister } from '../../Action/Users'
import { styles } from '../Login/Login.style';
import { inputStyles } from '../FormInput.style'
import { Link ,useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Hidden,
  Checkbox,
  Alert
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";




export default function Register() {

  const [editInputValues , setEditInputValues] = useState()
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState()
  const [registerButtonclick, setRegisterButtonClick] = useState(false);

  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const dispatch = useDispatch()
   const navigate = useNavigate(); 

  const userRegistration = useSelector(
    (state) => state.UserRegisterReducer?.userRegister
);
useEffect(() => {
  if (registerButtonclick) {
          dispatch(userRegister(userData,setLoading))
  }
}, [registerButtonclick])

useEffect(() => {
  
  if (registerButtonclick) {

       if (Object.keys(userRegistration).length !== 0) {
          setTimeout(() => {
              navigate('/');
          }, [3000])
      } 
      setRegisterButtonClick(false);
  }
}, [userRegistration])


  
  const handleRegisterValues = (e) => {
    const {value ,name} = e.target
    setEditInputValues({...editInputValues,[name]:value})
  }




  const onSubmit = (data) => {
    setUserData(editInputValues)
    setRegisterButtonClick(true);
    
  };

  return (
    <Grid item xs={12} sm={8} md={8} sx={styles.rightContent}>
      <Hidden only={['sm', 'md', 'lg', 'xl']}>
        <Box sx={styles.logoSection}>
          <Link to='/' underline="none"> <img className='logo-dashboard' src='/dashboard-md.svg' alt='logo_image' /></Link>
          <Link to='/' underline="none">  <img className='logo-clever' src='/clever-md.svg' alt='clever' /></Link>
        </Box>
      </Hidden>
      <Box className='right-wrapper-register'>

        <Box sx={styles.headingSection}>
          <Typography sx={styles.formHeading} variant='h2' component='h2'>Create your account</Typography>
          <Typography sx={styles.formSubheading} variant='subtitle1' gutterBottom component="p">It’s free and easy</Typography>
        </Box>

        <Box sx={styles.formContent}>
          <form onSubmit={handleSubmit(onSubmit)}>

           

            <Box  sx={styles.userDetails}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                <Grid item  xs={12}  sm={6}>
                <label>First Name</label>
                <TextField style={{marginBottom: errors.user_fname ? "8px" :"30px" }} type="text" sx={inputStyles.formInput} name="user_fname" placeholder='Enter your first name' {...register("user_fname", {
                  required: "First Name is required", pattern: {
                    value: /^[A-Za-z]+$/,
                    message: 'Please Enter valid First Name'
                  }
                })} onChange={handleRegisterValues} />
                 {errors.user_fname ? <Alert severity="error"> {errors.user_fname?.message}</Alert> : ""}
                </Grid>

                <Grid item  xs={12}  sm={6}>
                <label>Last Name</label>
                <TextField style={{marginBottom: errors.user_lname ? "8px" :"30px" }} type="text" sx={inputStyles.formInput} name="user_lname" placeholder='Enter your last name' {...register("user_lname", {
                  required: "Last Name is required", pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Please Enter valid Last Name"
                  }
                })} onChange={handleRegisterValues} />
                 {errors.user_lname ? <Alert severity="error"> {errors.user_lname?.message}</Alert> : ""}
                </Grid>

              </Grid>
            </Box>




            <label>E-mail</label>
            <TextField style={{ marginBottom: errors.user_email ? "8px" : "30px" }} type="email" sx={inputStyles.formInput} name="user_email" placeholder='Type your e-mail' {...register("user_email", {
              required: "Email is required", pattern: {
                value: /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
                message: "Enter valid Email"
              }
            })} onChange={handleRegisterValues} />{errors.user_email ? <Alert severity="error"> {errors.user_email?.message}</Alert> : ""}

            <label>Password</label>
            <TextField sx={inputStyles.textfieldPassword} name="user_password" placeholder='Type your password' type='password' {...register("user_password", {
              required: "Password is required", pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message: "Please enter valid Password"
              }
            })} autoComplete='current-password'
            onChange={handleRegisterValues}
            />{errors.user_password ? <Alert severity="error"> {errors.user_password?.message}</Alert> : ""}
            <Typography sx={styles.warningMsg}>Must be 8 characters at least</Typography>


            <Box sx={styles.formCondition} style={{ margin: errors.checkbox ? "8px 0" : "30px 0" }}>
              <Checkbox {...register("checkbox", { required: "Please check this Box " })} />
              <Typography>By creating an account means you agree to the <Link to='/' className='conditions'>Terms and Conditions,</Link> and our <Link to='/' className='conditions'>Privacy Policy</Link></Typography>
            </Box>{errors.checkbox ? <Alert severity="error"> {errors.checkbox?.message}</Alert> : ""}

            <Button type="submit" sx={styles.formButton} variant='contained'>Register</Button>
          </form>
        </Box>

        <Box >
          <Typography sx={styles.socialIconHeading}><span>or do it via other accounts</span></Typography>
          {/* <Box className='border'></Box> */}
        </Box>

        <Box sx={styles.socialSection}>
          <Box className='card'><Link to='/' ><img className='social-icons' src='/search.png' alt='google' /></Link></Box>
          {/* <Box className='card'><Link to='/' ><img className='social-icons' src='/path4.png' alt='apple' /></Link></Box> */}
          <Box className='card'><Link to='/' ><img className='social-icons' src='/fb.png' alt='facebook' /></Link></Box>
        </Box>
      </Box>


      <Typography sx={styles.accountLink}>Already have an account?<Link to='/'><span> Sign in</span> </Link></Typography>
      <Hidden only={['sm', 'md', 'lg', 'xl']}>
        <Box>
          <Link to='/' underline="none"> <Box sx={styles.messageIcon}> <CommentIcon className='message-icon' /></Box></Link>

        </Box>
      </Hidden>

      <Box sx={styles.toastContainer}>
        <ToastContainer position="bottom-right" autoClose={10000} />
      </Box>
    </Grid>

  )
}