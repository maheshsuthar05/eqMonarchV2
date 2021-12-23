import { Form } from '@flowable/forms';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { updateModal } from 'app/store/actions';
import * as actions from 'app/common/store/actionTypes';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import _ from '@lodash';

const TenantAddUser = (props) => {
  const flowable = useSelector(({ tenant }) => tenant.flowable);
  const fetchedTenant = useSelector(({ tenant }) => tenant.list.tenant);
  const [tenants, setTenants] = React.useState({});
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();

  useEffect(() => {
    const tenantArray =
      _.has(fetchedTenant, 'tenant') && _.has(fetchedTenant.tenant, 'tenants')
        ? _.map(fetchedTenant.tenant.tenants, 'tenantCode')
        : [];
    setTenants(tenantArray);
  }, [fetchedTenant]);

  const fn = {
    fetchPayload: () => ({
      userList: props.payload,
      tenants,
      isEdit: props.isEdit
    }),
    getAdditionalData: () => ({
      additionalData: {
        isAdd: !props.isEdit
      }
    }),
    generatePassword: () => {
      return (
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
          .substr(0, 7) + '@1100'
      );
    },
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Form.ready':
          if (api.formValid()) {
            dispatch(updateModal(api.formValid(), api.payload.get(), true));
          } else {
            dispatch(updateModal(api.formValid(), {}, false));
          }
          break;
        case 'Payload.afterChange':
          if (
            _.has(api.payload.get(), 'userList') &&
            _.has(api.payload.get().userList, 'masked') &&
            _.isBoolean(api.payload.get().userList.masked)
          ) {
            api.payload.set(
              'userList.masked',
              api.payload.get().userList.masked.toString()
            );
          }
          if (api.formValid()) {
            if (props.isEdit) {
              dispatch({
                type: actions.GET_FLOWABLE_FORM_DATA_START,
                payload: { ...api.payload.get(), ...props.isEdit }
              });
            } else {
              api.payload.get().userList[
                'userPassword'
              ] = fn.generatePassword();
              api.payload.get().userList[
                'confirmPassword'
              ] = api.payload.get().userList.userPassword;
              dispatch({
                type: actions.GET_FLOWABLE_FORM_DATA_START,
                payload: { ...api.payload.get(), ...props.isEdit }
              });
            }

            dispatch(updateModal(api.formValid(), api.payload.get(), true));
          }
          break;
        default:
          break;
      }

      return true;
    }
  };

  return (
    <div className="bg-white">
      {!flowable['tenant_users_add']?.processed ? (
        <FuseLoading />
      ) : (
        <Form
          config={flowable['tenant_users_add']?.formDef}
          additionalData={fn.getAdditionalData()}
          payload={fn.fetchPayload()}
          onEvent={fn.onEventHandler}
          className={clsx(flwClasses.form, '')}
          debug={false}
        />
      )}
    </div>
  );
};

export default TenantAddUser;
