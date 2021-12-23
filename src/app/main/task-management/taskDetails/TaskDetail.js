import { DialogActions, DialogTitle, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Form } from '@flowable/forms';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import clsx from 'clsx';
import * as FlowableActions from 'app/config/flowable-core/store/actions/flowable-core.actions';
import * as Actions from './../store/actionTypes';
import { withRouter } from 'react-router';
import {
  closeBackdrop,
  hideTaskDetails,
  openBackdrop,
  closeModal,
  showTaskDetails,
  openDialog,
  closeDialog
} from 'app/store/actions';
import _ from '@lodash';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import ImageDialog from 'app/main/property/components/ImageDialog';
import { flowable } from 'app/config/api';
import TaskDetailDownload from './TaskDetailDownload';
import Navigation from './Navigation';
import MonarchTabs from '@monarch/core/MonarchTab/MonarchTabs';
import { MonarchTabPanel } from '@monarch/core/MonarchTab';
import { FiSkipForward } from 'react-icons/fi';
import PauseTask from 'app/main/task-management/pauseTask/PauseTask';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import * as TaskActions from 'app/main/task-management/store/actions';
import Alert from '@material-ui/lab/Alert';
import MonarchTitle from '@monarch/core/MonarchTitle/MonarchTitle';
import CloseIcon from '@material-ui/icons/Close';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'none',
    boxShadow: 'none',
    '& .MuiTab-root': {
      minWidth: '0',
      minHeight: '0',
      marginRight: '2px',
      marginBottom: '1px',
      background: '#f8f8fb',
      textTransform: 'capitalize',
      fontSize: '12px',
      padding: '6px 15px'
    },
    '& .MuiTabs-root': {
      minHeight: '0',
      // background: '#ffffff',
      // color: '#000000',
      display: 'inline-block'
    },
    '& .MuiAppBar-root': {
      boxShadow: 'none',
      background: 'none !important'
    },
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center'
    },
    '& .panelBg': {
      background: theme.palette.background.tabsSelectedBg,
      minHeight: '20rem'
    },
    '& .Mui-selected': {
      // background: '#f6fbff !important'
      background: theme.palette.background.tabsSelectedBg
    }
  },
  selectDropdown: {
    border: '1px solid #c4c4c4',
    borderRadius: '0px',
    height: '20px',
    width: '100px'
  },
  tabs: {
    marginLeft: 'auto',
    marginRight: -12
  },
  title: {
    padding: '7px 20px',
    position: 'relative',
    left: '-17px',
    marginBottom: '10px'
  },
  toolbar: {
    height: '34px',
    minHeight: '34px',
    alignItems: 'center'
  },
  iconPad: {
    padding: '0 3px'
  }
}));

