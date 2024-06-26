import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

import React from 'react'


export const  RequireAuth = ({children}) => {
    const auth = useAuth();
    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);

    if(!auth.user)
    {
        return <Navigate to='/' />
    }
  return children
}
