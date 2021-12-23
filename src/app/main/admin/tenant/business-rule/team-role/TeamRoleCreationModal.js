import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import TeamRoleCreation from './TeamRoleCreation';

export default function TeamRoleCreationModal({ open, setOpen }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
      maxHeight: '80vh'
    }
  }))(MuiDialogContent);

  return (
    <div className="p-24">
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}></Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
          <TeamRoleCreation onUpdated={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: '14px'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
