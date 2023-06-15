import { CONST } from "./index";
import trelloApi from "../../api/trelloApi";

export const fetchBoards = () => {
  return async function(dispatch) {
    const response = await trelloApi.get('members/bobrock8/boards');
    dispatch({ type:CONST.FETCH_BOARDS, payload: response.data })
  }
}