import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router';
import FuseLoading from '@fuse/core/FuseLoading';
import { Form } from '@flowable/forms';
import { customFetch } from '../store/actions';
import { assignTaskOpenPayload } from 'app/store/actions';
import * as Actions from '../store/actionTypes';
import TaskDetail from 'app/main/task-management/taskDetails/TaskDetail';
import { openModal } from 'app/store/actions';
import _ from 'lodash';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';

const AssignedTaskOpenList = (props) => {
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

  const refresh = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.assignedTask.refresh
  );

  const additionalDataGetter = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.assignedTask.additionalData
  );

  const [additionalData, setAdditionalData] = useState({});
  const [refreshForm, setRefreshForm] = React.useState(false);

  useEffect(() => {
    if (refresh) {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
        dispatch({ type: Actions.OPEN_TASK_REFRESH, refresh: false });
      }, 2000);
    }
    return () => {
      dispatch({ type: Actions.OPEN_TASK_REFRESH, refresh: false });
    };
  }, [dispatch, refreshForm, refresh]);

  useEffect(() => {
    setAdditionalData(additionalDataGetter);
    return () => {
      setAdditionalData({});
    };
  }, [setAdditionalData, additionalDataGetter]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: props.file.path,
      fileNames: [props.file.name],
      formAction: Actions.TASKMANAGMENT_FORMDEFIINITION
    });
  }, [dispatch, props.file.name, props.file.path, routeParams.caseInstanceId]);

  useEffect(() => {
    dispatch(assignTaskOpenPayload(routeParams.caseInstanceId));
  }, [dispatch, routeParams.caseInstanceId]);

  const fn = {
    fetchPayload: () => ({
      refreshForm,
      capitalize: (data) => _.capitalize(data)
    }),
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Payload.afterChange' || 'Payload.beforeChange':
          if (_.has(api.payload.get(), 'taskList')) {
            fn.handleOpenModal(api.payload.get().taskList);
          }
          break;
        default:
          break;
      }
    },
    handleOpenModal: (args) => {
      dispatch(
        openModal({
          children: (
            <TaskDetail
              taskDetails={args}
              taskType={`open`}
              routeParams={routeParams}
            />
          ),
          maxwidth: 'lg',
          minHeight: '20rem'
        })
      );
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
          payload={fn.fetchPayload()}
          additionalData={additionalData}
          onEvent={fn.onEventHandler}
          debug={false}
        />
      )}
    </>
  );
};

export default withRouter(AssignedTaskOpenList);
