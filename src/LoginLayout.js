import React, { useEffect } from 'react'
import SideNav from './components/SideNav/SideNav';
import { Grid } from '@mui/material';
import AccountLeftBanner from './components/AccountLeftBanner/AccountLeftBanner';
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout(props) {
  const navigate = useNavigate();
  const stringifiedUser = localStorage.getItem('user');
  const userAsObjectAgain = JSON.parse(stringifiedUser);

   useEffect(() => {
    if (userAsObjectAgain) {
      setTimeout(()=>{
        navigate('/dashboard')
      },[2000])
     
    }
  }, []) 
  return (
    <>
  {!userAsObjectAgain ?
      <Grid container>
        <AccountLeftBanner introHeading="Let’s build something amazing today." introSubHeading=" Maybe some text here will help me see it better. Oh God. Oke, let’s do it then. " />

        <Outlet/>
      </Grid>
      : ""}
    </>
  )
}
