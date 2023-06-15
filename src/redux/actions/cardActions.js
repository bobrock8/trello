import { CONST } from "./index";
import trelloApi from "../../api/trelloApi";

export const addCard = (title,listId) => {
  return function(dispatch) {
    trelloApi.post(`cards?name=${title}&idList=${listId}`).then(response => {
      dispatch({type:CONST.ADD_CARD, payload:response.data});
    });
  };
}