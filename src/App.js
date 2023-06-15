import TrelloBoard from "./components/TrelloBoard";
import {makeStyles} from "@material-ui/core";
import backgroundImg from './img/trello-background.webp';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Boards from "./components/Boards";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchBoards} from "./redux/actions/boardActions";


function App() {
  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, [])

  return (
      <div className={classes.main}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Boards/>}/>
            <Route path="/board/:boardId" exact element={<TrelloBoard/>}/>
            <Route>404</Route>
          </Routes>
        </Router>
      </div>
  );
}

const useStyle = makeStyles(theme => ({
  main: {
    overflowY: "auto",
    minHeight: "100vh",
    backgroundColor: "#0079bf",
    backgroundImage: `url(${backgroundImg})`, // src https://blog.trello.com/unsplash-photo-board-backgrounds
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
}));

export default App;
