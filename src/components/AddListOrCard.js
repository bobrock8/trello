import { Collapse, makeStyles, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import AddListOrCardText from "./AddListOrCardText";


const AddListOrCard = ({type, listId}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyle();
  let text = "";
  if (type === "card") {
    text  = "Add a card";
  } else if (type === "list") {
     text  = "Add another list";
  }

  return(
      <div className={classes.addListOrCardContainer}>
        <Collapse in={open}>
          <AddListOrCardText type={type} setOpen={setOpen}  listId={listId}/>
        </Collapse>
        <Collapse in={!open}>
          <Paper className={classes.addListOrCardText} onClick={()=>setOpen(true)}>
            <Typography>
              + {text}
            </Typography>
          </Paper>
        </Collapse>
      </div>
  )
}

const useStyle = makeStyles(theme => ({
  addListOrCardContainer: {
    width: "300px",
    marginTop: theme.spacing(1)
  },
  addListOrCardText: {
    padding: theme.spacing(1,2),
    margin: theme.spacing(0,1,1),
    background: "#ebecf0",
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 0, 0.25)'
    }
  },
}));

export default AddListOrCard;