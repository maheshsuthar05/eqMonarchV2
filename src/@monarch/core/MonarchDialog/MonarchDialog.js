import Dialog from '@material-ui/core/Dialog';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as Actions from 'app/store/actions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import clsx from 'clsx';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    maxWidth: ''
  },
  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    color: theme.palette.primary.main
  },
  titleTxt: {
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    textAlign: 'center',
    padding: '5px 20px',
    fontSize: '1rem',
    fontWeight: 'normal !important',
    background: theme.palette.background.widgetTitleBg,
    color: theme.palette.primary.widgetTitleColor
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={clsx(classes.root)} {...other}>
      <h5 className={clsx('', classes.titleTxt)}>{children}</h5>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    maxHeight: '80vh',
    minHeight: '200px'
  }
}))(MuiDialogContent);

function MonarchDialog(props) {
  const dispatch = useDispatch();
  const state = useSelector(({ fuse }) => fuse.modalDialog.state);
  const options = useSelector(({ fuse }) => fuse.modalDialog.options);
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiPaper-rounded': {
        borderRadius: theme.palette.radius
      },
      '& .MuiPaper-root.MuiDialog-paperWidthLg': {
        [theme.breakpoints.down('sm')]: {
          maxWidth: theme.layoutMaxWidth[config.mode] - '600'
        },
        [theme.breakpoints.up('md')]: {
          maxWidth: theme.layoutMaxWidth[config.mode] - '320'
        },
        [theme.breakpoints.up('lg')]: {
          maxWidth: theme.layoutMaxWidth[config.mode] - '40'
        }
      },
      '& .MuiDialog-paperScrollPaper': {
        minHeight: options?.minHeight ? options.minHeight : ''
      }
    }
  }));

  const classes = useStyles();
  const handleClose = () => {
    dispatch(Actions.closeModal());
  };

  return (
    <Dialog
      fullWidth={true}
      onClose={(ev) => handleClose}
      open={state}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      maxWidth={options?.maxwidth ? options.maxwidth : 'sm'}
      className={clsx(classes.root, options?.minHeight)}
    >
      {options.title && (
        <DialogTitle onClose={handleClose} className="flex w-full pl-0 px-32">
          {options.title}
        </DialogTitle>
      )}

      <DialogContent {...options}></DialogContent>
      {options.buttons && (
        <DialogActions>
          <MonarchButton key="close" onClick={handleClose} size="small">
            {'Close'}
          </MonarchButton>
          {options.buttons}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default MonarchDialog;
