import {CONST} from "../actions";

const boardsReducer = (state= [], {type, payload}) => {
  switch (type) {
    case CONST.FETCH_BOARDS:
      return {...state, boards:payload}
    default:
      return state;
  }
}

export default boardsReducer;