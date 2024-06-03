export const styles = {

    
    cards: {
      /*  padding: "26px 24px 20px", */
        width: "255px",
        "& .MuiCardContent-root": {
            padding: 0,
        },
        "& .MuiCardContent-root:last-child ": {
            paddingBottom: 0,
        },
    },
    cardContent: {
        display: "flex",
        alignItems:'center',
         padding:"26px 24px",
        minWidth:"255px",
        "&.MuiCardContent-root:last-child ": {
            paddingBottom: "20px",
        }, 
    },
     cardWrapper:{
        marginRight: "30px",
    marginBottom: "30px",
    }, 
    cardImage: {
        background:"#ffeef1",
        padding:1.5,
        borderRadius:2,
        marginRight: "10px",
        "&:last-child": {
            marginRight: 0
        },
        "&.template-two": {
            order: "2",
            marginRight: 0,
            textAlign: "right",
            flex: "1"
        }
    },
    cardHeading: {
        paddingBottom: "4px"
    },
    statistics: {
        marginRight: "20px",
        lineHeight: "26px",
        
        "&.template-two": {
            display: "block",
            margin: "4px 0"
        },
        "&.template-one": {
            display: "inline-block",
            verticalAlign: "middle",
        },
    },
    growthData: {
        display: "inline-block",
        verticalAlign: "middle",
        fontWeight: "700",
        fontSize: "12px",
        lineHeight: "14px",
        "&.status-profit": {
            color: "success.dark", 
        },
        "&.status-loss": {
            color: "error.light",
        },
        "&.template-two": {
            padding: "5px 6px",
            borderRadius: "6px",
            "&.status-profit": {
                background: "#DEFFEE",
            },
            "&.status-loss": {
                background: "error.main",
            },
        },
        

    },
    displayTime: {
        display: "inline-block",
        verticalAlign: "middle",
        fontSize: "10px",
        lineHeight: "16px",
        fontWeight: "500",
        marginLeft: "10px",
        color: "secondary.main",
       
    }


}