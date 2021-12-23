import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import EventTable from "./EventTable";
import MonarchPageCarded from "@monarch/core/MonarchPageCarded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    '& .MuiPaper-rounded': {
      background: theme.palette.background.iconbg,
      color: theme.palette.primary.contrastDark,
      borderRadius: '0 !important'
    }
  },
}));

export default function SimpleTabs(props) {
  const pageLayout = useRef(null);
  const classes = useStyles();

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={"Rule Management"}
      contentToolbar={<></>}
      content={
        <div className={classes.root}>
          <EventTable />
        </div>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
}
