import { Form } from '@flowable/forms';
import React, { useEffect } from 'react';
import {
  groupAddStart,
  groupEditStart,
  fetchGroupAddFormStart
} from 'app/main/tenant/store/actions';
import * as Actions from './../store/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { TenantApiConfig } from 'app/config/api';
import { closeModal } from 'app/store/actions';

const TenantAddGroup = (props) => {
  const dispatch = useDispatch();
  const stateAction = useSelector((state) => state.tenant.groupAdd.stateAction);
  const formDefinition = useSelector(
    (state) => state?.tenant?.groupAdd?.formDefinition
  );

  let dataPayload = useSelector((state) => state.tenant.groupAdd.response);

  if (!props.isEdit) {
    dataPayload = {};
  }

  const user = useSelector(({ auth }) => auth.user);

  const additionalData = {
    additionalData: {
      url: TenantApiConfig.api.getUsers,
      isAdd: !props.isEdit
    }
  };

  useEffect(() => {
    if (props.isEdit) {
      dispatch({
        type: Actions.GROUP_VIEW_START,
        tenantCode: user.tenantCode,
        payload: props.payload
      });
    } else {
      dispatch(fetchGroupAddFormStart());
    }
    dispatch({ type: Actions.GROUP_ADD_FORM_FETCH_START });
  }, [dispatch, props.isEdit, props.payload, user.tenantCode]);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Link.click':
        dispatch(closeModal());
        break;
      case 'Button.click':
        if (props.isEdit) {
          dispatch(groupEditStart(user.tenantCode, api.payload.get()));
        } else {
          dispatch(groupAddStart(user.tenantCode, api.payload.get()));
        }
        break;
      default:
        return true;
    }

    return true;
  };
  return !stateAction ? (
    <FuseLoading />
  ) : (
    <div className="p-12">
      <Form
        config={formDefinition}
        additionalData={additionalData}
        payload={dataPayload}
        onEvent={onEventHandler}
      />
    </div>
  );
};

export default TenantAddGroup;
