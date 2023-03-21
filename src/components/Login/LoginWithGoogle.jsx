import React from 'react';
import {GoogleLogin} from 'react-google-login';
import { Box } from '@mui/material';

const clientId= "714934587669-1f9p365fg4m1p5jsr5okt94otlqiop11.apps.googleusercontent.com";

export default function LoginWithGoogle() {

const onSuccess = (res) =>{
    console.log("Login Success! Current user",res.profileObj)
}
const onFailure = (res) =>{
    console.log("Login Failed! res",res)
}
const clientId= "714934587669-1f9p365fg4m1p5jsr5okt94otlqiop11.apps.googleusercontent.com";

  return (
    <Box id="signingbutton">
        <GoogleLogin
        clientId = {clientId}
        buttonText = {"Login"}
        onSuccess = {onSuccess}
        onFailure = {onFailure}
        cookiePolicy = {'single_host_login'}
        isSignedIn = {true}
        />
      
    </Box>
  )
}