const TaskDetail = (props) => {
  const classes = useStyles();
  const flwClasses = useFormStyles();
  const dispatch = useDispatch();
  const [formButton, setformButton] = useState(false);
  const [value, setValue] = React.useState(0);
  const [formPayload, setFormPayload] = useState(null);
  const [ibpoFormState, setIbpoFormState] = useState(false);
  const formDefinition = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.details.formDefinition
  );

  const customPayload = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.details.customData
  );

  let variables = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.details.variables
  );
  const inProgress = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.details.formStatus
  );
  const taskDetail = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.details.display
  );

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

  const taskButtons = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.details.taskButtons
  );

  useEffect(() => {
    dispatch(TaskActions.restTaskButtons());
    if (variables) {
      dispatch(TaskActions.showTaskButtons(props.taskDetails, variables));
    }
  }, [dispatch, props.taskDetails, variables]);

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

  useEffect(() => {
    dispatch({
      type: Actions.REQUEST_TASK_DETAIL_FORM_BY_TASKID,
      taskId: props.taskDetails.id,
      caseInstanceId: props.routeParams.caseInstanceId,
      taskStatus: props.taskType
    });
  }, [
    dispatch,
    props.taskDetails.id,
    props.routeParams.caseInstanceId,
    props.taskType
  ]);

  useEffect(() => {
    if (inProgress) {
      dispatch(closeBackdrop());
    }
  }, [inProgress, dispatch]);

  const fn = {
    setPayload: (api) => {
      setformButton(api.formValid() ? true : false);
      if (_.has(api.payload.get(), 'ibpoFormState')) {
        setIbpoFormState(api.payload.get().ibpoFormState);
        if (_.has(api.payload.get(), 'formState')) {
          if (api.payload.get().formState === 0) {
            api.payload.set(
              'progress',
              TaskActions.useFormProgressingState(api.payload.get())
            );
            setformButton(
              TaskActions.useFormProgressingState(api.payload.get())
                .allFormButtonState
            );
            setFormPayload(api.payload.get());
          } else {
            setformButton(
              TaskActions.useFormProgressingState(api.payload.get())
                .formButtonState
            );
            api.payload.set(
              'progress',
              TaskActions.useFormProgressingState(api.payload.get())
            );
            setFormPayload(api.payload.get());
          }
        }
      }

      if (api.formValid()) {
        setFormPayload(api.payload.get());
      }
      if (!taskDetail.view) {
        dispatch(showTaskDetails(api.payload.get().task));
      }
    },
    onSaveAndCompleteLater: () => {
      dispatch(closeModal());
      dispatch(openBackdrop());
      const checkFormPayload = formPayload ? formPayload : {};
      dispatch(
        FlowableActions.flowableCoreCompleteAndSaveLater(
          formDefinition,
          checkFormPayload,
          props.taskDetails.id,
          props.location.pathname,
          props.taskDetails.assignee
        )
      );
      dispatch(hideTaskDetails());
    },
    onComplete: () => {
      dispatch(closeModal());
      dispatch(openBackdrop());
      dispatch(
        FlowableActions.flowableCoreComplete(
          formPayload,
          props.taskDetails.id,
          props.location.pathname,
          props.taskDetails.assignee
        )
      );
    },
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Form.ready':
          fn.setPayload(api);
          break;
        case 'Payload.afterChange' || 'Payload.beforeChange':
          fn.setPayload(api);
          break;
        default:
          break;
      }
      return true;
    },
    handleChange: (event, newValue) => {
      setValue(newValue);
    },
    processNavigationChildern: () => {
      Navigation.children.map((obj, i) => {
        if (obj.key === 'instanceDiagramImageUrl') {
          obj.disabled = instanceDiagramImageUrl === null ? true : false;
          return true;
        }
        if (obj.key === 'processDiagramImageUrl') {
          obj.disabled = processDiagramImageUrl === null ? true : false;
          return true;
        }
        if (obj.key === 'pauseUnpause') {
          obj.disabled = props.taskType === 'open' ? false : true;
          obj.title = taskButtons.UN_PAUSE === true ? 'Pause' : 'Un-Pause';
          return true;
        }
        return true;
      });
      return Navigation.children;
    },
    onSkip: () => {
      // const payload = {};
      // dispatch(
      //   FlowableActions.flowableCoreSkipTask(payload, props.taskDetails.id)
      // );
      // dispatch(closeModal());
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
    }
  };

  return (
    <>
      <div className={classes.root}>
        <div
          className={clsx(classes.toolbar, 'flex flex-auto justify-between')}
        >
          <MonarchTitle
            title={props.taskDetails.name}
            className={classes.title}
            forceStyles={true}
          />
          <div className={clsx('flex justify-items-center')}>
            <MonarchTabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={fn.handleChange}
              children={fn.processNavigationChildern()}
            />
            {props.taskType === 'open' && (
              <>
                {taskButtons.SKIP && (
                  <Tooltip title="Skip" placement="top-end">
                    <IconButton
                      color="primary"
                      aria-label="maximize"
                      component="span"
                      onClick={fn.onSkip}
                      size="small"
                      className={clsx(classes.iconPad, '')}
                      tool
                    >
                      <FiSkipForward className="icon-Color pr-8 cursor-pointer text-2xl" />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )}

            {props.taskType === 'close' && <TaskDetailDownload {...props} />}
            <Tooltip title="close dialog" placement="top-end">
              <IconButton
                color="primary"
                aria-label="maximize"
                onClick={() => dispatch(closeModal())}
                component="span"
                size="small"
                className={clsx(classes.iconPad, '')}
                tool
              >
                <CloseIcon className="icon-Color pr-8 cursor-pointer text-2xl" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <MonarchTabPanel value={value} index={0} className="panelBg">
          <div className="flex w-full">
            <div className="flex w-full">
              <div className="flex w-full gap-16 p-8 justify-center">
                <div className={clsx(classes.root, 'p-12')}>
                  {!inProgress ? (
                    <FuseLoading />
                  ) : (
                    <>
                      <div
                        className={
                          ibpoFormState
                            ? 'w-full'
                            : 'justify-center m-auto taskDetails'
                        }
                      >
                        {!taskButtons.SAVE && (
                          <span className="flex justify-center font-bold">
                            <Alert severity="info">
                              Task is Paused. Please Un-Pause the task to
                              perform
                            </Alert>
                          </span>
                        )}
                        <Form
                          config={formDefinition}
                          className={clsx(flwClasses.form, '')}
                          onEvent={fn.onEventHandler}
                          payload={
                            formDefinition?.key === 'assignedRoleForm'
                              ? _.has(variables, 'customData')
                                ? variables
                                : customPayload.payload
                              : variables
                          }
                          additionalData={customPayload.additionalData}
                          debug={false}
                        />
                        {props.taskType === 'open' && taskButtons.SAVE && (
                          <div className="flex justify-center">
                            <MonarchButton
                              autoFocus
                              onClick={fn.onComplete}
                              color="primary"
                              variant="contained"
                              disabled={!formButton}
                              className={clsx('mr-12')}
                            >
                              {'Complete'}
                            </MonarchButton>

                            <MonarchButton
                              onClick={fn.onSaveAndCompleteLater}
                              color="primary"
                              variant="contained"
                            >
                              {'Save and Complete Later'}
                            </MonarchButton>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MonarchTabPanel>

        <MonarchTabPanel
          value={value}
          index={instanceDiagramImageUrl === null ? null : 1}
          className="panelBg"
        >
          <div>
            <ImageDialog imageUrl={instanceDiagramImageUrl} />
          </div>
        </MonarchTabPanel>

        <MonarchTabPanel
          value={value}
          index={processDiagramImageUrl === null ? null : 2}
          className="panelBg"
        >
          <div>
            <ImageDialog imageUrl={processDiagramImageUrl} />
          </div>
        </MonarchTabPanel>

        <MonarchTabPanel
          value={value}
          index={
            processDiagramImageUrl === null && instanceDiagramImageUrl === null
              ? 1
              : processDiagramImageUrl === null ||
                instanceDiagramImageUrl === null
              ? 2
              : 3
          }
          className="panelBg"
        >
          <PauseTask taskDetails={props.taskDetails} />
        </MonarchTabPanel>
      </div>
    </>
  );
};

export default withRouter(TaskDetail);
