import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate ,
} from "react-router-dom";

import LoginLayout from './LoginLayout';
import DashboardLayout from './DashboardLayout';
import Dashboard from './Pages/Dashboard';

import ForgotPassword from './Pages/ForgotPassword';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Employee from './Pages/Employee';
import ProfilePage from './Pages/ProfilePage';

import CreateEditEmpProfile from './Pages/CreateEditEmpProfile';
import ProtectedRoute from './ProtectedRoute';
import ResetPassword from './components/ResetPassword/ResetPassword';
import PayRollPage from './Pages/PayRollPage';
import EmployeeLeavesPage from './Pages/EmployeeLeavesPage';
import { createBrowserHistory } from "history";

export default function Routers() {

    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);

    const hist = createBrowserHistory();
    return (

        <BrowserRouter basename='/'>

            <Routes>
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




                    <Route element={<LoginLayout />}>
                        <Route exact path="/" element={<LoginPage />} />
                        <Route exact path="/register" element={<RegisterPage />} />
                        <Route exact path="/reset-password" element={<ForgotPassword />} />
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter  >


    )
}
