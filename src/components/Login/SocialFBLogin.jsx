import React, { useState, useEffect } from "react";
// import { FacebookLoginButton } from 'react-social-login-buttons'
import { useSelector, useDispatch } from "react-redux";
import { userRegister } from "../../Action/Users";
import { LoginSocialFacebook } from "reactjs-social-login";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "./Login.style";
import { Box } from "@mui/material";

export default function SocialFBLogin() {
  const [loading, setLoading] = useState(false);
  const [googleLogin, setGoogleLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userCreateWithSocialAccountFB = useSelector(
    (state) => state.UserRegisterReducer?.userRegister
  );

  useEffect(() => {
    if (googleLogin) {
      if (Object.keys(userCreateWithSocialAccountFB).length !== 0) {
      }
    }
  }, [userCreateWithSocialAccountFB]);

  const onResolve = ({ provider, data }) => {
    if (data.email !== "") {
      //random password
      var chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
        user_fname: data.first_name,
        user_lname: data.last_name,
        user_email: data.email,
        user_password: password + specialCharPassword + numPassword,
        user_role: 2,
      };

      //dispatch
      dispatch(userRegister(userdata, setLoading));

      localStorage.setItem("user", JSON.stringify(userdata));
      const stringifiedUser = localStorage.getItem("user");
      const userAsObjectAgain = JSON.parse(stringifiedUser);
      navigate("/dashboard");
    }
  };

  const onLoginStart = () => {
  };
  const onLogoutSuccess = () => {
  };
  return (
    <div>
      <LoginSocialFacebook
        // appId="453546689948244"
        appId="704577311078735"
        fieldsProfile={
          "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
        }
        onLoginStart={onLoginStart}
        onLogoutSuccess={onLogoutSuccess}
        redirect_uri={"http://localhost:3000/"}
        onResolve={onResolve}
      
        onReject={(err) => {
          console.log(err);
        }}
      >
        <Box className="card">
          <Link to="/">
            <img className="social-icons" src="/fb.png" alt="facebook" />
          </Link>
        </Box>

        {/* <FacebookLoginButton/> */}
      </LoginSocialFacebook>
    </div>
  );
}
