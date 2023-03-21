export const styles = {
    cardContent:{
        padding:"24px"
    },
    companyInfo:{
        textAlign:"center",
        margin:"10px 0"
    },
   
    employeeDetailTable:{
        minWidth: 650,
        
    },
    employeeinfotextfields:{
        display:"block",
        flexGrow: "1",
        textTransform: "capitalize",
        "& .MuiInput-root ":{
            display:"block",
            "&.MuiInputBase-formControl":{
               
            }
        },
        "& .MuiInput-input":{
        textTransform: "capitalize",

        },
        /* "& .MuiInput-input.MuiInputBase-input div":{
            textTransform: "capitalize",
        } */
    },
    employeeInfogridItem:{
        display:"flex",
        "&.MuiGrid-item":{
            paddingTop:"2px",
            paddingLeft:"0",
            alignItems: 'center',
            "&:last-of-type":{
                paddingLeft:"5px",
            }
        },
        "& .inputLabels":{
            textTransform:"capitalize",
            paddingRight:"5px"
        }
    },
    address:{
        maxWidth:"60%",
        margin:"0 auto",
        fontSize:"12px",
       
    },
    table:{
        tableLayout: "fixed",
      /*  maxWidth:"650px",
       margin:"0 auto",
       padding:"15px", */
        borderCollapse: 'initial',
        "& .MuiTableHead-root .MuiTableCell-root":{
            fontWeight:'700',
            fontSize: "14px",
            padding:"4px 5px",
           
        },
        "& .MuiTableCell-root":{
            borderLeft:"1px solid #000",
            borderTop:'1px solid #000',
            padding:"2px 5px",
            fontSize:"12px",
            lineHeight:"12px",
            fontWeight:'500',
            "&:last-of-type":{
                borderRight:"1px solid #000",
            }
        },
      "& .MuiTableBody-root .MuiTableRow-root:last-of-type .MuiTableCell-root":{
        borderBottom:"1px solid #000",
        fontWeight:'700',
        fontSize: "12px",
        // padding:"0",
        padding:"4px 5px",
      }
    },
    wrapper:{
         backgroundColor:"#dbe5f1",
         border:"1px solid #000",
         margin:"40px 0",
         maxWidth:"670px",
    },
    amountDetailsgridItem:{
        display:"flex",
        "&.MuiGrid-item":{
            paddingTop:"2px",
            paddingLeft:"0",
            alignItems: 'center',
            /* "&:nth-of-type(odd)":{
                paddingRight:2
            }, */
        }
    },
    amounttextfields:{
        display:"block",
        flexGrow: "1",
       
        "& .MuiInput-root ":{
            display:"block",
        }
    },
    amountInfoSection:{
         flexGrow: 1 ,
         padding:"0 24px 15px"
    },
    downloadButton: {
        fontSize: "14px",
        lineHeight: "14px",
        fontWeight: "600",
        backgroundColor: "primary.dark",
        borderRadius: "8px",
        color: "#fff",
        padding: "16px",
        textTransform: "capitalize",
        height: "54px",
        alignSelf:"end"

    },
    buttonSection:{
        justifyContent: "center",
        // maxWidth: "670px",
    },
    inputValues:{
        textTransform: "capitalize",
        borderBottom:"1px solid #000" , 
        lineHeight:"14px",
        width:{
            xs:"60%",
            lg:"70%",
        },
        alignSelf: "end",
        flexGrow: 1,
        "& p":{
            lineHeight:"14px",
        }
    },
    inputValuesForAmount:{
        textTransform: "capitalize",
        borderBottom:"1px solid #000" , 
        width:"60%",
        alignSelf: "end",
        flexGrow: 0,
        "& p":{
            lineHeight:"14px",
        }
    },
    emptyDiv:{
        minHeight: "500px",
        maxWidth:"670px",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        padding:"24px",
    },
    loaderColor:{
        color:"primary.dark"
    },
    searchEmployee:{
        width:"100%",
        marginRight:2
    },
    searchemployeeDetails:{
        maxWidth:"670px",
        display:"flex"
    },
    amountDetailGrid:{
        maxWidth:"80%",
        margin:"0 auto"
    },
    tableHeading:{
        fontWeight: "700"
    },
    tableContent:{
        maxWidth:"650px",
        margin:"0 auto", 
        padding:"15px",

    },
  
} 