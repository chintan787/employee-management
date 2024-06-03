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
import { useNavigate } from 'react-router-dom';

export default function CreateEditEmpProfile() {
  const [isGetData ,setIsGetData] =useState(false)
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const empProfileData = useSelector(
    (state) => state.EmployeeReducer?.employee
  );
  useEffect(() => {
    if (id) {
      dispatch(getEmployee(id,setLoading,navigate))
    }
  }, [])

  useEffect(() => {
    if (Object.keys(empProfileData).length !== 0) {
      setIsGetData(true)
    }
  }, [empProfileData])

  return (
    <Box sx={styles.pageContent} component="main">
      <Toolbar />
      {id ? isGetData ? <CreateProfile id={id} empProfileData={empProfileData} loading={loading} setLoading={setLoading} /> : "" : <CreateProfile />}
      
    </Box>
  )
}
