import { CONST } from "./index";

export const reorder = (
    droppableStartId,
    droppableEndId,
    droppableStartIndex,
    droppableEndIndex,
    draggableId,
    type
) => {
  return {
    type: CONST.DRAG,
    payload: {
      droppableStartId,
      droppableEndId,
      droppableStartIndex,
      droppableEndIndex,
      draggableId,
      type
    }
  };
};