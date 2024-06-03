import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  ADD_LEAVE,
  GET_LEAVES,GENERATE_SALARYSLIP
} from '../Redux/ActionTypes'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const responseheader = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
}

export const createEmployeeProfile = (createEmployee,setLoading,navigate) => {

    return (dispatch) => {
      const stringifiedUser = localStorage.getItem('user');
      const userAsObjectAgain = JSON.parse(stringifiedUser);
     const header = {
       Authorization: `Bearer ${userAsObjectAgain?.access_token}`
     }
       axios.post(`${BASE_URL}/employee/create`,createEmployee,{headers: header})
        .then((response) => {
          setLoading(false)
          if(response.data.status === 401){
            toast(response.data.message);
          }

          if(response.data.status === 403)
          {
          localStorage.clear();
          navigate('/');
          }
          else{
          dispatch({
            type: CREATE_EMPLOYEE,
            payload: response.data,
            header: responseheader
  
          });
        }
        })
        .catch(error => {
          console.log("error", error);
      });
     
    }
   
    
  
  }
  
  
  export const deleteEmployee = (emp_Code,setShowLoader,navigate,setAnchorEl) => {
    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);
   const header = {
     Authorization: `Bearer ${userAsObjectAgain?.access_token}`
   }
    return (dispatch) => {
      axios.delete(`${BASE_URL}/employee/deleteByStatus/${emp_Code}`,{headers: header})
        .then(response => {
          // if(response.data.status === 401){
          //   toast(response.data.message);
          //   // setShowLoader(false);
          // }
          // if(response.data.status === 403)
          // {
          // localStorage.clear();
          // navigate('/')
          // }
          // if(response.data.status === 200)
          // {
          //   toast(response.data.message);
          //   setShowLoader(false);
          // }
          if(response.data.status === 403)
          {
            localStorage.clear();
            navigate('/')
          }
         else{
          if(response.data.status === 401){
              toast(response.data.message);
              setShowLoader(false);
              setAnchorEl(null);
            }
          if(response.data.status === 200)
          {
            toast(response.data.message);
            setShowLoader(false);
            setAnchorEl(null);

          }

          dispatch({
            type: DELETE_EMPLOYEE,
            payload: response.data,
            header: responseheader
          });
         }

  
        })
        .catch(error => {
         
          
        })
    }
  }
  

  export const addAnnualLeave = (myEvents,navigate) => {
    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);
   const header = {
     Authorization: `Bearer ${userAsObjectAgain?.access_token}`
   }
    return (dispatch) => {
  
       axios.post(`${BASE_URL}/holiday/add/`,myEvents,{headers: header})
        .then((response) => {
          
          if(response.data.status === 403)
          {
          localStorage.clear();
          navigate('/')
          }
          else{
            if(response.data.status === 401){
              toast(response.data.message);
            } 

          dispatch({
            type: ADD_LEAVE,
            payload: response.data,
            header: responseheader
  
          });
        }
        })
        .catch(error => {
          console.log("error", error);
      });
    }
  }

  export const getAllLeaves = (navigate) => {
    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);
    const header = {
      Authorization: `Bearer ${userAsObjectAgain?.access_token}`
    }
    return (dispatch) => {
      axios.get(`${BASE_URL}/holiday/get`,{headers: header})
        .then(response => {
          // setLoading(false);
          if(response.data.status === 403)
          {
          localStorage.clear();
          navigate('/')
          }
          else{
          dispatch({
            type: GET_LEAVES,
            payload: response.data,
            header: responseheader
          });
        }
        }
        )
        .catch(error => {
           console.log("error",error);
        })
    }
  }

  export const genrateSalarySlip = (formData,setShowEmailLoader,navigate) => {
    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);
    const header = {
      Authorization: `Bearer ${userAsObjectAgain?.access_token}`
    }
    return (dispatch) => {
      axios.post(`${BASE_URL}/attachment/add`,formData,{headers: header})
        .then(response => {
          
          if(response.data.status === 403)
          {
          localStorage.clear();
          navigate('/')
          }
          else if(response.data.status === 401){
            toast(response.data.message)
            setShowEmailLoader(false);
          }
          else{
            if(response.data.status === 200)
            {
              toast('Email sent succefully!')
              setShowEmailLoader(false);
            }
          dispatch({
            type: GENERATE_SALARYSLIP,
            payload: response.data,
            header: responseheader
          });
        }
        }
        )
        .catch(error => {
           console.log("error",error);
        })
    }
  }