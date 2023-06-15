import { Paper, CssBaseline, makeStyles } from "@material-ui/core";
import ListTitle from "./ListTitle";
import TrelloCard from "./TrelloCard";
import AddListOrCard from "./AddListOrCard";
import { Droppable, Draggable }  from "react-beautiful-dnd";


const TrelloList = ({title, listId, index, cards}) => {
  const classes = useStyle();
  return(
      <Draggable draggableId={String(listId)} index={index}>
        { provided => (
            <div ref={provided.innerRef} {...provided.draggableProps } {...provided.dragHandleProps }>
              <Droppable droppableId={listId + ''} type="moveCard">
                { provided => (
                    <Paper {...provided.droppableProps } ref={provided.innerRef} className={classes.list}>
                      <CssBaseline/>
                      <ListTitle title={title}/>
                      {cards && cards.length > 0 && cards.map((card, index)=>(
                          <TrelloCard key={card.id} text={card.name} id={card.id} index={index} listId={listId}/>
                      ))}
                      <AddListOrCard type="card" listId={listId}/>
                      {provided.placeholder}
                    </Paper>
                )}
              </Droppable>
            </div>
        )}

      </Draggable>
  )
}


const useStyle = makeStyles(theme => ({
  list: {
    width: "300px",
    background: "#ebecf0",
    margin: theme.spacing(1)
  }
}));

export default TrelloList;