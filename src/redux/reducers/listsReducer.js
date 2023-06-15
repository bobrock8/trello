import { CONST } from "../actions";
import trelloApi from "../../api/trelloApi";

const ListsReducer = (state = [], {type, payload}) => {
  switch (type) {
    case CONST.FETCH_LISTS_AND_CARDS:
      return {...state, lists:payload};
    case CONST.ADD_LIST:
      console.log({...state, lists:[...state.lists, payload]})
      return {...state, lists:[...state.lists, payload]};
    case CONST.ADD_CARD:
      const lists = state.lists.map(list=> {
        if (list.id === payload.idList) {
          return {
            ...list,
            cards:[...list.cards, payload]
          }
        } else {
          return list;
        }
      });
      return {...state, lists:[...lists]};
    case CONST.DRAG:
      const {
        droppableStartId,
        droppableEndId,
        droppableStartIndex,
        droppableEndIndex,
        draggableId,
        type
      } = payload;

      if (type === "moveList") {
        const list = state.lists.splice(droppableStartIndex, 1);
        state.lists.splice(droppableEndIndex, 0, ...list);
        return state;
      }

      if (type === "moveCard") {
        if (droppableStartId === droppableEndId){
          const list = state.lists.find(list => String(list.id) === droppableStartId);
          const card = list.cards.splice(droppableStartIndex, 1);
          list.cards.splice(droppableEndIndex, 0, ...card);

        } else if (droppableStartId !== droppableEndId) {
          const listFrom = state.lists.find(list => String(list.id) === droppableStartId);
          const card = listFrom.cards.splice(droppableStartIndex, 1);
          const listTo = state.lists.find(list => String(list.id) === droppableEndId);
          listTo.cards.splice(droppableEndId, 0, ...card);
          const moveCard = async () => {
            const response = await trelloApi.put(`/cards/${card[0].id}?idList=${listTo.id}`).then(response => {
            }).catch(error => console.log(error));
          };
          moveCard();
        }
      }
      return state;
    case CONST.REMOVE_SELECTED_BOARD:
      return [];
    case CONST.REMOVE_CARD:
      const {cardId, listId} = payload;
      const editedLists = state.lists.map(list=> {
        if (list.id === listId) {
          const cardsDeleted = list.cards.filter(card => card.id !== cardId);

          return {
            ...list,
            cards:cardsDeleted
          }
        } else {
          return list;
        }
      });

      const deleteCard = async () => {
        const response = await trelloApi.delete(`/cards/${cardId}`).then(response => {
        }).catch(error => console.log(error));
      };
      deleteCard();

      return {...state, lists:[...editedLists]};

  default:
    return state;
  }
}

export default ListsReducer;