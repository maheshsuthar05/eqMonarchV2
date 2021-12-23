import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import FuseLoading from '@fuse/core/FuseLoading';
import { Form } from '@flowable/forms';
import * as Actions from '../store/actionTypes';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';

const LegacyCloseTaskList = (props) => {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();

  const flowable = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.flowable
  );

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: props.file.path,
      fileNames: [props.file.name],
      formAction: Actions.TASKMANAGMENT_FORMDEFIINITION
    });
  }, [dispatch, props.file.name, props.file.path]);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
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
          onEvent={onEventHandler}
        />
      )}
    </>
  );
};

export default withRouter(LegacyCloseTaskList);
