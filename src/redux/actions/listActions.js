import { CONST } from "./index";
import axios from "axios";
import trelloApi from "../../api/trelloApi";

export const fetchListsAndCards = boardId => async  dispatch => {

  const listsRequest =  trelloApi.get(`/boards/${boardId}/lists`);
  const cardsRequest =  trelloApi.get(`/boards/${boardId}/cards`);


    await axios.all([listsRequest, cardsRequest]).then(axios.spread((...responses) => {
      const listsResponse = responses[0].data;
      const cardsResponse = responses[1].data;

      const lists = listsResponse.map(list=> {
        let cards = cardsResponse.filter(card => card.idList === list.id);
        return {
          ...list,
          cards:[...cards]
        }
      });
      dispatch({ type:CONST.FETCH_LISTS_AND_CARDS, payload: lists })
    })).catch(errors => {
      console.log(errors);
    });
  }

export const addList = (title, boardId) => {
  return function(dispatch) {
    trelloApi.post(`lists?name=${title}&idBoard=${boardId}`).then(response => {
      dispatch({type:CONST.ADD_LIST, payload:response.data});
    });
  };
};

export const removeLists = () => {
  return {
    type: CONST.REMOVE_SELECTED_BOARD
  };
};

export const removeCard = (cardId, listId) => {
  return {
    type: CONST.REMOVE_CARD,
    payload: {cardId, listId}
  };
};
