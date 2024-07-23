import React from 'react';
import {
  Card
} from '@mui/material';

export default function CustomCard(props) {
  const styles = {
    card: {
      borderRadius: "16px",
      boxShadow: "0px 0px 1px 0px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 6%), 0px 0px 2px 0px rgb(0 0 0 / 6%)",
    },

  }
  return (

    <Card sx={styles.card}>
        {props.children}
    </Card>


  )
}
