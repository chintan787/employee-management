import React, { useEffect, useState } from 'react'
import { getEmployees } from '../../Action/Employees'
import { deleteEmployee } from '../../Action/Admin'
import { useSelector, useDispatch } from 'react-redux';
import {
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Avatar,
  MenuItem,
  Box,
  CircularProgress,
  /*  Badge, */
  TablePagination,
} from '@mui/material';
import { styles } from '../CustomTable/CustomTable.style';
import {inputStyles} from '../FormInput.style';
import { Link, useNavigate } from 'react-router-dom';
import CustomTable from '../CustomTable/CustomTable';
// import EmployeeTableMenu from './EmployeeTableMenu';
import CustomMenu from '../CustomMenu/CustomMenu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
 */



export default function EmployeesTable(props) {
  const [searchedVal, setSearchedVal] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState();
  const [deleteButtonClick, setDeleteButtonClick] = useState(false)
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false)


  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const tableheadings = ['Profile Image', 'Employee Code', 'Employee Name', 'Designation', 'Email Id', 'Mobile Number', 'Date Of Joining', '']
  const ITEM_HEIGHT = 48;
  const options = [
    'Edit',
    'Delete',

  ];

  const dispatch = useDispatch()

  const empData = useSelector(
    (state) => state.EmployeesReducer?.employees
  );

  useEffect(() => {
    dispatch(getEmployees(setLoading))
  }, [])

  useEffect(() => {
  
  }, [empData])

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

  

  const filtered = empData.filter((row) =>
    !searchedVal.length || row.emp_first_name
      .toString()
      .toLowerCase()
      .includes(searchedVal.toString().toLowerCase()) || row.emp_last_name.toString()
        .toLowerCase()
        .includes(searchedVal.toString().toLowerCase())
  )

  function getMenuId(e) {
    setAnchorEl(e.currentTarget);
    setMenuId(e.currentTarget.id);
  }
  const handleClose = (e) => {
    setAnchorEl(null)
  }

  /* const handleOption = (e) => {
    console.log(e.target.innerText)
    console.log("menuId", menuId);
    const op = e.target.innerText.toLowerCase()
    
    if (op === "edit") {
      
      navigate(`/employees/profile/${menuId}`)
      console.log("if call", op)
    }
    if (op === "delete") {
     
      setDeleteButtonClick(true);
      console.log("if call", op)
    }

  } */
  const handleMenuList = (e) => {

    const name = e.target.innerText
    console.log("value", name);
    if (name === "Edit") {
      setShowLoader(true)
      navigate(`/employees/profile/${menuId}`)
     
    }
    if (name === "Delete") {
      setShowLoader(true)
      setDeleteButtonClick(true);
    }
  }

  // delete 
  const deleteEmpData = useSelector(
    (state) => state.DeleteEmployeeReducer?.deleteEmp
  );
  useEffect(() => {
    if (deleteButtonClick) {
      dispatch(deleteEmployee(menuId, setShowLoader))
    }
  }, [deleteButtonClick])

  useEffect(() => {
    if (deleteEmpData.acknowledged !== undefined) {
      if (deleteEmpData.acknowledged) {
        setTimeout(()=>{
        dispatch(getEmployees(setLoading))
      },[1000])
        setTimeout(()=>{
          toast("Data Delete Successfully");
        },[2500])
        setAnchorEl(null);
      }
    }
    else {
      setAnchorEl(null);
    }
  }, [deleteEmpData])

  return (

    <>
      <CustomTable subHeading={`all Employess (${empData.length})`} tableHeadingList={tableheadings} rows={empData.length} /* data={empData} */ tableTitle={props.tableTitle} searchedVal={searchedVal} setSearchedVal={setSearchedVal} handleSearchValues={handleSearchValues}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        layout="fixed"
        >

        <TableBody sx={styles.tableCells}>
          {loading ? <TableRow><TableCell colSpan={tableheadings.length} style={{ textAlign: "center" }}> <CircularProgress sx={styles.loaderColor} /> </TableCell></TableRow> :
            empData.length !== 0 ?
              filtered.length !== 0 ?
                filtered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(emp =>

                    <TableRow
                      key={emp.emp_code}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell component={Link} to={`/employees/profile/${emp.emp_code}`} sx={styles.employeesProfileImage} >
                        <Avatar sx={styles.empNameCharacter} src={emp.emp_image_name}>
                          {emp?.emp_first_name.charAt(0)}{emp?.emp_last_name.charAt(0)}
                        </Avatar>
                      </TableCell>
                      <TableCell component={Link} to={`/employees/profile/${emp.emp_code}`} sx={styles.projectName} className="emp-code" > {emp.emp_code ? emp.emp_code : "-"}</TableCell>
                      <TableCell component={Link} to={`/employees/profile/${emp.emp_code}`} sx={styles.projectName}>
                        {emp?.emp_first_name} {emp?.emp_last_name}
                      </TableCell>
                      <TableCell component={Link} to={`/employees/profile/${emp.emp_code}`} sx={styles.projectTypeAndDate} className="emp-designation">{emp.emp_designation ? emp.emp_designation : "-"}</TableCell>
                      <TableCell component={Link} to={`/employees/profile/${emp.emp_code}`} sx={styles.projectTypeAndDate}>{emp.emp_email ? emp.emp_email : "-"}</TableCell>
                      <TableCell component={Link} to={`/employees/profile/${emp.emp_code}`} sx={styles.projectTypeAndDate}>{emp.emp_mo_no ? emp.emp_mo_no : "-"}</TableCell>
                      <TableCell component={Link} to={`/employees/profile/${emp.emp_code}`} sx={styles.projectTypeAndDate}>{emp.emp_joining_date ? emp.emp_joining_date : "-"}</TableCell>
                      {/* <TableCell><CustomMenu id={emp.emp_code} getMenuId={getMenuId} /></TableCell> */}
                      <TableCell>
                        <CustomMenu id={emp.emp_code} getMenuId={getMenuId} open={open} anchorEl={anchorEl} handleClose={handleClose} setAnchorEl={setAnchorEl}>
                          <MenuItem name="Edit" onClick={handleMenuList} sx={styles.menuItem}>Edit </MenuItem>
                          <MenuItem name="Delete" disabled={showLoader ? true : false} style={{ color: showLoader ? "transparent" : "#425466" }} onClick={handleMenuList} sx={styles.menuItem}>Delete {showLoader ? <CircularProgress size={20} sx={styles.showLoaderForMenuList} /> : ""}</MenuItem>
                          {/*   {options.map((option) => (
                            <MenuItem  disabled={showLoader ? true : false} style={{color : showLoader ? "transparent" : "#425466"}}    sx={styles.menuItem} key={option} value={option} onClick={handleOption}     >
                    
                              {option}
                              {option === "Delete" ? showLoader ? <CircularProgress size={20} sx={styles.showLoaderForMenuList} /> : "" : ""}
                            </MenuItem>
                          ))} */}
                          {/*  </Menu> */}
                        </CustomMenu>
                      </TableCell>
                    </TableRow>

                  ) : <TableCell colSpan={tableheadings.length} sx={{ textAlign: "center" }}>No data found</TableCell>
              : <TableCell colSpan={tableheadings.length} sx={{ textAlign: "center", width: "100%" }}>No data found</TableCell>
          }

        </TableBody>
      </CustomTable>

      <Box sx={inputStyles.toastContainer}>
        <ToastContainer limit={2} position="bottom-right" autoClose={2000} />
      </Box>


    </>
  )

}
