import { combineReducers } from "redux";
import ListsReducer from "./listsReducer";
import boardsReducer from "./boardsReducer";

export default combineReducers({
  boards:boardsReducer,
  lists:ListsReducer
})