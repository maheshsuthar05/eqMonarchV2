import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router';
import * as Actions from '../store/actionTypes';
import * as FlowableActions from 'app/config/flowable-core/store/actions/flowable-core.actions';
import FuseLoading from '@fuse/core/FuseLoading';
import { Form } from '@flowable/forms';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple';
import { customFetch } from '../store/actions';
import { formDefinitionByFileName } from 'app/config/flowable-core/store/actions';
import { claimsTaskClosePayload } from 'app/store/actions';

const ClaimCloseTaskList = (props) => {
  const dispatch = useDispatch();
  const routeParams = useParams();

  const user = useSelector(({ auth }) => auth.user);

  const flowable = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.flowable
  );

  const isClaimsTaskProcessed = useSelector(
    ({ TaskManagementApp }) =>
      TaskManagementApp.claimsTask.isClaimsTaskProcessed
  );
  const payload = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.claimsTask.payload
  );

  const additionalDataGetter = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.claimsTask.additionalData
  );

  const [process, setProcess] = useState(false);

  const [additionalData, setAdditionalData] = useState({});

  useEffect(() => {
    setAdditionalData(additionalDataGetter);
    setProcess(true);
  }, [setAdditionalData, setProcess, additionalDataGetter]);

  useEffect(() => {
    // dispatch({ type: 'FLOWABLE_DEFINITION_BY_JSON_CLEAR' });
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: props.file.path,
      fileNames: [props.file.name],
      formAction: Actions.TASKMANAGMENT_FORMDEFIINITION
    });
    dispatch(claimsTaskClosePayload(routeParams.caseInstanceId));
  }, [dispatch, claimsTaskClosePayload]);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        switch (api.payload.get()?.taskList?.key) {
          case 'claim':
            claimsProcess(api.payload.get().taskList);
            break;
          case 'skip':
            skipProcess(api.payload.get().taskList);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  const claimsProcess = (taskList) => {
    dispatch({ type: Actions.PROCESS_TASK_CLAIM, taskList });
  };

  const skipProcess = (taskList) => {
    const payload = {};
    dispatch(FlowableActions.flowableCoreSkipTask(payload, taskList.id));
  };

  return (
    <>
      {!isClaimsTaskProcessed || !process ? (
        <FuseLoading />
      ) : (
        <Form
          config={formDefinitionByFileName(
            flowable.formDefinition,
            props.file.name
          )}
          fetch={customFetch(
            additionalData?.additionalData.url,
            payload,
            user.tenantCode
          )}
          additionalData={additionalData}
          onEvent={onEventHandler}
        />
      )}
    </>
  );
};

export default withRouter(ClaimCloseTaskList);
