import { Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

function MonarchPageSimpleHeader(props) {
  const mainThemeDark = useSelector(({ fuse }) => fuse.settings.mainThemeDark);

  return (
    <div className={props.classes.header}>
      <Paper elevation={3}>
        {props.header && (
          <ThemeProvider theme={mainThemeDark}>{props.header}</ThemeProvider>
        )}
      </Paper>
    </div>
  );
}

export default MonarchPageSimpleHeader;
