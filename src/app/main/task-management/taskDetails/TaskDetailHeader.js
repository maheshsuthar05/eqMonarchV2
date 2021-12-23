import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { closeModal, openDialog } from 'app/store/actions';
import * as FlowableActions from 'app/config/flowable-core/store/actions/flowable-core.actions';
import { hideTaskDetails } from '../store/actions';
import { flowable } from 'app/config/api';
import ImageDialog from 'app/main/property/components/ImageDialog';
import PropertyDecision from 'app/main/property/components/PropertyDecision';
import TaskDetailDownload from './TaskDetailDownload';
import {
  Button,
  DialogActions,
  DialogTitle,
  makeStyles
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  media: {
    width: '100%',
    maxWidth: 'auto',
    height: '500px'
  },
  appBar: {
    boxShadow: theme.shadows[0],
    borderBottom: 0
  },
  button: {
    backgroundColor: '#ffffff !important',
    color: '#000000',
    fontSize: '10px !important',
    borderRadius: '15px',
    boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
    padding: '6px 16px',
    display: 'flex',
    textTransform: 'capitalize',
    '&:hover': {
      background: '#0c1a82 !important',
      color: '#ffffff'
    }
  },
  activeClass: {
    background: '#0c1a82 !important',
    color: '#ffffff'
  }
}));

const TaskDetailHeader = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [instanceDiagramChange, setInstanceDiagramChange] = useState(null);
  const [taskActive, setTaskActive] = useState(props.formChanges);
  const instanceDiagramImageUrl = flowable.api.processInstanceDiagram(
    props.taskDetails.processInstanceId
  );
  const [processDiagramImageUrl, setProcessDiagramImageUrl] = useState(null);

  const processInstance = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.details.parentProcessInstance
  );
  const coreTaskSkipped = useSelector(
    ({ flowable }) => flowable.formDefinition.coreTaskSkipped
  );
  const coreUnclaimed = useSelector(
    ({ flowable }) => flowable.formDefinition.unclaimed
  );

  const coreTaskCompleted = useSelector(
    ({ flowable }) => flowable.formDefinition.coreTaskCompleted
  );
  useEffect(() => {
    if (coreTaskSkipped) {
      dispatch(hideTaskDetails());
    }
    if (processInstance) {
      setProcessDiagramImageUrl(
        flowable.api.processInstanceDiagram(processInstance.id)
      );
    }
  }, [dispatch, coreTaskSkipped, processInstance, setProcessDiagramImageUrl]);

  useEffect(() => {
    if (coreUnclaimed || coreTaskCompleted) {
      dispatch(hideTaskDetails());
    }
  }, [dispatch, coreUnclaimed, coreTaskCompleted]);

  const onSkip = () => {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">
              Are You sure you want to Skip?.
            </DialogTitle>
            <DialogActions>
              <MonarchButton
                onClick={() => dispatch(closeDialog())}
                color="primary"
                variant="contained"
                size="small"
              >
                {'No'}
              </MonarchButton>
              <MonarchButton
                onClick={() => {
                  const payload = {};
                  dispatch(
                    FlowableActions.flowableCoreSkipTask(
                      payload,
                      props.taskDetails.id
                    )
                  );
                  dispatch(closeDialog());
                  dispatch(closeModal());
                }}
                color="primary"
                variant="contained"
                size="small"
              >
                {'Yes'}
              </MonarchButton>
            </DialogActions>
          </>
        )
      })
    );
  };
  const handleOnUnclaim = () => {
    dispatch(FlowableActions.flowableCoreUnClaimTask(props.taskDetails.id));
    dispatch(closeModal());
  };

  const handleInstanceDiagram = (args) => {
    setTaskActive(false);
    props.handleChangeForm(false);
    setInstanceDiagramChange(args);
  };

  const handleSwitchToTask = () => {
    setTaskActive(true);
    props.handleChangeForm(true);
    setInstanceDiagramChange(null);
  };

  const handleMountInstanceDiagram = () => {
    switch (instanceDiagramChange) {
      case 'process':
        return <ImageDialog imageUrl={processDiagramImageUrl} />;
      case 'instance':
        return <ImageDialog imageUrl={instanceDiagramImageUrl} />;
      case 'rules':
        return (
          <PropertyDecision
            taskId={props.taskDetails.id}
            taskType={props.taskType}
            {...props}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex justify-between w-full flex-wrap">
      <div className={clsx(classes.root, 'flex w-full justify-center')}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSwitchToTask}
          className={clsx(taskActive && classes.activeClass, classes.button)}
        >
          {'Task'}
        </Button>
        {props.taskType === 'open' && (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleOnUnclaim}
              className={classes.button}
            >
              {'unclaim'}
            </Button>

            <Button
              onClick={onSkip}
              color="primary"
              size="small"
              variant="contained"
              className={classes.button}
            >
              {'Skip'}
            </Button>
          </>
        )}
        <Button
          disabled={processDiagramImageUrl === null ? true : false}
          onClick={() => handleInstanceDiagram('process')}
          size="small"
          color="primary"
          variant="contained"
          className={clsx(
            instanceDiagramChange === 'process' && classes.activeClass,
            classes.button
          )}
        >
          {'Process Diagram'}
        </Button>

        <Button
          disabled={instanceDiagramImageUrl === null ? true : false}
          onClick={() => handleInstanceDiagram('instance')}
          size="small"
          color="primary"
          variant="contained"
          className={clsx(
            instanceDiagramChange === 'instance' && classes.activeClass,
            classes.button
          )}
        >
          {'Instance Diagram'}
        </Button>

        <Button
          className={clsx(
            instanceDiagramChange === 'rules' && classes.activeClass,
            classes.button
          )}
          onClick={() => handleInstanceDiagram('rules')}
          size="small"
          color="primary"
          variant="contained"
        >
          {'Rules'}
        </Button>
        {props.taskType === 'close' && <TaskDetailDownload {...props} />}
      </div>
      <div className="w-full">{handleMountInstanceDiagram()}</div>
    </div>
  );
};

export default withRouter(TaskDetailHeader);
