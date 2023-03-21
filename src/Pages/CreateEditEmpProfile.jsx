import React, { useEffect, useState } from 'react'
import { getEmployee } from '../Action/Employees'
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Toolbar
} from '@mui/material';
import { styles } from '../components/SideNavForPages.style';
import CreateProfile from '../Admin/CreateProfile/CreateProfile';
import { useParams } from 'react-router-dom';

export default function CreateEditEmpProfile() {
  const [isGetData ,setIsGetData] =useState(false)
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  console.log("id EditEmployeeProfile", id)

  const dispatch = useDispatch()
  const empProfileData = useSelector(
    (state) => state.EmployeeReducer?.employee
  );
  useEffect(() => {
    if (id) {
      console.log("dispatch call");
      dispatch(getEmployee(id,setLoading))
    }
  }, [])

  useEffect(() => {
    console.log("empProfileData useEffect", empProfileData)
    if (Object.keys(empProfileData).length !== 0) {
      setIsGetData(true)
    }
  }, [empProfileData])

  console.log("isGetData",isGetData);
  return (
    <Box sx={styles.pageContent} component="main">
      <Toolbar />
      {id ? isGetData ? <CreateProfile id={id} empProfileData={empProfileData} loading={loading} setLoading={setLoading} /> : "" : <CreateProfile />}
      
    </Box>
  )
}
