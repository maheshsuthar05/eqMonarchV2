import { Form } from '@flowable/forms';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { updateModal } from 'app/store/actions';
import _ from 'lodash';
import * as actions from 'app/common/store/actionTypes';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const TenantAddRole = ({ isEdit, tenantId, payload }) => {
  const flowable = useSelector(({ tenant }) => tenant.flowable);
  const rowData = useSelector((state) => state.tenant.roleAdd.response);

  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  let dataPayload = {};
  if (isEdit && !_.isNull(rowData)) {
    dataPayload = rowData;
  }

  const additionalData = {
    additionalData: {
      isAdd: !isEdit
    }
  };
  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Form.ready':
        dispatch(updateModal(api.formValid()));
        break;
      case 'Payload.afterChange' || 'Payload.beforeChange':
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

  return !flowable['role_add_form_def']?.processed ? (
    <FuseLoading />
  ) : (
    <div className="bg-white">
      <Form
        config={flowable['role_add_form_def']?.formDef}
        additionalData={additionalData}
        payload={dataPayload}
        onEvent={onEventHandler}
        className={clsx(flwClasses.form, 'listing-page')}
      />
    </div>
  );
};

export default TenantAddRole;
