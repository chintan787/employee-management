import React, { useEffect } from 'react'
import SideNav from './components/SideNav/SideNav';
import { Outlet } from "react-router-dom";
import { useNavigate ,useLocation ,useParams } from 'react-router-dom'
import {
  Box,
} from '@mui/material';
/* import Header from './components/Header/Header'; */

export default function DashboardLayout(props) {

   const navigate = useNavigate();
   const location = useLocation();
   const { id } = useParams(); 

  const stringifiedUser = localStorage.getItem('user');
  const userAsObjectAgain = JSON.parse(stringifiedUser);
 

  useEffect(() => {
    if (!userAsObjectAgain) {
      navigate('/')
    }
    
  }, [])

   useEffect(() => {
    
    if(userAsObjectAgain.user_role === 2 ){

      if(location.pathname === '/employees/create'){
        navigate('/dashboard')
      }
       if(location.pathname === `/employees/update/${id}`){
        navigate('/dashboard')
      }
      if(location.pathname === '/payroll'){
        navigate('/dashboard')
      } 
    }
  }, []) 


  
 
  return (
    <>
    {userAsObjectAgain ?
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        {/* <Header/> */}
         <Outlet /> 

      </Box>
: ""}
    </>

  )
}
