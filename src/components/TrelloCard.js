import { makeStyles, Paper } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import Delete from '@material-ui/icons/Delete';
import {useDispatch} from "react-redux";
import {removeCard} from "../redux/actions";

const TrelloCard = ({text, id, index, listId}) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const deleteCardHandler = () => {
    dispatch(removeCard(id, listId));
  }

  return(
      <Draggable draggableId={String(id)} index={index}>
        { provided => (
            <div ref={provided.innerRef} {...provided.draggableProps } {...provided.dragHandleProps }>
              <Paper className={classes.card}>
                <div className={classes.cardText}>{text}</div>
                <Delete className={classes.deleteIcon} onClick={deleteCardHandler}/>
              </Paper>

            </div>
        )}
      </Draggable>
  )
}

const useStyle = makeStyles(theme => ({
  card: {
    padding: theme.spacing(1,2),
    margin: theme.spacing(1),
    display: "flex",
    cursor: "pointer"
  },
  cardText: {
    flexGrow: 1
  },
  deleteIcon: {
    cursor: "pointer"
  }
}));

export default TrelloCard;