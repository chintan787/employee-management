/* export const styles = (theme) => ({ */
export const styles = {
    leftContent: {
        backgroundColor: "primary.dark",
        minHeight: "100vh",
        marginTop: "0",
        padding: {
            sm: "26px 26px 0",
            md: "38px 38px 0",
        },
        position: "relative",
        overflow: {
            xs: "scroll",
            sm: "hidden"
        },
    },
    logoSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: {
            xs: "center",
            sm: "left",
            md: "left"
        },
        margin: "12px 0",
        "& .logo-dashboard": {
            width: "50px",
        },
        "& .logo-clever": {
            marginLeft: 2,
        },
    },
    textContent: {
        padding: "60px 0",
        maxWidth: "95%",
        margin: "0 auto",
    },
    introHeading: {
        color: "#fff",
        fontSize:
        {
            sm: "24px",
            lg: "36px",
        },
        lineHeight:
        {
            sm: "34px",
            lg: "48px",
        },
        fontWeight: "700",
        fontStyle: "normal",
        marginBottom: "30px",
    },
    introSubheading: {
        color: "#fff",
        fontSize: {
            sm: "14px",
            lg: "18px"
        },
        lineHeight: {
            sm: "25px",
            lg: "30px",
        },
        fontWeight: "400",
        fontStyle: "normal",
        marginBottom: "30px",
    },

    messageIcon: {
        position: {
            xs: "fixed",
            sm: "absolute"
        }, /* "absolute", */
        bottom: {
            xs: "10px",
            sm: "36px"
        },
        left: {
            xs: "10px",
            sm: "26px"
        },
        display: "flex",
        justifyContent: "center",
        width: {
            xs: "24px",
            md: "30px",
            /*  lg:"30px", */
        },
        padding: {
            xs: "15px",
            md: "18px",
            lg: "26px",
            xl: 4,
        },
        borderRadius: "50%",
        background: "linear-gradient(225deg, #FFEF5E 0%, #F7936F 100%)",
        "& .message-icon": {
            color: "#fff",
            fontSize: {
                xs: "24px",
                /* sm:"24px", */
                md: "30px"
            },
        },
    },

    ellipse: {
        background: "#8DEDF7",
        position: "absolute",
        right: "-36px",
        transform: "translate(-50%, -50%)",
        height: {
            sm: "100px",
            md: "120px",
            lg: "150px",
            xl: "170px"
        },
        width: {
            sm: "100px",
            md: "120px",
            lg: "150px",
            xl: "170px"
        },
        borderRadius: "50%",
        bottom: {
            sm: "-85px",
            md: "-90px",
            lg: "-128px"
        },
    },

    /**************right content ********/
    rightContent: {
        minHeight: "100vh",
        overflowY: "auto",
        background: "#f7fafc",
        display: {
            xs: "block",
            sm: "flex"
        },
        alignItems: "center",
        position: "relative",

        "& .right-wrapper": {
            margin: "0 auto",
            paddingTop: 4,
            paddingBottom: 4,
            width: {
                xs: "85%",
                md: "50%",
            },
        },
        "& .right-wrapper-register": {
            margin: "0 auto",
            paddingTop: 5,
            paddingBottom: 5,
            width: {
                xs: "88%",
                lg: "60%",
            },
        },
    },
    helloEmoji: {
        marginBottom: {
            xs: "10px",
            sm: "30px"
        },
    },
    headingSection: {
        marginBottom: {
            xs: 4,
            sm: 6,
        },
    },
    formHeading: {
        lineHeight: "38px",
        marginBottom: "12px",
    },
    formSubheading: {
        lineHeight: "26px",
    },
    formContent: {
        "& .form-textfield-email": {
            marginBottom: "30px"
        },
        "& a": {
            textDecoration: "none",
        },
        "& label": {
            padding: "4px 0",
            fontSize: "14px",
            lineHeight: "16px",
            fontWeight: "500",
            color: "secondary.dark"
        },
        "& .forgot-password": {
            color: "primary.dark",
            lineHeight: "16px",
            fontWeight: "500",

        },
        "& .MuiAlert-standardError": {
            marginBottom: "10px"
        },
        "& .MuiAlert-message": {
            fontFamily: "'Inter', sans-serif",
        },
        "& .input-code": {
            minWidth: "100%",
            marginTop: 1,
            "& input": {
                width: "43px !important",
                height: "43px !important",
                //    flexGrow : "1",
                fontSize: "15px",
                lineHeight: "15px",
                fontWeight: "500",
                color: "secondary.dark",
                borderRadius: "6px",
                background: "#fff",
                borderColor: "transparent",
                boxShadow: "0px 0px 1px 0px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 6%), 0px 0px 2px 0px rgb(0 0 0 / 6%)",
                "&:focus-visible": {
                    outline: "#E1E8FF"
                },
                "&:focus": {
                    outline: "#E1E8FF",
                    // borderColor: "#E1E8FF"
                }
            }


        }
    },

    //form Input
    /*  formInput: {
         display: "block",
         marginTop: 1,
        
         "& .MuiOutlinedInput-root": {
             minWidth:"100%",
           
             fontSize: "15px",
             lineHeight: "15px",
             fontWeight: "500",
             color: "secondary.dark",
            borderRadius: "6px",
         },
         "& fieldset": {
             borderColor: "transparent",
             boxShadow: "0px 0px 1px 0px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 6%), 0px 0px 2px 0px rgb(0 0 0 / 6%)",
 
         },
 
         "& input": {
             fontFamily: "'Inter', sans-serif",
               padding:  {
                 xs: "12px",
                 sm: "14px",
                
             }, 
     
             width: "-webkit-fill-available",
             color: "secondary.dark",
             background: "#fff",
             borderRadius: "6px",
             
              "&::-webkit-input-placeholder":{
                 fontSize: "15px",
                 lineHeight: "15px",
                 fontWeight: "500",
                 color: "grey.main",
                 overflow: "visible",
                  opacity:"1",
             } 
 
         },
     },
 
     textfieldPassword: {
         display: "block",
         margin: "8px 0",
         "& .MuiOutlinedInput-root": {
             minWidth:"100%",
       
             fontSize: "15px",
             lineHeight: "15px",
             fontWeight: "500",
             color: "secondary.dark",
         },
         "& fieldset": {
             borderColor: "transparent",
             boxShadow: "0px 0px 1px 0px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 6%), 0px 0px 2px 0px rgb(0 0 0 / 6%)",
 
         },
         "& input": {
             fontFamily: "'Inter', sans-serif",
                 padding: {
                 xs: "12px",
                 sm: "14px",
             },  
           
             width: "-webkit-fill-available",
             color: "secondary.dark",
             background: "#fff",
             borderRadius: "6px",
            
             "&::-webkit-input-placeholder":{
                 fontSize: "15px",
                 lineHeight: "15px",
                 fontWeight: "500",
                 color: "grey.main",
                 overflow: "visible",
                  opacity:"1",
             }
         },
     },
  */
    formButton: {
        display: "block",
        fontSize: "14px",
        lineHeight: "14px",
        fontWeight: "600",
        width: "100%",
        padding: "16px",
        margin: "30px 0",
        backgroundColor: "primary.dark",
        color: "#fff",
        borderRadius: "8px",
        textTransform: "none",
        "&.MuiLoadingButton-root":{
            padding:"15px 0"
        },
        "&.Mui-disabled":{
            color:"#fff",
            backgroundColor:"primary.dark",
        },
        "&:hover": {
            backgroundColor: "#4C6FFF",
            // backgroundColor: "pimary.dark",
            borderColor:"#4C6FFF",
            boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
        },
        "& .MuiCircularProgress-root":{
            color:"#FFF"
        }
    },
    socialIconHeading: {
        borderBottom: "1px solid #EDF2F7",
        width: "100%",
        textAlign: "center",
        marginTop: "30px",
        marginBottom: "30px",
        lineHeight: "0.1em",
        color: "secondary.main",
        fontSize: "12px",
        "& span": {
            background: "#f7fafc",
            padding: "0 10px",
        }
    },
    socialSection: {
        display: "flex",
        justifyContent: "center",
        margin: "30px 0",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        "& .card": {
            boxShadow: "0px 0px 1px rgba(12, 26, 75, 0.24), 0px 3px 8px -1px rgba(50, 50, 71, 0.05)",
            borderRadius: "8px",
            width: "68px",
            margin: "0 10px",
            "&:hover": {
                boxShadow: "0 0px 6px 0 rgba(0,0,0,0.2)",
            },
            "& a": {
                fontSize: 0,
                display: "block",
            },
            "& .social-icons": {
                width: "auto",
                height: "25px",
                padding: "12px",

            }
        },

    },

    accountLink: {
        position: {
            xs: "relative",
            sm: "absolute",
        },
        bottom: {
            xs: "0",
            xl: "30px"
        },
        left: 0,
        right: {
            xs: "0",
            sm: "40px",
        },
        textAlign: {
            xs: "center",
            sm: "right",
        },
        color: "secondary.main",
        fontWeight: "600",
        lineHeight: "24px",
        margin: {
            xs: "10px 0",
            sm: "0",
        },
        "& a": {
            textDecoration: "none",
            "&:hover": {
                borderBottom: "1px solid",
                borderColor: "primary.dark",
            }
        },
        "& span": {
            /*  color: "#748ffd" */
            color: "primary.dark"
        }
    },

    formCondition: {
        display: "flex",
        /* alignItems: {
            xs: "flex-end",
            xl: "flex-start",
        }, */
        /*  margin: "30px 0", */
        "& span": {
            /* display: "block", */
            height: "20px",
            color: "#c9ced6",
            paddingLeft: 0,
            fontSize: "20px",
            paddingTop: 0,
            paddingBottom: 0,
            "&.Mui-checked": {
                "& svg": {
                    color: "primary.dark",
                }
            },
        },
        "& p": {
            /* alignSelf:"flex-start", */
            fontSize: "12px",
            lineHeight: "20px",
            fontWeight: "400",
            color: "secondary.dark",
            "& .conditions": {
                color: "secondary.dark",
                fontWeight: "600",
                textDecoration: "none"
            }
        }
    },
    warningMsg: {
        fontSize: "11px",
        lineHeight: '12px',
        color: "secondary.main",
        marginBottom: "30px",
    },
    toastContainer: {
        "& .Toastify__toast-body": {
            fontFamily: "'Inter', sans-serif",
            color: "#425466",
            fontSize: "14px",
            lineHeight: "16px",
            fontWeight: "500",

        },
        "& .Toastify__progress-bar-theme--light": {
            background: "#4C6FFF",
        }

    },
    userDetails: {
        width: "100%",
        "& .MuiGrid-root.MuiGrid-item": {
            paddingTop: 0
        }
    },

    fullname: {
        display: {
            xs: "block",
            md: "flex",
        },/* "flex", */
        width: "100%",
    },
    firstName: {
        width: {
            xs: "100%",
            md: "48%",
        },/* "48%", */
        paddingRight: {
            xs: "0",
            md: "10px"
        },
    },
    lastName: {
        width: {
            xs: "100%",
            md: "48%",
        },
        paddingLeft: {
            xs: "0",
            md: "10px"
        },/* "10px", */

    }
}
