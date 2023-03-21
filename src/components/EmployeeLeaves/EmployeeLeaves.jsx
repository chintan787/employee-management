import React, { useState, Fragment, useEffect } from 'react'
import { inputStyles } from '../../components/FormInput.style'
import { addAnnualLeave, getAllLeaves } from '../../Action/Admin'
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns'
import {
  Box,
  Grid,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CardContent,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Stack,
  Select,
  MenuItem,
  Tooltip,
  Fade
} from '@mui/material';
import { stylesEmpLeaves } from './EmployeeLeaves.style'
import { styles } from '../CustomTable/CustomTable.style'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomTable from '../CustomTable/CustomTable';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CustomCard from '../CustomCard/CustomCard';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import Alert from '@mui/material/Alert';
import HolidayList from './HolidayList'




export default function EmployeeLeaves(props) {

  
 
  const [submitButtonclick, setSubmitButtonClick] = useState(false);
  const [displayEvent, setDisplayEvent] = useState([])
  const [applyLeave, setApplyLeave] = useState({
    leave_type: "casual leave",
    start_date: "",
    end_date: "",
    session: "session 1",
    reason: ""
  });

  const { register, formState: { errors }, handleSubmit, watch } = useForm();

   const leaveTypes = ["casual leave", "sick leave", "maternity leave", " annual leave "]
  const sessions = ["session 1", "session 2", "Both"]
  const maxNumber = 69;
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const stringifiedUser = localStorage.getItem('user');
  const userAsObjectAgain = JSON.parse(stringifiedUser);
  const role = userAsObjectAgain?.user_role

  const dispatch = useDispatch()

 
 //employee apply for leave
 const handleApplyLeave = (event) => {
  const { value, name } = event.target
  console.log("onChange", { ...applyLeave, [name]: value })
  setApplyLeave({ ...applyLeave, [name]: value })
}






  
  /* const handleNewEvent = () =>{
      if (myEvents) {
       setOkButtonClick(true)
     } 
   } */
  const onSubmit = (data) => {
    console.log("data", data)

  };

  return (

    <>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6} sx={stylesEmpLeaves.holidayList}>
            <Stack direction="row" spacing={2} sx={stylesEmpLeaves.profileCreatebuttonSection} /* style={{ marginBottom: "20px" }} */ >
              <Typography variant='h4' sx={stylesEmpLeaves.tableHeading}>Applying for Leave</Typography>

            </Stack>
            <CustomCard>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box /* sx={styles.empInfo} */ sx={stylesEmpLeaves.applyLeaveSection}>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 3, }}>

                      <Grid item xs={12} sx={stylesEmpLeaves.infoList}>
                        <Typography className="title">Leave type*</Typography>
                        <Select
                          sx={inputStyles.formSelectInput}
                          displayEmpty
                          name="leave_type"
                          value={applyLeave.leave_type}
                          onChange={handleApplyLeave}
                          input={<OutlinedInput />}
                          {...register("leave_type", {
                            required: "Leave Type is required"
                          })}
                          MenuProps={MenuProps}
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          {/* <MenuItem value="">single </MenuItem> */}
                          {leaveTypes.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.leave_type ? <Alert severity="error"> {errors.leave_type?.message}</Alert> : ""}

                      </Grid>

                      <Grid item xs={12} md={6} sx={stylesEmpLeaves.infoList}>
                        <Typography className="title">From date*</Typography>
                        <TextField type="date" sx={inputStyles.formInput} placeholder="select start date" name="start_date" value={applyLeave?.start_date}
                          {...register("start_date", {
                            required: "From date is required"
                          })} onChange={handleApplyLeave} />
                        {errors.start_date ? <Alert severity="error"> {errors.start_date?.message}</Alert> : ""}

                      </Grid>

                      <Grid item xs={12} md={6} sx={stylesEmpLeaves.infoList}>
                        <Typography className="title">To date</Typography>
                        <TextField type="date" sx={inputStyles.formInput} placeholder="select end date" name="end_date" value={applyLeave?.end_date} onChange={handleApplyLeave} />

                      </Grid>


                      <Grid item xs={12} sx={stylesEmpLeaves.infoList}>
                        <Typography className="title">Sessions*</Typography>
                        <Select
                          sx={inputStyles.formSelectInput}
                          displayEmpty
                          name="session"
                          value={applyLeave.session}
                          onChange={handleApplyLeave}
                          input={<OutlinedInput />}
                          {...register("session", {
                            required: "Session is required"
                          })}
                          MenuProps={MenuProps}
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          {/* <MenuItem value="">single </MenuItem> */}
                          {sessions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>

                          ))}
                        </Select>
                        {errors.session ? <Alert severity="error"> {errors.session?.message}</Alert> : ""}

                      </Grid>


                      <Grid item xs={12} sx={stylesEmpLeaves.infoList}>
                        <Typography className="title" >Reason*</Typography> {/* formInput */}
                        <TextField type="text" sx={inputStyles.formInput} placeholder="enter reason" name="reason" value={applyLeave?.reason}
                          {...register("reason", {
                            required: "Reason is required"
                          })} onChange={handleApplyLeave} />
                        {errors.reason ? <Alert severity="error"> {errors.reason?.message}</Alert> : ""}

                      </Grid>
                    </Grid>

                  </Box>
                  <Stack direction="row" spacing={2} sx={stylesEmpLeaves.submitLeave} >
                    <Tooltip title="Submit" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                      <Button type="submit" disabled={role === 1 ? true : false} sx={stylesEmpLeaves.primaryButton} variant="contained" >
                        Submit
                      </Button>
                    </Tooltip>
                  </Stack>
                </form>
              </CardContent>
            </CustomCard>

          </Grid>



          <Grid item xs={12} md={6} sx={stylesEmpLeaves.holidayList} >

            <HolidayList /*  sx={stylesEmpLeaves.holidaySection} *//>

          </Grid>



        </Grid>

      </Box>

      <Box sx={inputStyles.toastContainer}>
        <ToastContainer limit={2} position="bottom-right" autoClose={2000} />
      </Box>
    </>

  )
}

