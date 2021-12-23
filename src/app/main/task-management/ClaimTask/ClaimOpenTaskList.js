import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actionTypes';
import * as FlowableActions from 'app/config/flowable-core/store/actions/flowable-core.actions';
import { useParams, withRouter } from 'react-router';
import { customFetch } from '../store/actions';
import {
  claimsTaskOpenPayload,
  _cookies,
  openModal,
  updateModal
} from 'app/store/actions';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const ClaimOpenTaskList = (props) => {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const routeParams = useParams();
  const [formPayload, setFormPayload] = useState('');
  const formPayloadRef = useRef('');
  formPayloadRef.current = formPayload;
  const user = useSelector(({ auth }) => auth.user);
  const flwFormRefresh = useSelector(
    ({ flowableFormRefresh }) => flowableFormRefresh.formRefreshFlag
  );
  const flowable = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.flowable
  );
  const claimsTask = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.claimsTask
  );

  const claimsProcess = (taskList) => {
    dispatch({ type: Actions.PROCESS_TASK_CLAIM, taskList });
  };

  useEffect(() => {
    dispatch(claimsTaskOpenPayload(routeParams.caseInstanceId));
  }, [dispatch, routeParams.caseInstanceId]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: props.file.path,
      fileNames: [props.file.name],
      formAction: Actions.TASKMANAGMENT_FORMDEFIINITION
    });
  }, [dispatch, props.file.path, props.file.name]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tasks/claim-task',
      fileNames: ['ReAssignTask'],
      formAction: Actions.TASKMANAGMENT_FORMDEFIINITION
    });
  }, [dispatch]);

  const handleOnUnclaim = (id) => {
    dispatch(FlowableActions.flowableCoreUnClaimTask(id, false));
  };

  const onFormButtonHandler = (task) => {
    dispatch({
      type: Actions.CLAIMS_TASK_REASSIGN_START,
      payload: { assignee: formPayloadRef.current, taskList: task.id }
    });
  };

  const onEventHandlerReAssign = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        dispatch(updateModal(api.formValid()));
        if (api.formValid()) {
          if (state.assignToMe) {
            setFormPayload(_cookies.getCookies('displayName'));
          } else {
            setFormPayload(state.assignee.id);
          }
        }
        break;
      default:
        break;
    }
  };

  const handleUploadModal = (task) => {
    dispatch(
      openModal({
        children: (
          <>
            {!flowable['ReAssignTask']?.processed ? (
              <FuseLoading />
            ) : (
              <>
                <Form
                  onEvent={onEventHandlerReAssign}
                  config={flowable['ReAssignTask']?.formDef}
                />
              </>
            )}
          </>
        ),
        title: 'Re-Assign Task',
        buttons: (
          <>
            <MonarchButton
              onClick={() => onFormButtonHandler(task)}
              color="primary"
              variant="contained"
              size="small"
              disabled
            >
              {'Save'}
            </MonarchButton>
          </>
        )
      })
    );
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        switch (api.payload.get()?.taskList?.key) {
          case 'claim':
            api.payload.get().taskList.payload.assignee === 'anonymousUser'
              ? handleOnUnclaim(api.payload.get().taskList.id)
              : claimsProcess(api.payload.get().taskList);
            break;
          case 'skip':
            skipProcess(api.payload.get().taskList);
            break;
          case 'Re-Assign':
            handleUploadModal(api.payload.get().taskList);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  const skipProcess = (taskList) => {
    const payload = {};
    dispatch(FlowableActions.flowableCoreSkipTask(payload, taskList.id));
  };
  return (
    <>
      {!flowable[props.file.name]?.processed || flwFormRefresh ? (
        <FuseLoading />
      ) : (
        <Form
          className={clsx(flwClasses.form, 'taskClaim')}
          config={flowable[props.file.name].formDef}
          fetch={customFetch(
            claimsTask?.additionalData?.additionalData?.url,
            claimsTask?.payload,
            user.tenantCode
          )}
          additionalData={claimsTask.additionalData}
          onEvent={onEventHandler}
        />
      )}
    </>
  );
};

export default withRouter(ClaimOpenTaskList);
