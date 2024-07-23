import React, { useEffect, useState } from 'react'
import { getEmployees, getEmployee } from '../../Action/Employees'
import { deleteEmployee, deleteEmployeeByStatus } from '../../Action/Admin'
import { useSelector, useDispatch } from 'react-redux';
import {
  TableBody,
  TableCell,
  TableRow,
  Avatar,
  MenuItem,
  Box,
  CircularProgress,

} from '@mui/material';
import { styles } from '../CustomTable/CustomTable.style';
import { inputStyles } from '../FormInput.style';
import { Link, useNavigate } from 'react-router-dom';
import CustomTable from '../CustomTable/CustomTable';
import CustomMenu from '../CustomMenu/CustomMenu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dateFormat, { masks } from "dateformat";
import { QrCodeScannerOutlined } from '@mui/icons-material';



export default function EmployeesTable(props) {
  const [searchedVal, setSearchedVal] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteButtonClick, setDeleteButtonClick] = useState(false)
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [emp_Code, setEmpcode] = useState();
  const [sortedData, setSortedData] = useState();
  const [currentEmpCount, setCurrentEmpCount] = useState();
  const [activeTabValue, setActiveTabValue] = useState(1);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const tableheadings = ['Profile Image', 'Employee Code', 'Employee Name', 'Designation', 'Email Id', 'Mobile Number', 'Date Of Joining', '']
  const ITEM_HEIGHT = 48;
  const options = [
    'Edit',
    'Delete',
  ];

  const dispatch = useDispatch()
  //get employees
  const empData = useSelector(
    (state) => state.EmployeesReducer?.employees
  );
  //delete by status
  const deleteEmpStatus = useSelector((state) => state.DeleteEmployeebyStatusReducer?.inactive)
  // delete 
  const deleteEmpData = useSelector(
    (state) => state.DeleteEmployeeReducer?.deleteEmp
  );
  //get employee
  const empProfileData = useSelector(
    (state) => state.EmployeeReducer?.employee
  );
  useEffect(() => {
    dispatch(getEmployees(setLoading, navigate))
  }, []);


  function customSort(a, b) {
    var numA = parseInt(a.emp_code?.match(/\d+/)[0]);
    var numB = parseInt(b.emp_code?.match(/\d+/)[0]);
    if (numA === numB) {
      var charA = a.emp_code.replace(/\d+/g, "");
      var charB = b.emp_code.replace(/\d+/g, "");
      return charB.localeCompare(charA);
    } else {
      return numB - numA;
    }
  }


  useEffect(() => {
    if (empData.length > 0) {
      empData.sort(customSort);
      console.log("activeTabValue", activeTabValue)
      const finalResult = empData.filter((emp) => emp.emp_status === activeTabValue)
      setSortedData(finalResult);
      const currentEmp = empData.filter((emp) => emp.emp_status === 1)
      setCurrentEmpCount(currentEmp.length)
    }
  }, [empData])


  useEffect(() => {
    empData.sort(customSort);
    const finalResult = empData.filter((emp) => emp.emp_status === activeTabValue)
    setSortedData(finalResult);
  }, [activeTabValue])



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  }

  function handleSearchValues(e) {
    setSearchedVal(e.target.value)
  }

  const filtered = sortedData?.filter((row) =>
    !searchedVal.length || row.emp_first_name
      .toString()
      .toLowerCase()
      .includes(searchedVal.toString().toLowerCase()) ||
    row.emp_last_name.toString()
      .toLowerCase()
      .includes(searchedVal.toString().toLowerCase())
  )

  function getMenuId(e) {
    setAnchorEl(e.currentTarget);
    setEmpcode(e.currentTarget.id);

  }
  const handleClose = (e) => {
    setAnchorEl(null)
  }


  const handleMenuList = (e) => {

    const name = e.target.innerText
    if (name === "Edit") {
      setShowLoader(true)
      navigate(`/employees/profile/${emp_Code}`)
    }
    if (name === "Delete") {
      dispatch(getEmployee(emp_Code, setLoading, navigate))
      setShowLoader(true);
    }
  }

  useEffect(() => {
    if (empProfileData) {
      if (emp_Code) {
        console.log("active", activeTabValue)
        if (empProfileData.emp_status !== 0) {
          dispatch(deleteEmployeeByStatus(emp_Code, setShowLoader, navigate, setAnchorEl));


        }
        else {
          dispatch(deleteEmployee(emp_Code, setShowLoader, navigate, setAnchorEl))
          setShowLoader(false);
          // toast("The employee status is already set to 0")
          handleClose();
          // dispatch(getEmployees(setLoading, navigate))
        }
      }
    }
  }, [empProfileData])

  useEffect(() => {
    console.log("deleteEmpData", deleteEmpData)
    if (deleteEmpData?.acknowledged === true) {
      dispatch(getEmployees(setLoading, navigate))
    }
  }, [deleteEmpData])
  useEffect(() => {
    console.log("deleteEmpStatus", deleteEmpStatus)
    if (deleteEmpStatus?.status === 200) {
      dispatch(getEmployees(setLoading, navigate))
    }
  }, [deleteEmpStatus])

  return (

    <>
      <CustomTable subHeading={`current Employess (${currentEmpCount})`} subHeading2={`previous Employess (${empData?.length - currentEmpCount})`} tableHeadingList={tableheadings} rows={empData?.length} /* data={empData} */ tableTitle={props.tableTitle} searchedVal={searchedVal} setSearchedVal={setSearchedVal} handleSearchValues={handleSearchValues}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        layout="fixed"
        showButton={true}
        activeTabValue={activeTabValue}
        setActiveTabValue={setActiveTabValue}
      >

        <TableBody sx={styles.tableCells}>
          {loading ? <TableRow><TableCell colSpan={tableheadings?.length} style={{ textAlign: "center" }}> <CircularProgress sx={styles.loaderColor} /> </TableCell></TableRow> :
            sortedData?.length !== 0 && sortedData !== undefined ?
              filtered?.length !== 0 ?
                filtered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(emp =>

                    <TableRow
                      key={emp?.emp_code}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell component={Link} to={`/employees/profile/${emp?.emp_code}`} sx={styles.employeesProfileImage} >
                        <Avatar sx={styles.empNameCharacter} src={emp?.emp_image_name}>
                          {emp?.emp_first_name.charAt(0)}{emp?.emp_last_name.charAt(0)}
                        </Avatar>
                      </TableCell>
                      <TableCell component={Link} to={`/employees/profile/${emp?.emp_code}`} sx={styles.projectName} className="emp-code" > {emp?.emp_code ? emp?.emp_code : "-"}</TableCell>
                      <TableCell component={Link} to={`/employees/profile/${emp?.emp_code}`} sx={styles.projectName}>
                        {emp?.emp_first_name} {emp?.emp_last_name}
                      </TableCell>
                      <TableCell component={Link} to={`/employees/profile/${emp?.emp_code}`} sx={styles.projectTypeAndDate} className="emp-designation">{emp?.emp_designation ? emp.emp_designation : "-"}</TableCell>
                      <TableCell component={Link} to={`/employees/profile/${emp?.emp_code}`} sx={styles.projectTypeAndDate}>{emp?.emp_email ? emp?.emp_email : "-"}</TableCell>
                      <TableCell component={Link} to={`/employees/profile/${emp?.emp_code}`} sx={styles.projectTypeAndDate}>{emp?.emp_mo_no ? emp?.emp_mo_no : "-"}</TableCell>
                      <TableCell component={Link} to={`/employees/profile/${emp?.emp_code}`} sx={styles.projectTypeAndDate}>{emp?.emp_joining_date ? dateFormat(emp?.emp_joining_date, 'dd-mm-yyyy') : "-"}</TableCell>

                      <TableCell>
                        <CustomMenu id={emp?.emp_code} getMenuId={getMenuId} open={open} anchorEl={anchorEl} handleClose={handleClose} setAnchorEl={setAnchorEl}>
                          <MenuItem name="Edit" onClick={handleMenuList} sx={styles.menuItem}>Edit </MenuItem>
                          <MenuItem name="Delete" disabled={showLoader ? true : false} style={{ color: showLoader ? "transparent" : "#425466" }} onClick={handleMenuList} sx={styles.menuItem}>Delete {showLoader ? <CircularProgress size={20} sx={styles.showLoaderForMenuList} /> : ""}</MenuItem>

                        </CustomMenu>
                      </TableCell>
                    </TableRow>

                  ) : <TableCell colSpan={tableheadings?.length} sx={{ textAlign: "center" }}>No data found</TableCell>
              : <TableCell colSpan={tableheadings?.length} sx={{ textAlign: "center", width: "100%" }}>No data found</TableCell>
          }

        </TableBody>
      </CustomTable>

      <Box sx={inputStyles.toastContainer}>
        <ToastContainer limit={2} position="bottom-right" autoClose={2000} />
      </Box>


    </>
  )

}
