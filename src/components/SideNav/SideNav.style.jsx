/* const drawerWidth = 250; */
export const styles = {

    sideNav: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        overflowY: "auto"
    },
    listSection: {
        "& a": {
            textDecoration: "none",
            "&.active": {
                "& li": {
                    position: "relative",
                    "&::before": {
                        content: "''",
                        width: "3px",
                        height: "24px",
                        backgroundColor: "primary.dark",
                        left: "0",
                        position: "absolute",
                    },
                },
                "& .list-title span": {
                    color: "primary.dark",
                },
                "& .list-icon": {
                    color: "primary.dark",

                },
            }
        }

    },
    logoSection: {
        display: "flex",
        alignItems: "center",
        padding: "30px 24px 20px",
        /*  padding:"30px 24px", */
        "& .logo-clever": {
            marginLeft: "12px",
        },
    },
    listItems: {
        padding: "8px 24px",
        marginTop: 1,
        marginBottom: 1,
        cursor: "pointer",
        "&:hover": {
            "& .list-title span": {
                color: "primary.dark"
            },
        },
        "& .list-title": {
            "& span": {
                fontSize: "14px",
                lineHeight: "18px",
                color: "secondary.dark",
                fontWeight: "600",
            },

        },
        "& .list-icon": {
            color: "secondary.light",
            marginRight: "20px",
            minWidth: "auto"
        },

        "& .BaseBadge-badge": {
            right: "12px",
        }
    },

    pageHeading: {
        lineHeight: "40px",
        marginLeft:{
            xs:"0",
            md:"15px"
        },
        textTransform:"capitalize",
        flexGrow:{
            xs:"1",
            md:"0"
        }
    },

    contactList: {
        flex: "1",
        overflowY: "auto",
        padding: 0,
        minHeight: "150px",
        "& .MuiListItemButton-root": {
            padding: "12px 24px",
            "&:hover": {
                background: "none",
                /* "& .list-title span":{
                    color:"primary.dark",
                }, */
            }
        },
        "& .customer-profile-image": {
            borderRadius: "100px",
        },
        "& .customer-name": {
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "23px",
            color: "secondary.dark",
        },
        "& .customer-location": {
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "20px",
            color: "secondary.main",
        },
        "& .customer-status": {
            fontSize: "0",
            width: "12px",
            height: "12px",
            borderRadius: "10px",
            position: "absolute",
            left: "48px",
            top: "18px",
            border: "3px solid #fff",
            "&.online": {
                backgroundColor: "#66CB9F",
            },
            "&.away": {
                backgroundColor: "#F16063",
            },
        },
    },
    contactHeadingSection: {
        padding: "24px",
        display: "flex",
        alignItems: "center",
        "& .contact-heading": {
            color: "secondary.main",
            fontWeight: "600",
            fontSize: "12px",
            lineHeight: "14px",
            letterSpacing: "1px",
            textTransform: "uppercase"
        },

        "& .BaseBadge-badge": {
            right: "-28px",
        },

    },
    badge: {
        "& .BaseBadge-badge": {
            fontFamily: "'Inter', sans-serif",
            color: "primary.dark",
            padding: "12px",
            borderRadius: "100px",
            fontWeight: "700",
            fontSize: "12px",
            lineHeight: "15px",
        }
    },

    divider: {
        margin: "0 24px",
        borderColor: "#EDF2F7"
    },
   
    editProfileButton: {
        backgroundColor: "#fff",
        color: "secondary.main",
        fontWeight: "600",
        lineHeight: "10px",
        fontSize:"12px",
        textTransform:"none",
        "& span":{
            marginRight:"2px"
        }
    },
    headerSection:{
        background: '#fff', 
        margin: '20px 0' , 
        justifyContent: "space-between"
    },
    editAdminProfile:{
        display:{
            xs:"block",
            md:"flex"
        },
        alignItems:"center",
    },
    adminName:{
        lineHeight: "15px",
        marginLeft: "15px",
        textTransform:"capitalize",
        alignSelf:"end",
       
    },
    userNameCharacter:{
        width:{
            xs:50,
            md:60,
        }, 
        height:{
            xs:50,
            md:60,
        },
        textTransform: "uppercase",
        fontSize:"20px",
        margin:"0 auto",
    }
}