import React from 'react'
import { inputStyles } from '../FormInput.style';

import {
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';

import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function SearchBar(props) {


 


  function clearSearch() {
    props.setSearchedVal("");
  }

  return (
    <>

      <TextField sx={inputStyles.formInput} value={props.searchedVal}/*  label="search" */
      placeholder='search'
      className='searchInput'
        onChange={props.handleSearchValues}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {props.searchedVal ? <IconButton onClick={clearSearch} edge="end">
                <CloseOutlinedIcon />
              </IconButton> :
                <IconButton disabled edge="end">
                  <SearchSharpIcon />
                </IconButton>}
            </InputAdornment>
          ),
        }}
      >
      </TextField>

      {props.children}

    </>

  )
}
