import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { Form } from '@flowable/forms';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/config/flowable-core/store/actions';
import * as registrationActions from '../store/actions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { contextInfo } from 'app/common/helpers/common-helper';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import history from '@history';
import _ from '@lodash';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import FuseLoading from '@fuse/core/FuseLoading';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    maxHeight: '80vh'
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(5)
  }
}));

function VerificationPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const [formButton, setformButton] = useState(true);
  const [openDialog, setOpenDialog] = useState(true);
  const [formPayload, setFormPayload] = useState({});

  const formDefinition = useSelector(({ flowable }) => flowable.formDefinition);
  const contextData = contextInfo();
  useEffect(() => {
    setOpenDialog(true);
    const variables = [
      {
        name: 'userType',
        value: contextData.userType
      }
    ];
    dispatch(
      Actions.flowableProcessDefinition(
        'vendorRegistrationNew',
        'internal',
        variables
      )
    );
  }, [dispatch, contextData.userType]);

  const onFormButtonHandler = () => {
    dispatch(
      Actions.flowableCompleteTask(
        formDefinition.json,
        formPayload,
        formDefinition.taskId,
        formDefinition.processInstance,
        formDefinition.formFinalAction
      )
    );
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Form.ready':
        setformButton(true);
        break;
      case 'Payload.beforeChange':
        setformButton(true);
        break;
      case 'Payload.afterChange':
        if (api.formValid()) {
          setFormPayload(api.payload.get());
          _.has(api.payload.get(), 'serviceAgreement')
            ? api.payload.get().serviceAgreement.confirm
              ? setformButton(false)
              : setformButton(true)
            : setformButton(false);
        }
        break;
      default:
        break;
    }
    return true;
  };

  const loadingLinearProgress = (label, payload) => {
    if (payload.post) {
      dispatch(
        registrationActions.postUserToFAM(
          payload.data,
          history.location.state.userType
        )
      );
    }
    return <FuseLoading content={label} />;
  };

  const flowableForm = () => {
    return (
      <Form
        className={clsx(
          flwClasses.form,
          'flex flex-col justify-center w-full vendor'
        )}
        config={formDefinition.json}
        onEvent={onEventHandler}
      />
    );
  };

  return (
    <div className="p-24">
      <Dialog
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        className={classes.root}
      >
        <DialogContent>
          {formDefinition.isFormProcessing
            ? loadingLinearProgress('loading', formDefinition.formFinalPayload)
            : formDefinition.formFinalPayload.post
            ? loadingLinearProgress(
                'Processing please wait..',
                formDefinition.formFinalPayload
              )
            : flowableForm()}
        </DialogContent>
        {!formDefinition.formFinalPayload.post && (
          <DialogActions>
            <MonarchButton
              autoFocus
              onClick={onFormButtonHandler}
              color="primary"
              variant="contained"
              size="small"
              disabled={formButton}
            >
              {formDefinition.formFinalAction ? 'Finish' : 'Continue'}
            </MonarchButton>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

export default VerificationPage;
