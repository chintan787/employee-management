import { useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  UPDATE_EMPLOYEE_PROFILE,

} from '../Redux/ActionTypes'


const BASE_URL = process.env.REACT_APP_BASE_URL;
let userAsObjectAgain;
const stringifiedUser = localStorage.getItem('user');
     userAsObjectAgain = JSON.parse(stringifiedUser);

const responseheader = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
}

export const getEmployees = (setLoading,navigate) => {
    const stringifiedUser = localStorage.getItem('user');
     userAsObjectAgain = JSON.parse(stringifiedUser);
    const header = {
      Authorization: `Bearer ${userAsObjectAgain?.access_token}`
    }

  return (dispatch) => {
    axios.get(`${BASE_URL}/employee/get`, {headers: header})
      .then(response => {
        setLoading(false);

        if(response.data.status === 403)
        {
        localStorage.clear();
        navigate('/')
        }
        else{
          dispatch({
            type: GET_EMPLOYEES,
            payload: response.data,
            header: responseheader
          });
        }
      
      }

      )
      .catch(error => {
        console.log("error", error);
      })
  }
}



export const getEmployee = (id, setLoading,navigate) => {
  const stringifiedUser = localStorage.getItem('user');
  userAsObjectAgain = JSON.parse(stringifiedUser);
 const header = {
   Authorization: `Bearer ${userAsObjectAgain?.access_token}`
 }
  return (dispatch) => {

    axios.get(`${BASE_URL}/employee/getById/${id}`,{headers: header})
      .then(response => {
        setLoading(false);
        if(response.data.status === 403)
        {
        localStorage.clear();
        navigate('/')
        }
        else{
          dispatch({
            type: GET_EMPLOYEE,
            payload: response.data,
            header: responseheader
          });
        }
        

      })
      .catch(error => {
        console.log("error", error);
      })
  }
}


export const updateEmployeeProfile = (id, updateEmp, setLoading,navigate) => {
  const stringifiedUser = localStorage.getItem('user');
  userAsObjectAgain = JSON.parse(stringifiedUser);
 const header = {
   Authorization: `Bearer ${userAsObjectAgain?.access_token}`
 }
  return (dispatch) => {

    axios.put(`${BASE_URL}/employee/update/${id}`, updateEmp,{headers: header})
      .then(response => {
        if (response.data.status === 401) {
          toast(response.data.message);
        }
        setLoading(false)
        if(response.data.status === 403)
        {
        localStorage.clear();
        navigate('/')
        }
        else{
        dispatch({
          type: UPDATE_EMPLOYEE_PROFILE,
          payload: response.data,
          header: responseheader

        });
      }
      })

      .catch(error => {
        console.log("error", error);
      })
  }
}

