import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';

function MonarchPageHeaderCardedHeader(props) {
  const mainThemeDark = useSelector(({ fuse }) => fuse.settings.mainThemeDark);
  const [expanded, setExpanded] = React.useState(false);
  const [hide, setHide] = React.useState(true);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%'
    },
    header: props.classes.header,
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.standard
      })
    },
    expandOpen: {
      transform: 'rotate(0deg)'
    },
    margin: {
      margin: theme.spacing(1)
    },
    iconButton: {
      position: 'absolute',
      bottom: expanded ? '-15%' : '-60%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 999,
      borderRadius: '10px',
      color: theme.palette.primary.dark,
      marginRight: theme.spacing(1),
      display: hide ? 'block' : 'none'
    },
    headerContent: {
      width: '100%',
      paddingLeft: 5,
      display: 'table'
    }
  }));

  const classes = useStyles();

  const handleChange = () => {
    setExpanded((prev) => !prev);
    setHide(false);
    setTimeout(() => {
      setHide(true);
    }, 200);
  };

  return (
    <div className={clsx(classes.root, 'flex flex-col sm:flex sm:flex-row')}>
      <Box
        display="flex"
        bgcolor="background.paper"
        className={clsx(classes.root, 'flex flex-col sm:flex sm:flex-row')}
      >
        <Box className={classes.headerContent}>
          <Collapse in={expanded} collapsedHeight={60} className={classes.root}>
            {props.header && (
              <ThemeProvider theme={mainThemeDark}>
                {props.header}
              </ThemeProvider>
            )}
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={clsx(classes.expand, classes.iconButton, {
                [classes.expandOpen]: expanded
              })}
              data-tour="HeaderExpandButton"
              onClick={handleChange}
            >
              ............................
            </Button>
          </Collapse>
        </Box>
      </Box>
    </div>
  );
}

export default MonarchPageHeaderCardedHeader;
