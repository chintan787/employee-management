import React,{useState} from 'react'
import { inputStyles } from '../FormInput.style';
import {
    TextField,
    InputAdornment,
    IconButton
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SearchBar from './SearchBar';

const filter = createFilterOptions();

export default function AutoComplete(props) {
    
  
  return (
    <>
    <Autocomplete
    value={props.value}
    onChange={(event, newValue) => {
      if (typeof newValue === 'string') {
        props.setValue({
            emp_first_name: newValue,
            emp_last_name : newValue,
        });
      } else if (newValue && newValue.inputValue) {
        // Create a new value from the user input
        props.setValue({
            emp_first_name: newValue.inputValue,
            emp_last_name :  newValue.inputValue,
        });
      } else {
        props.setValue(newValue);
      }
    }}
    filterOptions={(options, params) => {
      const filtered = filter(options, params);
      const { inputValue } = params;
      return filtered;
    }}
    selectOnFocus
    clearOnBlur
    handleHomeEndKeys
    forcePopupIcon
    id="free-solo-with-text-demo"
    options={props.empData}
    getOptionLabel={(option) => {
      // Value selected with enter, right from the input
      if (typeof option === 'string') {
        return option;
      }
     
      if (option.inputValue) {
        return option.inputValue;
      }
      // Regular option
      const fullName = option.emp_first_name +" " + option.emp_last_name;
      return fullName

    }}
    renderOption={(props, option) => <li {...props} style={{  textTransform: "capitalize",}}>{option.emp_first_name} {option.emp_last_name}</li>}
    freeSolo
    renderInput={(params) => (
        <TextField placeholder='Select Employee'  sx={inputStyles.formInput}  style={{textTransform:"capitalize"}} {...params}   />
    )}
  />
  {props.children}
  </>
);
}

  