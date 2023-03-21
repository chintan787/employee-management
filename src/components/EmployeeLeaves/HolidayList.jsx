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

    Button,

    TableBody,

    TableCell,
    TableRow,
    Typography,
    Stack,

} from '@mui/material';
import { stylesEmpLeaves } from './EmployeeLeaves.style'
import { styles } from '../CustomTable/CustomTable.style'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomTable from '../CustomTable/CustomTable';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CustomCard from '../CustomCard/CustomCard';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import Alert from '@mui/material/Alert';


export default function HolidayList() {
    const [myEvents, setEvents] = useState({
        "title": "",
        "start": "",
        "end": ""
    })
    const [open, setOpen] = useState(false);
    const [okButtonClick, setOkButtonClick] = useState(false);
    // const [displayEvent, setDisplayEvent] = useState([])


    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const tableheadings = ['Holiday', 'Observance Date', 'Day of Week ']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dispatch = useDispatch()
    const stringifiedUser = localStorage.getItem('user');
    const userAsObjectAgain = JSON.parse(stringifiedUser);
    const role = userAsObjectAgain?.user_role

    const handleDialog = () => {
        setOpen(true)
    }
    const handleClose = () => {
        console.log("myevents", myEvents)
        setOpen(false);
        setEvents({})
    }

    /* if (myEvents) {
        console.log("myevents start", myEvents.start)
        const startEvent = new Date(myEvents.start);
        const endEvent = new Date(myEvents.end);

        const startDayOfWeek = days[startEvent.getDay()];
        const endDayOfWeek = days[endEvent.getDay()];

        const startDate = startEvent.getDate();
        const endDate = endEvent.getDate();

        const month = monthNames[startEvent.getMonth()];
        const year = startEvent.getFullYear();

        if (startDate !== endDate) {
            const dateNew = month + "," + startDate + " & " + endDate + "," + year
            const dayOfWeek = startDayOfWeek + " to " + endDayOfWeek
            setDisplayEvent({ "title": myEvents.title, "date": dateNew, "dayOfWeek": dayOfWeek })
        }
        else {
            const dateNew = month + "," + startDate + "," + year
            console.log("date", dateNew)
            setDisplayEvent({ "title": myEvents.title, "date": dateNew, "dayOfWeek": startDayOfWeek })
        }
*/            //   setOkButtonClick(true)


    //get all leaves
    const holidays = useSelector(
        (state) => state.GetLeavesReducer?.getleaves
    );
    useEffect(() => {
        dispatch(getAllLeaves())
    }, [])

    useEffect(() => {
        if (holidays.length !== 0) {
            // setGetData(holidays)
        }
    }, [holidays])

    // admin create leave
    const annualLeaves = useSelector(
        (state) => state.AddLeaveReducer?.addleave
    );
    useEffect(() => {
        console.log("leave", myEvents)
        if (okButtonClick) {
            dispatch(addAnnualLeave(myEvents))
        }
    }, [okButtonClick])

    useEffect(() => {
        console.log("annualLeaves", annualLeaves);
        if (okButtonClick) {
            if (annualLeaves.length !== 0) {
                setOpen(false)
                // setEvents()
                setTimeout(() => {
                    toast("Holiday Inserted Successfully");
                }, [1000])

            }
            setOkButtonClick(false);
        }
    }, [annualLeaves])

    //admin add holiday
    const handleAddHoliday = (e) => {
        const { name, value } = e.target
        console.log("onChange", { ...myEvents, [name]: value })
        setEvents({ ...myEvents, [name]: value })
    }
    const onSubmit = (data) => {
        console.log("data", data)
        console.log("myevent", myEvents)
        if (myEvents.end === "") {
            console.log("change", { ...myEvents, "end": myEvents.start })
            setEvents({ ...myEvents, "end": myEvents.start })
        }
        setOkButtonClick(true)
    };

    //filter and sorting
    const d = new Date();
    let year = d.getFullYear();
    const filtered = holidays.filter((y) => new Date(y.start).getFullYear() === year);
    const sortedCars1 = holidays.sort((a, b) => new Date(...a.start.split('-').sort()) - new Date(...b.start.split('-').sort()));


    return (
        <>
            <Stack direction="row" spacing={2} sx={stylesEmpLeaves.profileCreatebuttonSection}>
                <Typography variant='h4' sx={stylesEmpLeaves.tableHeading}> Holiday List</Typography>
                {/* {role === 1 ?  */}
                <Button sx={styles.profileCreateButton} className='buttons createButton' variant="contained" endIcon={<AddOutlinedIcon />} onClick={handleDialog}>
                    create
                </Button>
                {/* : ""}  */}

            </Stack>

            <CustomTable tableHeadingList={tableheadings} rows={holidays.length} >

                <TableBody sx={styles.tableCells}>
                    {
                        holidays.length !== 0 ?
                            holidays.filter((y) => new Date(y.start).getFullYear() === year)
                                .map(event => (
                                    <TableRow
                                        key={event.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell sx={styles.projectTypeAndDate} className="emp-designation"> {event?.title}</TableCell>
                                        {event.start !== event.end ?
                                            <TableCell sx={styles.projectTypeAndDate}>
                                                {monthNames[new Date(event.start).getMonth()]} {new Date(event.start).getDate()} to {new Date(event.end).getDate()}, {new Date(event.start).getFullYear()}

                                            </TableCell>
                                            : <TableCell sx={styles.projectTypeAndDate}>
                                                {monthNames[new Date(event.start).getMonth()]} {new Date(event.start).getDate()}, {new Date(event.start).getFullYear()}
                                            </TableCell>}

                                        {event.start !== event.end ?
                                            <TableCell sx={styles.projectTypeAndDate} >
                                                {days[new Date(event.start).getDay()]} to {days[new Date(event.end).getDay()]}
                                            </TableCell>
                                            : <TableCell sx={styles.projectTypeAndDate} >
                                                {days[new Date(event.end).getDay()]}
                                            </TableCell>}
                                    </TableRow>

                                )
                                ) : <TableCell colSpan={tableheadings.length} sx={{ textAlign: "center" }}>No data found</TableCell>
                    }

                </TableBody>

            </CustomTable>

            <Dialog open={open} onClose={handleClose} sx={stylesEmpLeaves.dilogSection}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogContent>
                        <Stack direction="row" spacing={2} sx={stylesEmpLeaves.profileCreatebuttonSection}>
                            <Typography variant='h4' >
                                New Event
                            </Typography>
                            <IconButton sx={stylesEmpLeaves.closeButton} onClick={handleClose}><CloseIcon /></IconButton>
                        </Stack>

                        <Typography sx={stylesEmpLeaves.eventLebals}>event Name*</Typography>
                        <TextField autoFocus margin="dense" sx={inputStyles.formInput} id="name" name="title" value={myEvents.title ? myEvents.title : ""}
                            type="text" fullWidth variant="outlined" placeholder='Enter Event Name'
                            {...register("title", {
                                required: "Event name is required", pattern: {
                                    value: /^[A-Za-z\s-_]+$/,
                                    message: "Please Enter valid Event Name"
                                }
                            })}
                            onChange={handleAddHoliday}
                        />
                        {errors.title ? <Alert severity="error"> {errors.title?.message}</Alert> : ""}

                        <Typography sx={stylesEmpLeaves.eventLebals}>start date*</Typography>

                        <TextField
                            autoFocus
                            margin="dense"
                            value={myEvents.start ? myEvents.start : ""}
                            sx={inputStyles.formInput}
                            id="start"
                            name="start"
                            // value={myEvents ? myEvents.title : ""}
                            type="date"
                            fullWidth
                            variant="outlined"
                            {...register("start", {
                                required: "Start date is required"
                            })}
                            onChange={handleAddHoliday}
                        />
                        {errors.start ? <Alert severity="error"> {errors.start?.message}</Alert> : ""}

                        <Typography sx={stylesEmpLeaves.eventLebals}>end date</Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            sx={inputStyles.formInput}
                            id="end"
                            name="end"
                            value={myEvents.end ? myEvents.end : myEvents.start}
                            type="date"
                            fullWidth
                            variant="outlined"
                            onChange={handleAddHoliday}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit"  /* onClick={handleNewEvent} */ sx={stylesEmpLeaves.primaryButton}>ok</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}
