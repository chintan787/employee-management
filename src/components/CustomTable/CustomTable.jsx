import React from 'react'
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Button,
  TablePagination,
  Paper
} from '@mui/material';
import { styles } from './CustomTable.style';
import CustomCard from '../CustomCard/CustomCard';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';

function CustomTable(props) {

  const stringifiedUser = localStorage.getItem('user');
  const userAsObjectAgain = JSON.parse(stringifiedUser);
  const role = userAsObjectAgain?.user_role

  const handleTabValue = (val) => {
    props.setActiveTabValue(val);
  }

  return (
    <>
      {props.tableTitle ?
        <Typography variant='h4' sx={styles.tableHeading}> {props.tableTitle}</Typography> : ""}
      {role === 1 && props.showButton ?
        <Stack direction="row" spacing={2} sx={styles.profileCreatebuttonSection}>
          <Link to="/employees/create">
            <Button sx={styles.profileCreateButton} className='buttons createButton' variant="contained" endIcon={<AddOutlinedIcon />}>
              Add Employee
            </Button>
          </Link>
        </Stack>
        : ""}
      <CustomCard>
        <TableContainer component={Paper}>
          <Table sx={styles.customTable} aria-label="simple table" style={{ tableLayout: props.layout ? { xs: "auto", md: "fixed" } : "auto" }}  >
            {props.subHeading || props.searchedVal ?
              <TableHead >
                <TableRow sx={styles.tableSubHeading}>
                  <TableCell  colSpan={5} >
                    <Button sx={props.activeTabValue === 1 ? styles.primaryButton : styles.secondaryButton} onClick={() => handleTabValue(1)} variant={props.activeTabValue === 1 ? "contained" : "outlined"}  >
                      {props.subHeading}
                    </Button>

                    <Button sx={props.activeTabValue === 0 ? styles.primaryButton : styles.secondaryButton} onClick={() => handleTabValue(0)} variant={props.activeTabValue === 0 ? "contained" : "outlined"}  >
                      {props.subHeading2}
                    </Button>

                  </TableCell>
                  <TableCell  colSpan={3} >
                    <SearchBar label="search" searchedVal={props.searchedVal} setSearchedVal={props.setSearchedVal} handleSearchValues={props.handleSearchValues} />
                  </TableCell>

                </TableRow>
              </TableHead>
              : ""}
            <TableHead>

              <TableRow sx={styles.tableCategoryTitles}>

                {props.tableHeadingList && props.tableHeadingList.length ? props.tableHeadingList.map(name => (<TableCell colSpan={0} key={name}>{name}</TableCell>)) : null}

              </TableRow>

            </TableHead>

            {props.children}

            {props.rowsPerPage ?
              <TableRow>
                <TableCell colSpan={8} sx={styles.paginationCell}>
                  <TablePagination
                    sx={styles.pagination}
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={props.rows}
                    rowsPerPage={props.rowsPerPage}
                    page={props.page}
                    onPageChange={props.handleChangePage}
                    onRowsPerPageChange={props.handleChangeRowsPerPage}
                    color="secondary.main"
                  />
                </TableCell>
              </TableRow>
              : ""}
          </Table>
        </TableContainer>
      </CustomCard>
    </>
  )
}

export default CustomTable

