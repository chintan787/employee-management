import axios from "axios";
import { toast } from "react-toastify";
import { USERS_LOGIN , GET_OTP , CONFIRM_OTP , SET_NEW_PASSWORD , USERS_REGISTER , GET_USER} from '../Redux/ActionTypes';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const stringifiedUser = localStorage.getItem('user');
const userAsObjectAgain = JSON.parse(stringifiedUser);
const header = {
  Authorization: `Bearer ${userAsObjectAgain?.access_token}`
}
const responseheader = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
}

export const userLogin = (userCredential,setLoading) => {

    return (dispatch) => {
      
        axios.post(`${BASE_URL}/user/login`, userCredential)
            .then((response) => {

                if (response.data.status === 401) {
                    toast(response.data.message);
                   setTimeout(()=>{
                    setLoading(false);
                   },[1000])
                }     
                        
                if(response.data.status === 200) {
                    setLoading(false);
                }
                dispatch({
                    type: USERS_LOGIN,
                    payload: response.data,

                });
            })
            .catch(error => {
                console.log("error", error);
            });

    }
}

export const getOPT = (userEmail,setOpenAlert) => {

    return (dispatch) => {
        
        axios.post(`${BASE_URL}/user/forgot_password`, userEmail)
            .then((response) => {

               /*  if (response.data.status === 401) {
                    toast(response.data.message);
                }  */ 
                if(response.data.status === 200)
                {
                    setOpenAlert(true);
                }  
                toast(response.data.message);           
                dispatch({
                    type: GET_OTP,
                    payload: response.data,

                });
            })
            .catch(error => {
                console.log("error", error);
            });

    }
}


export const confirmOTP = (userOTP,setOpenAlert) => {

    return (dispatch) => {
      
        axios.post(`${BASE_URL}/user/otp_confirmation`, userOTP)
            .then((response) => {

                /* if (response.data.status === 401) {
                    toast(response.data.message);
                } */    
                if(response.data.status === 200){
                     setOpenAlert(true)
                }
                 toast(response.data.message);           
                dispatch({
                    type : CONFIRM_OTP ,
                    payload: response.data,

                });
            })
            .catch(error => {
                console.log("error", error);
            });

    }
}


export const setResetPassword = (user_email,userPassword ) => {

    return (dispatch) => {
        
        axios.put(`${BASE_URL}/user/update_password/${user_email}`, userPassword)
            .then((response) => {

                if (response.data.status === 401) {
                    toast(response.data.message);
                }    
                if(response.data.status === 200){
                }
                dispatch({
                    type : SET_NEW_PASSWORD ,
                    payload: response.data,

                });
            })
            .catch(error => {
                console.log("error", error);
            });

    }
}


export const userRegister = (userData,setLoading,) => {

    return (dispatch) => {
        
        axios.post(`${BASE_URL}/user/create`, userData)
            .then((response) => {

                if (response.data.status === 401) {
                   setTimeout(()=>{
                    setLoading(false);
                   },[1000])
                }     
                toast(response.data.message);
                if(response.data.status === 200) {
                    setLoading(false);
                }
               

                dispatch({
                    type: USERS_REGISTER,
                    payload: response.data,

                });
            })
            .catch(error => {
                console.log("error", error);
            });

    }
}

