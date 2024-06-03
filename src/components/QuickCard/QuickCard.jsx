import React from 'react';
import {
    Box,
    Typography,
    CardContent,
    /* Card */
} from '@mui/material';
/* import { styles } from './CardList.style'; */
import { styles } from '../QuickCard/QuickCard.style';

import CustomCard from '../CustomCard/CustomCard';

export default function QuickCard(props) {


    return (
        <>
       <Box sx={styles.cardWrapper}>
             <CustomCard sx={styles.cards}>
                <CardContent sx={styles.cardContent}>
                    
                    <Box sx={styles.cardImage} className={`template-${props.template}`}>
                        {/* <img src={props.icon} alt='base' /> */}
                        {props.icon}
                    </Box>

                    <Box>
                        <Typography sx={styles.cardHeading} variant='h6' className={`template-${props.template}`}>{props.title}</Typography>
                        <Typography sx={styles.statistics} variant='h3' className={`template-${props.template}`}>{props.statistics}</Typography>
                        <Typography sx={styles.growthData} className={`status-${props.growthStatus} template-${props.template}`}>{props.growthData}</Typography>
                        {props.template === "two" ? <Typography sx={styles.displayTime} className={`status-${props.growthStatus}`}>{props.time}</Typography> : ""}

                    </Box>
                   
                </CardContent>
            </CustomCard>
            </Box>
 

            {/*   <Box sx={styles.cardListSection}>
        {cardData.map((card, index) => (
            <Card variant='outlined' className='card' >
                <CardContent sx={styles.cardContent}>
                    <Box className='card-image'>
                    <img src={card.image_url} alt='base' />
                    </Box>
                    <Box>
                    <Typography className='card-heading'>{card.category_name}</Typography>
                    <Typography className='total-value'>{card.total_result}</Typography>
                    <Typography className='status-value'>{card.status_value}</Typography>
                    </Box>
                    
                </CardContent>
            </Card>
        ))
        }
    </Box>  */}
        </>
    )
}
