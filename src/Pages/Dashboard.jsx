import React,{useEffect} from 'react';
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
import CustomTable from '../components/CustomTable/CustomTable';

export default function Dashboard() {
  const cardData = [
    {
      image_url: "/base.png",
      title: "Applicants",
      total_result: "2.300",
      status: "profit",
      status_value: "(+5%)",
      time: "since last month"
    },
    {
      image_url: "/base.png",
      title: "New jobs",
      total_result: "12",
      status: "profit",
      status_value: "(+20%)",
      time: "since last month"
    },
    {
      image_url: "/base.png",
      title: "Growth",
      total_result: "23%",
      status: "loss",
      status_value: "(-15%)",
      time: "since last month"
    },
    {
      image_url: "/base.png",
      title: "Recruitments",
      total_result: "57",
      status: "profit",
      status_value: "(100%)",
      time: "since last month"
    },
   
  ]
  
  const cardStyles = {  
    cardListSection: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      margin: "6px 0",
     
    }
  }

  const dispatch = useDispatch()
  
  const empData = useSelector(
    (state) => state.EmployeesReducer?.employees
  );
  useEffect(() => {
    dispatch(getEmployees())
  }, [])
  useEffect(() => {
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
