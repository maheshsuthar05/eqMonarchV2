import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center"
  },
  border: {
    borderBottom: "1px solid #e5e5e5",
    width: "100%"
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    color: theme.palette.primary.main
  }
}));

const DividerWithText = ({ children }) => {
 const classes = useStyles();
 return (
  <div className={classes.container}>    
    <span className={classes.content}>{children}</span>
    <div className={classes.border} />
  </div>
 );
};
export default DividerWithText;