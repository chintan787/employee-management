import React,{useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Outlet } from "react-router-dom";

export default function ProtectedRoute(props) {

  const[isoutlet , setIsoutlet] = useState(false)

  const navigate = useNavigate();
  const stringifiedUser = localStorage.getItem('user');
  const userAsObjectAgain = JSON.parse(stringifiedUser);

  

 

  return (
    <>
    <Outlet />
    </>
  )
}
