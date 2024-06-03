import React from 'react'
import CustomMenu from '../CustomMenu/CustomMenu'
import {MenuItem, Menu} from '@mui/material';

export default function EmployeeTableMenu() {
   
   /*  const open = Boolean(anchorEl); */
    const ITEM_HEIGHT = 48;
    const options = [
        'Edit',
        'Delete',
        
      ];
      const styles = {
        menuItem:{
          fontFamily: "'Inter', sans-serif",
          fontWeight: "400",
        fontSize: "15px",
        lineHeight: "20px",
        color:"secondary.dark"
        }
      }
      function handleValues(e){
      }
     
  return (
    <CustomMenu>
        
        {options.map((option) => (
        <MenuItem sx={styles.menuItem} key={option}  /* selected={option} */  value={option}  /* onClick={(e) => {handleValues(e)}} */ >
          {option}
        </MenuItem>
      ))}
      {/*  </Menu> */}
    </CustomMenu>
  )
}
