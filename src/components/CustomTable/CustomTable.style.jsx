export const styles = {

    customTable: {
        // maxWidth:700,
        minWidth: 250,
        // minWidth: 700,
        /*  tableLayout: {
             xs: "auto",
             md: "fixed"
         }, */
        /* "fixed", */
        // tableLayout:"auto",
        "& .MuiList-root .MuiMenuItem-root": {
            color: "secondary.main"
        }
    },
    tableHeading: {
        /*  fontWeight: "700",
         fontSize: "18px", */
        lineHeight: "22px",
        /*   color: "info.main", */
        letterSpacing: "-0.005em",
        marginBottom: "20px"
    },
    tableSubHeading: {
        boxShadow: "inset 0px -1px 0px #EDF2F7",
        /*  borderBottom: "1px solid rgba(224, 224, 224, 1)", */
        "& .MuiTableCell-root": {
            padding: "18px 24px",
            borderBottom: "none",
            "& p": {
                fontWeight: "600",
                /*  fontSize: "14px", */
                lineHeight: "24px",
                color: "#1F2D3D",
                textTransform: "capitalize",
            }
        },
    },
    tableCategoryTitles: {
        boxShadow: "inset 0px -1px 0px #EDF2F7",
        background: "#FAFAFB",
        "& .MuiTableCell-root": {
            borderBottom: "none",
            padding: "18px 24px",
            fontWeight: "600",
            fontSize: "10px",
            lineHeight: "16px",
            color: "grey.light",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
        },
    },

    tableCells: {
        "& a": {
            textDecoration: "none"
        },
        "& .MuiTableCell-root": {
            borderBottom: "none",
            boxShadow: "inset 0px -1px 0px #EDF2F7",
            padding: "16px 24px",
            overflowWrap: "break-word",
            wordWrap: "break-word"
        },
    },
    projectName: {
        fontWeight: "600",
        fontSize: "12px",
        lineHeight: "20px",
        textTransform: "capitalize",
        /* padding: "16px 24px", */
        color: "info.main",
        "& a": {
            textDecoration: "none",
            color: "info.main",
        },
        "&.emp-code": {
            textTransform: "uppercase",
        }
    },
    projectTypeAndDate: {
        /*  padding: "16px 24px", */
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "20px",
        color: "secondary.dark",
        "&.emp-designation": {
            textTransform: "capitalize",
        },
    },
    projectStatus: {
        verticalAlign: "initial",
        "& .BaseBadge-badge": {
            fontWeight: "700",
            fontSize: "10px",
            lineHeight: "16px",
            fontFamily: "'Inter',sans-serif",
            color: "success.dark",
            borderRadius: "6px",
            padding: "4px 10px",
            position: "relative",
            transform: "none",
            transformOrigin: 0,
            transition: "none"
        },
    },

    showTotalNumOfRowsResult: {
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "23px",
        color: "secondary.main",
        "&.MuiTableCell-root": {
            boxShadow: "none",
            padding: "18px 24px",
        },
    },
    employeesProfileImage: {
        "& img": {
            width: "36px",
            height: "36px",
            borderRadius: "100px",
            objectFit: "cover",
        }
    },
    empNameCharacter: {
        textTransform: "uppercase",
        fontSize: "15px"
    },

    pagination: {
        "& .MuiToolbar-root": {
            minHeight: "auto",
            "& div": {
                fontSize: "14px",
                lineHeight: "23px",
                fontWeight: "500",
                color: "secondary.main",
                fontFamily: "'Inter', sans-serif ",
            },
            "& p": {
                fontSize: "14px",
                lineHeight: "23px",
                fontWeight: "500",
                color: "secondary.main",
                fontFamily: "'Inter', sans-serif ",
            }
        },
    },
    profileCreatebuttonSection: {
        justifyContent: "flex-end",
        marginBottom: "20px",
        "& a": {
            textDecoration: "none"
        }
    },
    profileCreateButton: {
        fontSize: "14px",
        lineHeight: "14px",
        fontWeight: "600",
        padding: "16px",
        borderRadius: "8px",
        textTransform: "capitalize",
        boxShadow: "none",
        backgroundColor: "primary.dark",
        color: "#fff",
    },

    menuItem: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: "400",
        fontSize: "15px",
        lineHeight: "20px",
        color: "secondary.dark"
    },
    loaderColor: {
        color: "primary.dark"
    },
    showLoader: {
        position: "absolute"
    },
    showLoaderForMenuList: {
        color: "primary.dark",
        position: "absolute"
    },
    secondaryButton: {
        marginRight:"20px",
        fontSize: "14px",
        lineHeight: "14px",
        fontWeight: "600",
        padding: "14px",
        borderRadius: "8px",
        textTransform: "capitalize",
      
        background: "#fff",
        color: "info.dark",
        borderColor: "#dfe0e5",
        "&:hover": {
            color:"#fff",
            backgroundColor: "primary.dark",
            borderColor:"primary.dark",
            boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
        }
    },
    primaryButton: {
        marginRight:"20px",

        fontSize: "14px",
        lineHeight: "14px",
        fontWeight: "600",
        padding: "14px",
        borderRadius: "8px",
        textTransform: "capitalize",
        boxShadow: "none",
        backgroundColor: "primary.dark",
        color: "#fff",
        "&.Mui-disabled": {
            // backgroundColor: "primary.dark",
            backgroundColor: "#4C6FFF",
            boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
        }
        /*  marginRight:"20px",
         marginTop:"20px" */
    },
}