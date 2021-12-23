import { Form } from '@flowable/forms';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple';
import { updateModal } from 'app/store/actions';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';

function AddStateRoleAssignment(props) {
  const { data, isEdit } = props;
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ admin }) => admin.flowable);
  const partiesList = useSelector(
    ({ admin }) => admin.propertyAdmin.partiesList
  );

  const fn = {
    fetchPayload: () => ({ ...data, isEdit }),
    getAdditionalData: () => ({
      partiesList
    }),
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Form.ready':
          if (api.formValid()) {
            dispatch(updateModal(api.formValid(), api.payload.get(), true));
          } else {
            dispatch(updateModal(api.formValid(), {}, false));
          }
          break;
        case 'Payload.afterChange' || 'Payload.beforeChange':
          if (api.formValid()) {
            dispatch(updateModal(api.formValid(), api.payload.get(), true));
          } else {
            dispatch(updateModal(api.formValid(), {}, false));
          }
          break;
        default:
          break;
      }

      return true;
    }
  };

  return !flowable['property_state_role_assignment_add']?.processed ? (
    <FuseLoading />
  ) : (
    <MonarchPageSimple
      innerScroll
      content={
        <>
          <Form
            config={flowable['property_state_role_assignment_add']?.formDef}
            className={clsx(flwClasses.form, 'role-Assignment')}
            onEvent={fn.onEventHandler}
            additionalData={fn.getAdditionalData()}
            payload={fn.fetchPayload()}
            debug={false}
          />
        </>
      }
    />
  );
}

export default AddStateRoleAssignment;
