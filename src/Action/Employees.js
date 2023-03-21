import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  UPDATE_EMPLOYEE_PROFILE,
  
} from '../Redux/ActionTypes'

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getEmployees = (setLoading) => {
  return (dispatch) => {
    axios.get(`${BASE_URL}/employee/get`)
      .then(response => {
        setLoading(false);
        dispatch({
          type: GET_EMPLOYEES,
          payload: response.data,
        });

      }
      
      )
      .catch(error => {
         console.log("error",error);
      })
  }
}

export const getEmployee = (id,setLoading) => {

  return (dispatch) => {

    axios.get(`${BASE_URL}/employee/getById/${id}`)
      .then(response => {
        // console.log("response employee",response);
        setLoading(false)
        dispatch({
          type: GET_EMPLOYEE,
          payload: response.data,

        });

      })
      .catch(error => {
        console.log("error",error);
      })
  }
}


export const updateEmployeeProfile = (id,updateEmp,setLoading) => {

  return (dispatch) => {
    
      axios.put(`${BASE_URL}/employee/update/${id}`,updateEmp)
      .then(response => {
        if(response.data.status === 401){
          toast(response.data.message);
        }
        setLoading(false)
        console.log("response", response);
        dispatch({
          type: UPDATE_EMPLOYEE_PROFILE,
          payload: response.data,

        });
      })

      .catch(error => {
        console.log("error",error);
      })
  }
}

