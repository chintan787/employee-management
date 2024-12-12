import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import LoginLayout from './LoginLayout';
import DashboardLayout from './DashboardLayout';
import Dashboard from './Pages/Dashboard';

import ForgotPassword from './Pages/ForgotPassword';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Employee from './Pages/Employee';
import ProfilePage from './Pages/ProfilePage';

// import { useParams } from 'react-router-dom';
import CreateEditEmpProfile from './Pages/CreateEditEmpProfile';
import ProtectedRoute from './ProtectedRoute';
import ResetPassword from './components/ResetPassword/ResetPassword';
import PayRollPage from './Pages/PayRollPage';
import EmployeeLeavesPage from './Pages/EmployeeLeavesPage';


export default function Router() {

    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);

    /* const navigate = useNavigate();
   useEffect(() => {
       if (!userAsObjectAgain) {
 
           navigate('/dashboard')
       }
   }, [])  */

    return (

        <BrowserRouter>

            <Routes>
                {/* {userAsObjectAgain ? */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>

                        <Route exact path="/dashboard" element={<Dashboard />} />
                        <Route exact path="/employees" element={<Employee />} />
                        <Route exact path="/employees/profile/:id" element={<ProfilePage />} />
                        <Route exact path="/employees/create" element={<CreateEditEmpProfile />}></Route>
                        <Route exact path="/employees/update/:id" element={<CreateEditEmpProfile />}></Route>
                        <Route exact path="/payroll" element={<PayRollPage />}></Route>
                        <Route exact path="/leaves" element={<EmployeeLeavesPage />}></Route>
                       
                    </Route>

                    {/* </Route> */}



                    {/* <Route element={<ProtectedRoute />}> */}
                    <Route element={<LoginLayout />}>
                        <Route exact path="/" element={<LoginPage />} />
                        <Route exact path="/register" element={<RegisterPage />} />
                        <Route exact path="/reset-password" element={<ForgotPassword />} />
                        {/* <Route exact path="/user/update_password/:user_email" element={<ForgotPassword />}></Route> */}
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter >


    )
}
