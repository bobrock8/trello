import TrelloList from "./TrelloList";
import { makeStyles } from "@material-ui/core";
import AddListOrCard from "./AddListOrCard";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { removeLists, reorder } from '../redux/actions';
import { useParams } from "react-router-dom";
import { useEffect}  from "react";
import { fetchListsAndCards } from "../redux/actions";
import Loader from "./Loader";

const TrelloBoard = () => {
  const classes = useStyle();
  const {boardId} = useParams();
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists);


  useEffect(() => {
    if (boardId !== "" ){
      dispatch(fetchListsAndCards(boardId));
    }
    return () => {
      dispatch(removeLists());
    }
  }, [boardId])

  const elementOnDrag = outcome => {
    const { destination, source, draggableId, type } = outcome;

    if (!destination) {
      return;
    }

    dispatch(
        reorder(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId,
            type
        )
    )
  }
  let content = <Loader/>;
  if (lists['lists'] && lists['lists'].length > 0) {
    let renderLists = lists['lists'].map((list, index) =>  (
        <TrelloList key={list.id} title={list.name} listId={list.id} index={index} boardId={boardId} cards={list.cards}/>
    ));

    content = <>
      {renderLists}
      <AddListOrCard type="list"/>
    </>
  }


  return (
      <DragDropContext onDragEnd={elementOnDrag}>
        <Droppable droppableId="lists" direction="x" type="moveList">
          { provided => (
              <div className={classes.board} {...provided.droppableProps } ref={provided.innerRef}>
                { content }

                {provided.placeholder}
              </div>
          )}

        </Droppable>
      </DragDropContext>
  );
}

const useStyle = makeStyles(theme => ({
  board: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start"
  }
}));

export default TrelloBoard;
