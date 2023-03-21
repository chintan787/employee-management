import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  ADD_LEAVE,
  GET_LEAVES
} from '../Redux/ActionTypes'

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createEmployeeProfile = (createEmployee,setLoading) => {

    return (dispatch) => {
  
       axios.post(`${BASE_URL}/employee/create`,createEmployee)
        .then((response) => {
          setLoading(false)
          if(response.data.status === 401){
            toast(response.data.message);
          }
        
          console.log("response", response.data.status);
          console.log("response", response.data.message);
          dispatch({
            type: CREATE_EMPLOYEE,
            payload: response.data,
  
          });
        })
        .catch(error => {
          console.log("error", error);
      });
     
    }
   
    
  
  }
  
  
  export const deleteEmployee = (menuId,setShowLoader) => {
  
    return (dispatch) => {
  
      axios.delete(`${BASE_URL}/employee/delete/${menuId}`)
        .then(response => {
          setShowLoader(false)
           console.log("response employee",response.data);
  
          dispatch({
            type: DELETE_EMPLOYEE,
            payload: response.data,
  
          });
  
        })
        .catch(error => {
         
          
        })
    }
  }
  

  export const addAnnualLeave = (myEvents) => {

    return (dispatch) => {
  
       axios.post(`${BASE_URL}/holiday/add/`,myEvents)
        .then((response) => {
          // setLoading(false)
           if(response.data.status === 401){
            toast(response.data.message);
          } 
          // toast(response.data.message);
          console.log("response", response.data.status);
          console.log("response", response.data.message);
          dispatch({
            type: ADD_LEAVE,
            payload: response.data,
  
          });
        })
        .catch(error => {
          console.log("error", error);
      });
    }
  }

  export const getAllLeaves = () => {
    return (dispatch) => {
      axios.get(`${BASE_URL}/holiday/get`)
        .then(response => {
          // setLoading(false);
          dispatch({
            type: GET_LEAVES,
            payload: response.data,
          });
        }
        )
        .catch(error => {
           console.log("error",error);
        })
    }
  }