export const stylesEmpLeaves = {
    calendarStyling: {
        // .rbc-month-view .rbc-row-content
        "& .rbc-calendar .rbc-event": {
            backgroundColor: "primary.dark"
        },
        "& .rbc-calendar .rbc-event .rbc-event-content": {
            fontSize: "14px",
            fontWeight: "500",
        },
        "& .rbc-calendar .rbc-button-link": {
            color: "info.main"
        },
        "& .rbc-calendar .rbc-button-link.rbc-show-more": {
            color: "primary.dark"
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
        "&.Mui-disabled": {
            backgroundColor: "primary.dark",
        },
        "&:hover": {
            backgroundColor: "primary.dark",
            boxShadow: " 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"

            // color: "#fff",
        }
    },
    dilogSection: {
        //  width:"30%"
        "& .MuiDialog-container .MuiPaper-root": {
            minWidth: "30%"
        },
        "& .MuiDialog-container .MuiDialogActions-root":{
            padding:"5px 24px 24px"
        }
    },
    profileCreatebuttonSection:{
        justifyContent: "space-between",
        alignItems: "center",
        minHeight:"50px",
        marginBottom:2,

    
    },
    tableHeading:{
        paddingLeft:1
    },
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
    holidayList:{
      marginTop:{
        xs:"20px",
        md:"0"
      },
        "& .MuiTable-root":{
            tableLayout:" auto"
        }
    },
    
    closeButton:{
    padding:0,
    // width: "45px",
    alignSelf: "center"
    },
    submitLeave:{
         justifyContent: "center", margin: "30px 0 0px" 
    },
    applyLeaveSection:{
        padding:3
    },
    eventLebals:{
        color: "secondary.main",
        fontWeight: "700",
        fontSize: "12px",
        lineHeight: "15px",
        textTransform: "capitalize",
        marginTop:"10px"
    },
    
   
}