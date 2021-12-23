import { Form } from '@flowable/forms';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { updateModal } from 'app/store/actions';
import * as actions from 'app/common/store/actionTypes';

const TenantAddPrivilege = ({ payload, isEdit }) => {
  const dispatch = useDispatch();
  const flowable = useSelector(({ tenant }) => tenant.flowable);
  let dataPayload = {};
  if (isEdit) {
    dataPayload = payload;
  }

  let additionalData = {
    additionalData: {
      isAdd: !isEdit
    }
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Form.ready':
        if (api.formValid()) {
          dispatch(updateModal(api.formValid()));
        }
        break;
      case 'Payload.afterChange':
        dispatch(updateModal(api.formValid()));
        if (api.formValid()) {
          dispatch({
            type: actions.GET_FLOWABLE_FORM_DATA_START,
            payload: { payload: api.payload.get(), isEdit }
          });
        }
        break;
      default:
        break;
    }

    return true;
  };

  return (
    <>
      {!flowable['resource_add_form_def']?.processed ? (
        <FuseLoading />
      ) : (
        <div className="bg-white">
          <Form
            config={flowable['resource_add_form_def']?.formDef}
            additionalData={additionalData}
            payload={dataPayload}
            onEvent={onEventHandler}
          />
        </div>
      )}
    </>
  );
};

export default TenantAddPrivilege;
