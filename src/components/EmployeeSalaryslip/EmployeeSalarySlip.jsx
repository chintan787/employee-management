import React, { useEffect, useState } from 'react'
import { getEmployees } from '../../Action/Employees'
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  CircularProgress,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack
} from '@mui/material';
import AutoComplete from '../SearchBar/AutoComplete';
import { styles } from './EmployeeSalarySlip.style';
import { inputStyles } from '../FormInput.style'
import GetAppIcon from '@mui/icons-material/GetApp';
import { PDFExport } from "@progress/kendo-react-pdf";
import "./styles.css";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EmployeeSalarySlip() {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);


  // const ref = React.createRef();
  const pdfExportComponent = React.useRef(null);
  const dispatch = useDispatch()
  
  const empData = useSelector(
    (state) => state.EmployeesReducer?.employees
  );

  useEffect(() => {
    dispatch(getEmployees(setLoading))
  }, [])

  useEffect(() => {
    console.log("empData", empData)
  }, [empData])

  function createData(earnings, amount, deduction, deducationamount) {
    return { earnings, amount, deduction, deducationamount };
  }

  const rows = [
    createData('Basic & DA', '15900.00', 'Persnoal Telephone Charges', '240.00'),
    createData('HRA', '2370.00', 'Other/Miscellaneous Charges', '370.00'),
    createData('Conveyance', '262.00', "", "-"),
    createData('', '', '', '-'),
    createData('', '', '', '-'),
    createData('', '', '', '-'),
    createData('Total Addition', '18532.00', 'Total Deduction', '610.00'),
    createData('', '', 'Total Amount (Rs.)', "17922.00"),

    // createData('', '', 'NET Salary', "17922.00"),
  ];

  let fullname, designation
  if (value !== null) {
    console.log("value employee", value.emp_first_name)
    fullname = value.emp_first_name + " " + value.emp_last_name
    designation = value.emp_designation
    console.log("full anme", fullname)
  }
  console.log("value employee", value)

 
  const exportPDFWithComponent = () => {
    if (value !== null) {
      if (pdfExportComponent.current) {
        pdfExportComponent.current.save();
      }
    }
    else{
      toast("Please Select Employee")
    }
    
  };

  

  return (
    <>
    <Box>
      {loading ? <Box sx={styles.emptyDiv}><CircularProgress sx={styles.loaderColor} /> </Box> :
        <>
          <Box sx={styles.searchemployeeDetails}>
            <Box sx={styles.searchEmployee}>
              <AutoComplete empData={empData} value={value} setValue={setValue} />
            </Box>
            <Stack direction="row" sx={styles.buttonSection}>
             <Button sx={styles.downloadButton} variant="contained" onClick={exportPDFWithComponent} startIcon={<GetAppIcon />}>
                Download
              </Button>
            </Stack>
          </Box>

          <PDFExport
              ref={pdfExportComponent}
              scale={0.8}
              paperSize="A4"
              margin="1cm"
              fileName="employee_salary_slip"
            >
          <Box sx={styles.wrapper} >

              <Box sx={styles.companyInfo}>
                <Typography variant='h3'>Stroke Infotech </Typography>
                <Typography sx={styles.address}>217, Silver Square Complex, opp. Dipak School, Sanidhya Park, Nikol, Ahmedabad, Gujarat 382350 </Typography>
                <Typography variant='h5'>Salary Slip</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} item sx={styles.amountDetailGrid} /* xs={8} style={{ margin: "0 auto" }} */ >
                  <Grid item xs={12} sx={styles.employeeInfogridItem}>
                    <label className='inputLabels'>Employee Name :</label>
                    <Box sx={styles.inputValues} ><Typography>{fullname ? fullname : ""} </Typography></Box>
                    {/* <TextField disabled type="text" name="emp_name" value={fullname ? fullname : ""} variant="standard" sx={styles.employeeinfotextfields} /> */}
                  </Grid>
                  <Grid item xs={12} sx={styles.employeeInfogridItem}>
                    <label className='inputLabels'>Designation :</label>
                    <Box sx={styles.inputValues} ><Typography>{designation ? designation : ""}</Typography></Box>
                    {/* <TextField disabled type="text" name="emp_name" value={designation ? designation : ""} variant="standard" sx={styles.employeeinfotextfields} /> */}
                  </Grid>

                  <Grid item xs={12} md={6} sx={styles.employeeInfogridItem}>
                    <label className='inputLabels'>Month :</label>
                    <Box sx={styles.inputValues} ><Typography></Typography></Box>
                    {/* <TextField disabled type="text" name="month" variant="standard" sx={styles.employeeinfotextfields} /> */}
                  </Grid>
                  <Grid item xs={12} md={6} sx={styles.employeeInfogridItem}>
                    <label className='inputLabels'>year :</label>
                    <Box sx={styles.inputValues} ><Typography> </Typography></Box>
                    {/* <TextField disabled type="text" name="year" variant="standard" sx={styles.employeeinfotextfields} /> */}
                  </Grid>
                </Grid>
              </Box>

            <Box sx={styles.tableContent} >
              <TableContainer /* component={Paper} */>
                <Table sx={styles.table} aria-label="simple table"  >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={styles.tableHeading}>Earnings</TableCell>
                      <TableCell sx={styles.tableHeading}> </TableCell>
                      <TableCell sx={styles.tableHeading}>Deduction</TableCell>
                      <TableCell sx={styles.tableHeading}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.earnings}{ } </TableCell>
                        <TableCell align="right">{row.amount} </TableCell>
                        <TableCell>{row.deduction} </TableCell>
                        <TableCell align="right" >{row.deducationamount} </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </Box>
              <Box sx={styles.amountInfoSection}>
                <Typography variant='h5'>(Total Amount)</Typography>
                <Grid container spacing={2} item xs={12} style={{ margin: "0 auto" }} >
                  <Grid item xs={12} md={6} sx={styles.amountDetailsgridItem}>
                    <label className='inputLabels'>Cheque No :</label>
                    <Box sx={styles.inputValuesForAmount} ><Typography> </Typography></Box>
                    {/* <TextField type="text" name="emp_name" variant="standard" sx={styles.amounttextfields} /> */}
                  </Grid>
                  <Grid item xs={12} md={6} sx={styles.amountDetailsgridItem}>
                    <label className='inputLabels'>Name Of Bank :</label>
                    <Box sx={styles.inputValuesForAmount} ><Typography> </Typography></Box>
                    {/* <TextField type="text" name="emp_name" variant="standard" sx={styles.amounttextfields} /> */}
                  </Grid>

                  <Grid item xs={12} md={6} sx={styles.amountDetailsgridItem}>
                    <label className='inputLabels'>Date :</label>
                    <Box sx={styles.inputValuesForAmount} ><Typography> </Typography></Box>
                    {/* <TextField type="text" name="month" variant="standard" sx={styles.amounttextfields} /> */}
                  </Grid>

                </Grid>
              </Box>

              
          </Box>
          </PDFExport>
          


        </>
      }
       <Box sx={inputStyles.toastContainer}>
        <ToastContainer position="bottom-right" autoClose={10000} />
      </Box>
</Box>
    </>
  )
}
