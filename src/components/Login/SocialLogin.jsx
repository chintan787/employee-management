import React, { useState ,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userRegister } from "../../Action/Users";
import { LoginSocialGoogle } from "reactjs-social-login";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "./Login.style";
import { Box } from "@mui/material";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function SocialLogin() {
  const [loginToken, setLoginToken] = useState();
  const [loading, setLoading] = useState(false);
  const [googleLogin , setGoogleLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const userCreateWithSocialAccount = useSelector(
    (state) => state.UserRegisterReducer?.userRegister
);


useEffect(() => {
  console.log("useEffect call!")
  console.log("userCreateWithSocialAccount", userCreateWithSocialAccount)
  
  if (googleLogin) {
       if (Object.keys(userCreateWithSocialAccount).length !== 0) {
          console.log("User Created Successfully");
          
      } 
      // setRegisterButtonClick(false);
  }
}, [userCreateWithSocialAccount])


  const onResolve = ({ provider, data }) =>{
    
    setLoginToken(data);
    if (data.email !== "") {
       //random password
       var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
       var passwordLength = 8;
       var password = "";

     for (var i = 0; i <= passwordLength; i++) {
       var randomNumber = Math.floor(Math.random() * chars.length);
       password += chars.substring(randomNumber, randomNumber + 1);
     }

     var numbers = "0123456789"
     var numLength = 1 ;
     var numPassword = ""

     for (var i = 0; i <= numLength; i++) {
       var randomNumber = Math.floor(Math.random() * numbers.length);
       numPassword += numbers.substring(randomNumber, randomNumber + 1);
     }
     var specialChar = "!@#$%^&*()"
     var specialCharLength = "1"
     var specialCharPassword = ""

     for (var i = 0; i <= specialCharLength; i++) {
       var randomNumber = Math.floor(Math.random() * specialChar.length);
       specialCharPassword += specialChar.substring(randomNumber, randomNumber + 1);
     }

      const userdata = {
        user_fname: data.name.split(" ")[0],
        user_lname: data.name.split(" ")[1],
        user_email: data.email,
        user_password: password + specialCharPassword + numPassword,
        user_role: 2,
      };
     
      //dispatch
      dispatch(userRegister(userdata,setLoading))
      
      localStorage.setItem("user", JSON.stringify(userdata));
      const stringifiedUser = localStorage.getItem("user");
      const userAsObjectAgain = JSON.parse(stringifiedUser);

      setGoogleLogin(true);
      navigate("/dashboard");

    }

  }
  // useEffect(()=>{
  //     if(loginToken !== undefined){
  //     //      localStorage.setItem('user', JSON.stringify(userLoginReducer));
  //     // const stringifiedUser = localStorage.getItem('user');
  //     // const userAsObjectAgain = JSON.parse(stringifiedUser);
  //     // console.log("userAsObjectAgain", userAsObjectAgain)
  //         console.log("")
  //     }
  // },[loginToken])

  return (
    <div>
      <LoginSocialGoogle
        client_id="714934587669-9e8l3pv9hi88fksvjsskrdfnc58gdigt.apps.googleusercontent.com"
        scope="openid profile email"
        access_type="offline"
        onResolve={onResolve}
        onReject={(err) => {
          console.log("err", err);
        }}
      >
        <>
          <Box className="card">
            <Link to="/">
              <img className="social-icons" src="/search.png" alt="google" />
            </Link>
          </Box>
          {/* <input type="text" name="" placeholder="Create password" id="password" readonly /> */}
        </>
      </LoginSocialGoogle>
    </div>
  );
}
