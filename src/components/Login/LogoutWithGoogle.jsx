import React from 'react'
import {GoogleLogout} from 'react-google-login';
import { Box } from '@mui/material';

const clientId= "714934587669-1f9p365fg4m1p5jsr5okt94otlqiop11.apps.googleusercontent.com";


export default function LogoutWithGoogle() {

    const onSuccess = () => {
        console.log("Log out Successfully!");
    }
  return (
    <Box id="signOutButton">
      <GoogleLogout 
      clientId={clientId}
      buttonText={"Logout"}
      onLogoutSuccess={onSuccess}
      />
    </Box>
  )
}
