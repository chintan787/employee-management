import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
     
      main: '#E1E8FF', //light blue background badge
      dark: '#4C6FFF', // button color
      // dark:'#ff455c',

    },
    secondary: {
      light: '#A0AEC0', //list icon
      main: '#7A7A9D', //card title
      dark: "#425466" // side bar item
    },
    info: {

      main: '#27272E', //heading
      dark: '#16192C' //card price
    },
    success: {
      main:'#66CB9F',
      // main: '#DEFFEE',
      dark: '#66CB9F'
    },
    error: {
      light: '#F16063',//loss font
      main: '#FFE6E4', //loss background
    },
    grey: {
      light: '#8492A6',
      main: '#7A828A', //input placeholder

    }
  },

  typography: {
    //all page title
    h2:{
      fontSize: "28px",
      fontWeight: "600",
        color: "#27272E"  
    },
    //login subtitle
    subtitle1:{
      fontWeight: "400",
      fontSize: "16px",
       color:"#27272E" 
    },

    //Card price
    h3:{
      fontWeight: "600",
      fontSize: "20px",
      color:'#16192C',
      lineHeight: "26px",
    },

    h4:{
      fontWeight: "700",
      fontSize: "18px",
    },

    // card heading ex:Statistics
   h5:{
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "25px",
    color:"#16192C",
   },
   //card title, card date
   h6:{
    fontWeight: "700",
    fontSize: "12px",
    color:"#7A7A9D",
    lineHeight: "15px",
   },

    //defalut 
    body1: {
      color: "#27272E",
      fontSize: "14px",
      fontFamily: "'Inter', sans-serif", 
    },
    // not working
    button:{
      backgroundColor: "#4C6FFF",
      color: "#fff",
    },
  }
});

export default theme