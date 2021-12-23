import { Form } from '@flowable/forms';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { updateModal } from 'app/store/actions';
import * as actions from 'app/main/tenant/store/actionTypes';
import _ from 'lodash';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';

function TenantPropertyRolesAdd(props) {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ tenant }) => tenant.flowable);
  const [formData, setFormData] = useState({});
  const roleUsers = useSelector(({ tenant }) => tenant.propertyRole.roleUsers);
  const partyRoleTypeList = useSelector(
    ({ tenant }) => tenant.propertyRole.partyRoleTypeList
  );
  let payload = {
    isEdit: !props.isEdit
  };
  let additionalData = {};
  if (props.isEdit) {
    payload = {
      ...props.data,
      isEdit: !props.isEdit,
      listForAdd: roleUsers
    };
  } else {
    if (_.has(formData, 'partyRoleType')) {
      const roleTypeCheck = _.includes(
        partyRoleTypeList,
        formData.partyRoleType
      );
      additionalData = {
        roleTypeFlag: !roleTypeCheck
      };
    }
  }
  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange' || 'Payload.beforeChange':
        dispatch(updateModal(api.formValid()));
        setFormData(api.payload.get());
        if (api.formValid()) {
          dispatch({
            type: actions.TENANT_ADD_EDIT_PROPERTY_ROLE_FORM_DATA,
            payload: { formData: api.payload.get(), isEdit: props.isEdit }
          });
        }
        break;
      default:
        break;
    }

    return true;
  };

  return !flowable['tenant_property_roles_add']?.processed ? (
    <FuseLoading />
  ) : (
    <div className="bg-white">
    <Form
      config={flowable['tenant_property_roles_add']?.formDef}
      className={clsx(flwClasses.form, 'listing-page')}
      onEvent={onEventHandler}
      additionalData={additionalData}
      payload={payload}
    />
    </div>
  );
}

export default TenantPropertyRolesAdd;
