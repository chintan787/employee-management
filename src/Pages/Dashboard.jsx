import React,{useEffect,useState} from 'react';
import {
  Box,
  Toolbar,
  Grid
} from '@mui/material';
import QuickCard from '../components/QuickCard/QuickCard';

import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../Action/Employees'
  import { styles } from '../components/SideNavForPages.style';
import EmployeesTable from '../components/EmployeesTable/EmployeesTable';
import { useNavigate } from 'react-router-dom';
import SalaryExpenses from '../Images/SalaryExpenses';
import GraphIcon from '../Images/GraphIcon';
import GroupIcon from '../Images/GroupIcon';


export default function Dashboard() {

  const [sortedData, setSortedData] = useState();
  const [currentEmpCount, setCurrentEmpCount] = useState();
  const [loading, setLoading] = useState(true);
  const [expenses,setExpenses] = useState();

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const empData = useSelector(
    (state) => state.EmployeesReducer?.employees
  );
  const cardData = [
    {
      image_url: <SalaryExpenses />,
      title: "Total Salary Expenses",
      total_result: expenses?.toLocaleString("en-US"),
      status: "profit",
      // status_value: "(+5%)",
      time: "since last month"
    },
    {
      image_url:<GroupIcon />,
      title: "Total Employees",
      total_result: currentEmpCount,
      status: "profit",
      // status_value: "(+20%)",
      time: "since last month"
    },
    {
      image_url: <GraphIcon />,
      title: "Total Past Employees",
      total_result: empData?.length - currentEmpCount,
      status: "loss",
      // status_value: "(-15%)",
      time: "since last month"
    },
    // {
    //   image_url: <GraphIcon />,
    //   title: "Recruitments",
    //   total_result: "57",
    //   status: "profit",
    //   status_value: "(100%)",
    //   time: "since last month"
    // },
   
  ]
  
  const cardStyles = {  
    cardListSection: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      margin: "6px 0",
     
    }
  }

  
  
  useEffect(() => {
    dispatch(getEmployees(setLoading,navigate))
  }, [])

 

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
      
      const currentEmp = empData.filter((emp) => emp.emp_status === 1)
      setCurrentEmpCount(currentEmp.length);
      let totalSalary = 0;
      currentEmp.forEach((employee) => {
        totalSalary += employee.emp_basic_salary;
      });
      setExpenses(totalSalary)
    }
  }, [empData])
  return (

    <Box sx={styles.pageContent} component="main">
      <Toolbar />


     {/*  <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
       
        {cardData.map((card, index) => (
           <Grid item xs={4} md={3}>
          <QuickCard key={index} icon={card.image_url} title={card.title} statistics={card.total_result} growthData={card.status_value} growthStatus={card.status} time={card.time} template="one" />
          </Grid>
        ))}
        </Grid>
        
    </Box> */}

       <Box sx={cardStyles.cardListSection}>
        {cardData.map((card, index) => (
          <QuickCard key={index} icon={card.image_url} title={card.title} statistics={card.total_result} growthData={card.status_value} growthStatus={card.status} time={card.time} template="one" />
        ))}
      </Box> 

    {/*   <Box sx={cardStyles.cardListSection}>
        {cardData.map((card, index) => (
          <QuickCard key={index} icon={card.image_url} title={card.title} statistics={card.total_result} growthData={card.status_value} growthStatus={card.status} time={card.time} template="two" />
        ))}
      </Box> */}

        <EmployeesTable  empData={empData}/>  

    </Box>

  );
}
