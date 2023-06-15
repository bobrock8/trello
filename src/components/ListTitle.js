import { makeStyles, Typography } from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const ListTitle = ({title}) => {
  const classes = useStyle();
  return (
      <div className={classes.titleContainer}>
        <Typography className={classes.titleText}>
          {title}
        </Typography>
        <MoreHorizIcon/>
      </div>
  )
}

const useStyle = makeStyles(theme => ({
  titleContainer: {
    display: "flex",
    margin: theme.spacing(1)
  },
  titleText: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold"
  },
}));

export default ListTitle;