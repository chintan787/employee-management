import React, { useState ,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userRegister ,userLogin} from "../../Action/Users";
import { LoginSocialGoogle,IResolveParams } from "reactjs-social-login";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "./Login.style";
import { Box } from "@mui/material";
import { ConstructionOutlined } from "@mui/icons-material";
import { useCookies } from "react-cookie";

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function SocialLogin() {
  const [loginToken, setLoginToken] = useState();
  const [loading, setLoading] = useState(false);
  const [googleLogin , setGoogleLogin] = useState(false);

  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState(null)

  const [cookies, setCookie] = useCookies(["user"]);
  const[loginData ,setLoginData] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const userCreateWithSocialAccount = useSelector(
    (state) => state.UserRegisterReducer?.userRegister
);

const userLoginReducer = useSelector(
  (state) => state.UserLoginReducer?.user
);



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
      const userLoginData = {
        user_email: data.email,
        user_password: password + specialCharPassword + numPassword,
        access_token:data.access_token
      }
      setLoginData({
        user_email: data.email,
        user_password: password + specialCharPassword + numPassword,
      })

      const access_token = data.access_token
      dispatch(userRegister(userdata,setLoading))

      localStorage.setItem('user', JSON.stringify(userLoginData));
        const stringifiedUser = localStorage.getItem('user');
        const userAsObjectAgain = JSON.parse(stringifiedUser);
        setCookie("user", userAsObjectAgain.access_token, {
          path: "/",
          maxAge: 24 * 60 * 60
        });
        navigate('/dashboard');



      setGoogleLogin(true);

    }

  }

  useEffect(()=>{
    console.log("googleLogin")

    if(googleLogin)
    {
      console.log("true",loginData)
      // dispatch(userLogin(loginData,setLoading))
      // navigate("/dashboard");

    }
  },[googleLogin])





 
 

  useEffect(() => {
    // console.log("useEffect call!")
   
    if(Object.entries(userCreateWithSocialAccount).length === 0)
    {
      // console.log("hello");
      // setResponseStatus(0);
      // createUser();
    }
  }, [userCreateWithSocialAccount])


// useEffect(()=>{
//   console.log("data---",userCreateWithSocialAccount)
// },[userCreateWithSocialAccount])

const onLoginStart =() => {
  console.log("start")
}

  return (
    <div>
      <LoginSocialGoogle
        client_id="94711121567-76f057ap15asmvu1vuqlc9cpu657p1fa.apps.googleusercontent.com"
        // redirect_uri='http://localhost:3000/'
        scope="openid profile email"
        access_type="offline"
        onResolve={onResolve}
        // onResolve={({ provider, data }) => {
        //   setProvider(provider);
        //   setProfile(data);
        // }}
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


      {/* <LoginSocialGoogle
          client_id="94711121567-76f057ap15asmvu1vuqlc9cpu657p1fa.apps.googleusercontent.com"
          onLoginStart={onLoginStart}
          // redirect_uri={REDIRECT_URI}
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }) => {
            console.log("provider")
            setProvider(provider);
            setProfile(data);
          }}
          onReject={err => {
            console.log(err);
          }}
        >
          <Box className="card">
            <Link to="/">
              <img className="social-icons" src="/search.png" alt="google" />
            </Link>
          </Box>
        </LoginSocialGoogle> */}


      {/* <LoginSocialGoogle
          client_id='714934587669-9e8l3pv9hi88fksvjsskrdfnc58gdigt.apps.googleusercontent.com'
          // onLoginStart={onLoginStart}
          redirect_uri='http://localhost:3000/'
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={err => {
            console.log(err);
          }}
        >
          <Box className="card">
            <Link to="/">
              <img className="social-icons" src="/search.png" alt="google" />
            </Link>
          </Box>
        </LoginSocialGoogle> */}

    </div>
  );
}
