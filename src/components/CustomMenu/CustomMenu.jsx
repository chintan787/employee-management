import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomCard from '../CustomCard/CustomCard';

const options = [
  'Edit',
  'Delete',

];

const ITEM_HEIGHT = 48;

export default function CustomMenu(props) {
  const ITEM_HEIGHT = 48;

  const styles = {
    menuIcon: {
      color: "secondary.main",
    }
  }

 

  return (
    <div>

      <IconButton
        aria-label="more"
        id={props.id}
        aria-controls={props.open ? 'long-menu' : undefined}
        aria-expanded={props.open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={props.getMenuId}
      >
        <MoreVertIcon sx={styles.menuIcon} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            boxShadow: "0px 0px 1px 0px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 6%), 0px 0px 2px 0px rgb(0 0 0 / 6%)",
          },
        }}
      >

        {/* {props.options && props.options.length ? props.options.map(option => ( 
        <MenuItem sx={styles.menuItem} key={option} selected={option} onClick={handleClose}>
        {option}
      </MenuItem>
      )) : null}  */}


        {/*  {options.map((option) => (
        <MenuItem sx={styles.menuItem} key={option} selected={option === 'Pyxis'} onClick={handleClose}>
          {option}
        </MenuItem>
      ))}  */}
        {props.children}
      </Menu>
     {/*  </CustomCard> */}
    </div>
  )
}
