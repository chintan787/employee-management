export const inputStyles = {
     //form input
     formInput: {
        display: "block",
        marginTop: 1,

        "& .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input::-webkit-input-placeholder":{
            fontSize: "15px",
            lineHeight: "15px",
            fontWeight: "500",
            color: "grey.main",
            overflow: "visible",
            opacity: "1",
            textTransform: "capitalize"
        },

        "& .MuiOutlinedInput-root": {
            // display: "block ",
             minWidth:"100%",
            fontSize: "15px",
            lineHeight: "15px",
            fontWeight: "500",
            color: "secondary.dark",
            borderRadius: "6px",
            background: "#fff",
        },
        
        "& fieldset": {
            borderColor: "transparent",
            boxShadow: "0px 0px 1px 0px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 6%), 0px 0px 2px 0px rgb(0 0 0 / 6%)",
        },

        "& input[type='email']": {
            textTransform: "none"
        },
        "&.searchInput input":{
            textTransform: "none"
        },
       
        
       /*  "& input[name='emp_code']": {
            textTransform: "uppercase"
        }, */
        "&.emp-code input":{
            textTransform:"uppercase"
        },
       
        "& input": {
            fontFamily: "'Inter', sans-serif",
            padding: {
                xs: "12px",
                sm: "14px",
            },
            textTransform: "capitalize",
            width: "-webkit-fill-available",
            color: "secondary.dark",
            background: "#fff",
            borderRadius: "6px",

            "&::-webkit-input-placeholder": {
                fontSize: "15px",
                lineHeight: "15px",
                fontWeight: "500",
                color: "grey.main",
                overflow: "visible",
                opacity: "1",
                textTransform: "capitalize"
            },
            "&::-webkit-datetime-edit":{
                fontSize: "15px",
                lineHeight: "15px",
                fontWeight: "500",
                // color:"secondary.dark",
                color: "grey.main",
                overflow: "visible",
                opacity: "1",
                 textTransform: "uppercase"
            },
            "&::-webkit-calendar-picker-indicator":{
                color: "grey.main",
            },


        },
        "& .MuiSelect-select": {
            width: "auto",
            background: "#fff",
            textTransform: "capitalize",
            padding: {
                xs: "12px",
                sm: "14px",
            },
            
            "& .MuiList-root .MuiMenuItem-root": {
                textTransform: "capitalize",
            }
        },
        "& .MuiInputLabel-root":{
            fontSize: "15px",
            lineHeight: "15px",
            fontWeight: "500",
            color: "grey.main",
            overflow: "visible",
            opacity: "1",
            textTransform: "capitalize"  
        },
        "& .MuiOutlinedInput-input ": {
            lineHeight: "20px",
            "&.Mui-disabled":{
                // backgroundColor: "rgba(0, 0, 0, 0.12)
                backgroundColor :"rgb(131 129 129 / 9%)",
            }
        },
        // MuiSelect-select MuiSelect-outlined MuiOutlinedInput-input
       

    },
    textfieldPassword: {
        display: "block",
        margin: "8px 0",
        "& .MuiOutlinedInput-root": {
            minWidth:"100%",
           /*  display: "block ",
            fontFamily: "'Inter', sans-serif", */
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
             /* padding: "14.5px 16px 16.5px 16px",  */
          /*   padding:"16px 14px", */
            width: "-webkit-fill-available",
            color: "secondary.dark",
            background: "#fff",
            borderRadius: "6px",
            /* "&::placeholder":{
                fontSize: "15px",
                lineHeight: "15px",
                fontWeight: "500",
                color: "grey.main",
                overflow: "visible",
            }, */
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

    formSelectInput:{
        display: "block",
        marginTop: 1,

        

        "& .MuiOutlinedInput-root": {
             display: "block ",
            
            fontSize: "15px",
            lineHeight: "15px",
            fontWeight: "500",
            color: "secondary.dark",
            borderRadius: "6px",
            background: "#fff",
           
            
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
                /*  xl:"16px",  */
            },
            textTransform: "capitalize",
            width: "-webkit-fill-available",
            color: "secondary.dark",
            background: "#fff",
            borderRadius: "6px",

            "&::-webkit-input-placeholder": {
                fontSize: "15px",
                lineHeight: "15px",
                fontWeight: "500",
                color: "grey.main",
                overflow: "visible",
                opacity: "1",
                textTransform: "capitalize"
            },


        },
        "& .MuiSelect-select": {
            width: "auto",
            background: "#fff",
            textTransform: "capitalize",
            // padding:"16px 14px 12px",
            padding: {
                xs: "12px",
                sm: "14px",
            },
            "& .css-10zm1yq-MuiInputBase-root-MuiOutlinedInput-root .MuiSelect-select":{
                color: "grey.main",
            },
            "& .MuiList-root .MuiMenuItem-root": {
                textTransform: "capitalize",
                "&::first-of-type":{
                    color: "grey.main",
                }
            }
        },
        "& .MuiInputLabel-root":{
            fontSize: "15px",
            lineHeight: "15px",
            fontWeight: "500",
            color: "grey.main",
            overflow: "visible",
            opacity: "1",
            textTransform: "capitalize"  
        },
        "& .MuiOutlinedInput-input ": {
            lineHeight: "20px",
            "&.Mui-disabled":{
                // backgroundColor: "rgba(0, 0, 0, 0.12)
                backgroundColor :"rgb(131 129 129 / 9%)",
            }
        },
        "& .css-1jmz46p-MuiButtonBase-root-MuiMenuItem-root": {
            textTransform: "capitalize",
        }

    },
    selectPlaceholder:{
        fontSize: "15px",
        lineHeight: "15px",
        fontWeight: "500",
        color: "grey.main",
        overflow: "visible",
        opacity: "1",
        textTransform: "capitalize",
        marginTop:"2px",
    },
    defaultSelected:{
        fontSize: "15px",
        lineHeight: "15px",
        fontWeight: "500",
        color: "secondary.dark",
       marginTop:"3px",
        
    },

    //for toast styling
    toastContainer:{
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

    }
}