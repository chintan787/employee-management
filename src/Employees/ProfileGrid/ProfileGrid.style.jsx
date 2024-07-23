

export const styles = {
    stickyProfileGird: {
        position: {
            xs: "relative",
            md: "sticky"
        },
        /*  "sticky", */
        top: "10%",
        alignSelf: "start",

    },
    cardContentUserProfile: {
        padding: "24px",
       
        "&:last-child": {
            paddingBottom: "16px"
        }
    },
    cardContent: {
        padding: "24px",
    },

    userProfileImage: {
        marginBottom: "20px",
        "& .MuiAvatar-root": {
            margin: "0 auto",
            width: '100px',
            height: '100px'
        },
       
    },

    userIntro: {
        textAlign: "center",
    },
    userName: {
        color: "primary.dark",
        fontWeight: "700",
        fontSize: "18px",
        lineHeight: "22px",
        textTransform: "capitalize",
    },
    userDesignation: {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "20px",
        color: "secondary.dark",
        paddingTop: "5px",
        textTransform: "capitalize",
    },
    userIntroDesc: {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "20px",
        color: "secondary.dark",
        margin: "10px 0",
        padding: {
            xs: "0 20px",
            xl: "0 25px"
        },
    },
    empIntroTitle: {
        color: "#27272E",
        fontWeight: "700",
        fontSize: "18px",
        lineHeight: "22px",
        textTransform: "capitalize",

    },
    userSkils: {
        margin: "10px 0",
        width: "100%"
    },
    userSkilList: {
        textAlign: "center",
        "& p": {
            padding: "10px 15px",
            borderRadius: "25px",
            border: "1px solid #ccc",
            color: "secondary.main",
            lineHeight: "18px",
            fontWeight: "400",
            textTransform: "capitalize",
            background: "#f7fafc",
            borderColor: "#EDF2F7",
        }
    },
    empInfo: {
        width: "100%",
       
    },

    editProfileImage: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    editProfileButton: {
        backgroundColor: "#fff",
        color: "secondary.main",
        fontWeight: "600",
        lineHeight: "10px",
        fontSize: "12px",
        textTransform: "none",
        "& span": {
            marginRight: "2px"
        }
    },

    /***used card title and price property */
    infoList: {
        "& .title": {
            color: "secondary.main",
            fontWeight: "700",
            fontSize: "12px",
            lineHeight: "15px",
            textTransform: "capitalize",
        },
        "& .info": {
            color: "info.dark",
            fontWeight: "500",
            /* fontSize: "14px", */
            lineHeight: "20px",
            textTransform: "capitalize",
            "&.email": {
                textTransform: "none",
            }
        }
    },
    basicInfosection: {
        paddingBottom: 3
    },
    techInfosection: {
        paddingBottom: 3
    },
    downloadButton: {
        fontSize: "14px",
        lineHeight: "14px",
        fontWeight: "600",
        backgroundColor: "primary.dark",
        borderRadius: "8px",
        color: "#fff",
        padding: "16px",
        marginTop: "20px",
        marginRight: "20px",
        textTransform: "capitalize"

    },
    empCode: {
        color: "secondary.main",
        padding: "2px 0",
        fontSize: "12px",
        textTransform: "uppercase"
    },
    cardContentEmpty: {
        minHeight: "500px",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        padding:"24px",
        /*  position:"relative" */
    },
    empName: {
        textTransform: "uppercase"
    },
    editProfileButtonSection: {
        margin: "20px 0px 10px"
    },
    buttonSection: {
        paddingBottom: 3,
        justifyContent: "flex-end",
        "& a":{
            textDecoration: "none"
        }
    },
    secondaryButton: {
        fontSize: "14px",
        lineHeight: "14px",
        fontWeight: "600",
        padding: "16px",
        borderRadius: "8px",
        textTransform: "capitalize",
        /*  marginRight:"20px",
       marginTop:"20px",  */
        background: "#fff",
        color: "info.dark",
        borderColor: "#dfe0e5",
        "&:hover": {
            background: "#fff",
            borderColor: "primary.dark",
        }
    },
    primaryButton: {
        fontSize: "14px",
        lineHeight: "14px",
        fontWeight: "600",
        padding: "16px",
        borderRadius: "8px",
        textTransform: "capitalize",
        boxShadow: "none",
        backgroundColor: "primary.dark",
        color: "#fff",
        "&.Mui-disabled":{
            backgroundColor: "primary.dark",
        }
       
    },

    
    empInfoHeadingSection: {
        display: "flex",
        alignItems: "center",
        marginBottom: "15px"
    },
    empEditButton: {
        marginLeft: "10px",
        padding: "5px",
        
        "& svg": {
            fontSize: "20px"
        }
    },
   
    empIntroductionSection: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 2,
        marginRight: 2
    },
    radioButtons: {
        "&.Mui-checked": {
            color: "info.main"
        }
    },

    loaderColor:{
        color:"primary.dark"
    },
    showLoader:{
        position: "absolute"
    }
   

}