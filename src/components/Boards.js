import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {makeStyles} from "@material-ui/core";

const Boards = () => {
  const classes = useStyle();
  const boards = useSelector(state => state.boards);
  return(
      <div className={classes.boardsContainer}>
        { boards['boards'] && boards['boards'].length > 0 && boards['boards'].map(board => {
          const {id, name} = board;
          return(
              <div key={id} className={classes.board}>
                <Link className={classes.link} to={`board/${id}`}>
                  <h2>{name}</h2>
                </Link>
              </div>
          );
        })}
      </div>
  )
}
const useStyle = makeStyles(theme => ({
  boardsContainer: {
    display: "flex",
    marginTop: theme.spacing(1),
    justifyContent: "center",
    alignItems:"center",
    height: "100vh"
  },
  board: {
    lineHeight: "1.5rem",
    background: "rgba(145, 136, 141, 0.8)",
    borderRadius: "20px",
    marginRight: "10px",
    color: "white"
  },
  link: {
    color: "wheat",
    padding:"20px",
    display:"block"
  }
}));
export default Boards;