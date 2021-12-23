import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import OfferSummayContacts from './OfferSummayContacts';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
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
    maxHeight: '80vh'
  }
}))(MuiDialogContent);

export default function OfferContactsPopup(props) {
  const { offerId } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.openPopup) {
      setOpen(props.openPopup);
    }
  }, [props.openPopup]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Dialog
          TransitionComponent={Transition}
          aria-labelledby="settings-panel"
          aria-describedby="settings"
          open={open}
          keepMounted
          onClose={handleClose}
          BackdropProps={{ invisible: true }}
          classes={{
            paper: classes.dialogPaper
          }}
        >
          <FuseScrollbars className="pb-24 sm:pb-32">
            <DialogTitle onClose={handleClose}>Contacts</DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <OfferSummayContacts
                showHeading={false}
                offerId={offerId}
                key={'offer_summary_contacts'}
                {...props}
              />
            </DialogContent>
          </FuseScrollbars>
        </Dialog>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: '14px'
  },
  dialogContent: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)'
  },
  dialogPaper: {
    position: 'fixed',
    width: 320,
    maxWidth: '90vw',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    top: 0,
    height: '100%',
    minHeight: '100%',
    bottom: 0,
    right: 0,
    margin: 0,
    zIndex: 1000,
    borderRadius: 0
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  const theme = useTheme();
  return (
    <Slide
      direction={theme.direction === 'ltr' ? 'left' : 'right'}
      ref={ref}
      {...props}
    />
  );
});
