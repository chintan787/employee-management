export const styles = {
    cardContent: {
        padding: "24px"
    },
    companyInfoNew: {
        maxWidth: '650px',
        padding: '15px',
        margin: '0 auto',
        alignItems: 'flex-start',
        "& h3": {
            fontWeight: '700'
        }

    },
    salarySlipData :{
        fontSize:"12px",
    },
    boldHeading:{
        fontWeight:700,
        fontSize:"12px",
        "& .signatureLabel":{
            paddingBottom: "15px",
        }
    },
    gstNumber: {
        paddingTop: '4px',
    },
    companyLogoContainer: {
        marginTop: '7px',
        textAlign: 'right',
    },
    signatureContainer: {
        maxWidth: '650px',
        padding: '0px 15px',
        margin: '0 auto',
        textAlign: 'right'
    },
    companyInfo: {
        textAlign: "center",
        margin: "10px 0",
        "& h3": {
            fontWeight: '700'
        }
    },

    employeeDetailTable: {
        minWidth: 650,

    },
    employeeinfotextfields: {
        display: "block",
        flexGrow: "1",
        textTransform: "capitalize",
        "& .MuiInput-root ": {
            display: "block",
            "&.MuiInputBase-formControl": {

            }
        },
        "& .MuiInput-input": {
            textTransform: "capitalize",

        },
    },
    employeeInfogridItem: {
        display: "flex",
        "&.MuiGrid-item": {
            paddingTop: "2px",
            paddingLeft: "0",
            alignItems: 'end',
            "&:last-of-type": {
                // paddingLeft: "5px",
            }
        },
        "& .inputLabels": {
            textTransform: "capitalize",
            paddingRight: "5px",
            color: "#000",
            fontSize:'12px',
            fontWeight:'700'
        },
        "& label": {
            fontWeight: '700'
        }

    },
    address: {
        // maxWidth:"60%",
        // margin:"0 auto",
        fontSize: "12px",
        maxWidth: "80%",
        color: "#000",
    },
    subTitle: {
        paddingBottom: '15px',
        textAlign: 'center',
    },
    table: {
        tableLayout: "fixed",
        borderCollapse: 'initial',
        "& .MuiTableHead-root .MuiTableCell-root": {
            fontWeight: '700',
            fontSize: "14px",
            padding: "4px",
            // padding: 0,

        },
        "& .MuiTableCell-root": {
            borderLeft: "1px solid #000",
            borderTop: '1px solid #000',
            borderBottom: 'none',
            padding: "2px 4px",
            // padding: 0,
            fontSize: "12px",
            lineHeight: "20px",
            fontWeight: '500',
            color: "#000",
            "&:last-of-type": {
                borderRight: "1px solid #000",
            }
        },
        "& .MuiTableBody-root .MuiTableRow-root:last-of-type .MuiTableCell-root:last-of-type" : {
            borderRight: "none",
        },
        "& .MuiTableBody-root .MuiTableRow-root:nth-last-of-type(2) .MuiTableCell-root:nth-last-of-type(2)" : {
            borderBottom: "1px solid #000",
        },
        "& .MuiTableBody-root .MuiTableRow-root:nth-last-of-type(2) .MuiTableCell-root:last-of-type" : {
            borderBottom: "1px solid #000",
        },
        "& .MuiTableBody-root .MuiTableRow-root:last-of-type .MuiTableCell-root": {
            borderBottom: "1px solid #000",
            fontWeight: '700',
            fontSize: "12px",
            // padding:'2px 4px'
        }   

    },

    tableNew: {
        tableLayout: "fixed",
        borderCollapse: 'initial',
    
        "& .MuiTableHead-root .MuiTableCell-root": {
            fontWeight: '700',
            fontSize: "14px",
            padding: "4px ",

        },
        "& .MuiTableCell-root": {
            borderBottom: 'none',
            borderBottom: 'none',
            padding: "2px 4px",
            fontSize: "12px",
            lineHeight: "20px",
            fontWeight: '500',
            color: "#000",
        },
        "& .MuiTableBody-root .MuiTableRow-root:last-of-type .MuiTableCell-root": {
            borderBottom: "1px solid #000",
            fontWeight: '700',
            fontSize: "12px",
            padding:'2px 4px'
        },
        "& .MuiTableBody-root .MuiTableRow-root:nth-last-of-type(2) .MuiTableCell-root:nth-last-of-type(2)" : {
            borderBottom: "1px solid #000",
        },
        "& .MuiTableBody-root .MuiTableRow-root:nth-last-of-type(2) .MuiTableCell-root:last-of-type" : {
            borderBottom: "1px solid #000",
        },

        "& .MuiTableBody-root .MuiTableRow-root:nth-last-of-type(3) .MuiTableCell-root": {
            borderBottom: "1px solid #000",
            borderTop: "1px solid #000",
            fontWeight: '700',
            fontSize: "12px",
        }
    },
    wrapper: {
        backgroundColor: "#fff",
        border: "1px solid #000",
        margin: "20px 0",
        maxWidth: "670px",
        "& .MuiTypography-root.MuiTypography-body1": {
            color: "#000"
        },
        "& .MuiTypography-root": {
            color: "#000"
        }
    },
    formWrapper: {
        border: "1px solid #000",
        margin: "40px 0",
        maxWidth: "670px",
        padding: '10px',
    },
    amountDetailsgridItem: {
        display: "flex",
        "&.MuiGrid-item": {
            paddingTop: "2px",
            paddingLeft: "0",
            alignItems: 'center',
        }
    },
    amounttextfields: {
        display: "block",
        flexGrow: "1",

        "& .MuiInput-root ": {
            display: "block",
        }
    },
    amountInfoSection: {
        flexGrow: 1,
        padding: "0 24px 15px"
    },
    downloadButton: {
        fontSize: "14px",
        lineHeight: "14px",
        fontWeight: "600",
        backgroundColor: "primary.dark",
        borderRadius: "8px",
        padding: "16px",
        textTransform: "capitalize",
        height: "54px",
        alignSelf: "end",
        width: '100%'

    },
    buttonSection: {
        justifyContent: "center",
        width: '25%'
    },
    buttonGroup: {
        justifyContent: 'flex-end'
    },
    sendmailButton: {
        fontSize: "14px",
        lineHeight: "14px",
        fontWeight: "600",
        backgroundColor: "primary.dark",
        borderRadius: "8px",
        textTransform: "capitalize",
        height: "54px",
        alignSelf: "end",
        marginLeft: '10px'
    },

    inputValues: {
        textTransform: "capitalize",
        lineHeight: "14px",
        fontSize:"18px",
        width: {
            xs: "60%",
            lg: "60%",
        },
        alignSelf: "end",
        flexGrow: 1,
        "& p": {
        },

    },
    inputValuesForAmount: {
        textTransform: "capitalize",
        borderBottom: "1px solid #000",
        width: "60%",
        alignSelf: "end",
        flexGrow: 0,
        "& p": {
            lineHeight: "14px",
        }
    },
    emptyDiv: {
        minHeight: "500px",
        maxWidth: "670px",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        padding: "24px",
    },
    loaderColor: {
        color: "primary.dark"
    },
    searchEmployee: {
        width: "75%",
        marginRight: 2
    },
    searchemployeeDetails: {
        maxWidth: "670px",
        display: "flex"
    },
    amountDetailGrid: {
        margin: "0 auto",
        maxWidth: "650px",
        padding: "15px"
    },
    tableHeadingAmount: {
        // textAlign: 'right',
        backgroundColor: '#d9d7d7'

    },
    tableHeadings: {
        textAlign: 'left',
        backgroundColor: '#d9d7d7'

    },
    tableContent: {
        maxWidth: "650px",
        margin: "0 auto",
        padding: "15px",
        "& .MuiGrid-root.leaveSection": {
            margin: '10px 0px',
            alignItems: 'center ',
        }

    },
    multilineAddress: {
        border: '1px solid #000',
        marginTop: '5px',
        width: '80%',
        "& .MuiOutlinedInput-root.MuiInputBase-root ": {
            padding: '5px',
        },
        "& .MuiOutlinedInput-input": {
            fontSize: "12px",
        }
    },
    empData: {
        width: '100%',
       
        "& .MuiInput-input": {
            padding: '4px',
            width: '100%',
            fontSize:'12px',
            fontWeight:'400',
        },
    },
    leaveData: {
        width: '75%',

        "& .MuiInput-input": {
            padding: '4px',
            width: '10%',
            // fontSize:'12px',
            // fontWeight:'400'
        },
        "& .MuiOutlinedInput-input": {
            padding: '4px',
            width: '100%',
            fontSize:'12px',
            fontWeight:'400'
        },
        "& input::-webkit-outer-spin-button": {
            WebkitAppearance: 'none',
            margin: '0px'
        },
        "& input::-webkit-inner-spin-button": {
            WebkitAppearance: 'none',
            margin: '0px'
        },
        "& input[type=number]": {
            MozAppearance: 'textfield'
        },

    },
    employees: {
        padding: '5px'
    },
    allcharges: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-input:focus ": {
            outline: '1px',
            outlineColor: '#ccc',
            outlineStyle: 'solid'

        },
        "& input": {
            padding: '1px',
            // textAlign: 'right',

        },
        "& input::-webkit-outer-spin-button": {
            WebkitAppearance: 'none',
            margin: '0px'
        },
        "& input::-webkit-inner-spin-button": {
            WebkitAppearance: 'none',
            margin: '0px'
        },
        "& input[type=number]": {
            MozAppearance: 'textfield'
        },
        "&.MuiTableCell-sizeMedium.blank": {
            color: 'transparent'
        },
        "&.totalCount input": {
            fontWeight: '700'
        }
    },
    blankcell: {
        padding: '5px'
    },
    boldTableCell: {
        fontWeight: '700 !important',
        fontSize: '12px',
        lineHeight:"20px",
        borderBottom:"1px solid #000"
    },
    uploadImage: {
        maxWidth: '25%',
        margin: '0 0 0 auto',
        padding: '10px 0',
        "& .edit-button": {
            marginBottom: '10px'
        },
        "& .k-editor-content": {
            height: 'auto'
        },
        "& .k-editor-content .k-content p img": {
            width: '100%',
            height: '100%'
        }

    },
    tableCells: {
        "& .MuiTableRow-root .MuiTableCell-root:nth-of-type(even)": {
            // textAlign: 'right',
        },
        "& .MuiTableRow-root .MuiTableCell-root": {
        }
    },
    leavesCount: {
        fontSize:12
    },
    showLoaderForMail: {
        // color: "primary.light",
        color:'#fff',
        position: "absolute"
    },
    note: {
        maxWidth: '670px',
        textAlign: "center",
        fontWeight: "500",
        color: "#000",
        fontSize: "12px",
        fontFamily: "'Inter', sans-serif",
    },
    slipDatecontainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    lastLebel: {
        paddingLeft: "5px"
    },


}

