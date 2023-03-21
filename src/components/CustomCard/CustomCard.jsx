import React from 'react';
import {
/*   CardContent, */
  Card
} from '@mui/material';
/*  import { styles } from '../QuickCard/QuickCard.style';  */

export default function CustomCard(props) {
  const styles = {
    card: {
      borderRadius: "16px",
      boxShadow: "0px 0px 1px 0px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 6%), 0px 0px 2px 0px rgb(0 0 0 / 6%)",
     /*  "& .MuiCardContent-root": {
        padding: 0,
      },
      "& .MuiCardContent-root:last-child ": {
        paddingBottom: "0",
      }, */
    },

  }
  return (

    <Card sx={styles.card}>
      {/* <CardContent> */}
        {/*  <Box sx={styles.cardImage} className={`template-${props.template}`}>
          <img src={props.icon} alt='base' />
        </Box>

        <Box>
          <Typography sx={styles.cardHeading} className={`template-${props.template}`}>{props.title}</Typography>
          <Typography sx={styles.statistics} className={`template-${props.template}`}>{props.statistics}</Typography>
          <Typography sx={styles.growthData} className={`status-${props.growthStatus} template-${props.template}`}>{props.growthData}</Typography>
          {props.template === "two" ? <Typography sx={styles.displayTime} className={`status-${props.growthStatus}`}>{props.time}</Typography> : ""}
          
        </Box> */}
        {props.children}

      {/* </CardContent> */}
    </Card>


  )
}
