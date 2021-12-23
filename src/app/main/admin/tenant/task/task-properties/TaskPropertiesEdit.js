import { Form } from '@flowable/forms';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import * as actions from 'app/common/store/actionTypes';
import * as Action from 'app/main/admin/store/actions';
import { updateModal } from 'app/store/actions';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';

function TaskPropertiesEdit(props) {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ admin }) => admin.flowable);
  const partyRolesList = useSelector(
    ({ admin }) => admin.taskAdmin.partyRolesList
  );
  let payload = {};
  let additionalData = {};
  if (props.isEdit) {
    const dataModified = {
      ...props.data,
      ...Action.taskEditFormData(props.data, partyRolesList),
      taskNotificationData: partyRolesList
    };
    payload = dataModified;
  }

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange' || 'Payload.beforeChange':
        dispatch(updateModal(api.formValid()));
        if (api.formValid()) {
          dispatch({
            type: actions.GET_FLOWABLE_FORM_DATA_START,
            payload: { formData: api.payload.get(), isEdit: props.isEdit }
          });
        }
        break;
      default:
        break;
    }

    return true;
  };

  return !flowable['task_properties_edit']?.processed ? (
    <FuseLoading />
  ) : (
    <div className="bg-white">
    <Form 
      className={clsx(flwClasses.form, 'taskPropertyEdit')}
      config={flowable['task_properties_edit']?.formDef}
      onEvent={onEventHandler}
      additionalData={additionalData}
      payload={payload}
    />
    </div>
  );
}

export default TaskPropertiesEdit;
