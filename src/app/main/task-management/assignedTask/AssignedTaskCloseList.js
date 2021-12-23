import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router';
import FuseLoading from '@fuse/core/FuseLoading';
import { Form } from '@flowable/forms';
import { customFetch } from '../store/actions';
import { assignTaskClosePayload, openModal } from 'app/store/actions';
import * as Actions from '../store/actionTypes';
import TaskDetail from 'app/main/task-management/taskDetails/TaskDetail';
import _ from 'lodash';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';

const AssignedTaskCloseList = (props) => {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const flwClasses = useFormStyles();

  const user = useSelector(({ auth }) => auth.user);

  const flowable = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.flowable
  );

  const payload = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.assignedTask.payload
  );

  const additionalDataGetter = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.assignedTask.additionalData
  );

  const [additionalData, setAdditionalData] = useState({});

  useEffect(() => {
    setAdditionalData(additionalDataGetter);
  }, [setAdditionalData, additionalDataGetter]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: props.file.path,
      fileNames: [props.file.name],
      formAction: Actions.TASKMANAGMENT_FORMDEFIINITION
    });
    dispatch(assignTaskClosePayload(routeParams.caseInstanceId));
  }, [dispatch, props.file.path, props.file.name, routeParams.caseInstanceId]);

  const handleOpenModal = (args) => {
    dispatch(
      openModal({
        children: (
          <TaskDetail
            taskDetails={args}
            taskType={`close`}
            routeParams={routeParams}
          />
        ),
        maxwidth: 'lg',
        minHeight: '20rem'
      })
    );
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        if (_.has(api.payload.get(), 'taskList')) {
          handleOpenModal(api.payload.get().taskList);
        }
        break;
      default:
        break;
    }
  };
  return (
    <>
      {!flowable[props.file.name]?.processed ? (
        <FuseLoading />
      ) : (
        <Form
          className={clsx(flwClasses.form)}
          config={flowable[props.file.name].formDef}
          fetch={customFetch(
            additionalData?.additionalData?.url,
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

export default withRouter(AssignedTaskCloseList);
