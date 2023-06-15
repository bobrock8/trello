import React, { useState } from 'react';
import { InputBase, makeStyles, Paper, Button, IconButton } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { addList, addCard } from "../redux/actions";
import { useParams } from "react-router-dom";


const AddListOrCardText = ({ type, setOpen, listId }) => {
  const classes = useStyle();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const {boardId} = useParams();

  const onClickAddList = () => {
    if (title) {
      dispatch(addList(title, boardId));
      setTitle("");
    }
  }

  const onClickAddCard = () => {
    if (title) {
      dispatch(addCard(title, listId));
      setTitle("");
    }
  };

  return(
      <>
        <Paper className={classes.cardOpen}>
         <InputBase
             placeholder={ type === "card" ? "Enter a title for this card..." : "Enter list title..."}
             multiline
             value={title}
             onChange={e=>setTitle(e.target.value)}
             inputProps={{className: classes.inputBase}}
             onBlur={()=>setOpen(false)}
             autoFocus
         />
        </Paper>
        <div className={classes.buttonsContainer}>
          <div className={classes.buttonAddContainer}>
            <Button className={classes.buttonAdd} onClick={type === "list" ? onClickAddList : onClickAddCard}>Add {type}</Button>
            <IconButton onClick={()=>setOpen(false)}>
              <Clear/>
            </IconButton>
          </div>

          <IconButton>
            <MoreHoriz/>
          </IconButton>
        </div>
      </>
  )
}

const useStyle = makeStyles(theme => ({
  cardOpen: {
    width: "280px",
    margin: theme.spacing(0, 1, 1),
    paddingBottom: theme.spacing(4)
  },
  inputBase: {
    margin: theme.spacing(1)
  },
  buttonsContainer: {
    display: "flex",
    margin: theme.spacing(0, 1, 1)
  },
  buttonAddContainer: {
    flexGrow: 1,
  },
  buttonAdd: {
    backgroundColor: '#f58c00',
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: 'rgba(245, 140, 0, 0.75)'
    }
  }
}));

export default AddListOrCardText;