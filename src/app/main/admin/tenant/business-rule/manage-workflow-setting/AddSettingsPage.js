import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@flowable/forms';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import { updateModal } from 'app/store/actions';
import FuseLoading from '@fuse/core/FuseLoading';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';

function AddSettingsPage(props) {
  const { data, isEdit, caseId } = props;
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();

  const user = useSelector(({ auth }) => auth.user);
  const flowable = useSelector(({ flowable }) => flowable.formDefinition);
  const variables = useSelector(({ admin }) => admin.tenant_forms.variables);

  const [payload, setPayload] = React.useState({});

  useEffect(() => {
    if (caseId) {
      dispatch(Actions.getForm(caseId));
    }
  }, [dispatch, caseId]);

  useEffect(() => {
    isEdit
      ? dispatch(Actions.convertDataToVariables(data))
      : dispatch(Actions.convertDataToVariables());
  }, [isEdit, data, dispatch]);

  useEffect(() => {
    variables.processed ? setPayload(variables.data) : setPayload({});
  }, [variables]);

  const fn = {
    fetchPayload: () => ({ ...payload }),
    getAdditionaldata: () => ({
      additionalData: {
        tenantCode: user.tenantCode
      }
    }),
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Form.ready':
          if (api.formValid()) {
            dispatch(updateModal(api.formValid(), api.payload.get(), true));
            dispatch({
              type: 'GET_FLOWABLE_FORM_DATA_START',
              payload: api.payload.get()
            });
          } else {
            dispatch(updateModal(api.formValid(), {}, false));
          }
          break;
        case 'Payload.afterChange':
          if (api.formValid()) {
            dispatch(updateModal(api.formValid(), api.payload.get(), true));
            dispatch({
              type: 'GET_FLOWABLE_FORM_DATA_START',
              payload: api.payload.get()
            });
          } else {
            dispatch(updateModal(api.formValid(), {}, false));
          }
          break;
        default:
          break;
      }
    }
  };

  return !flowable['addManageWorkflowSettings']?.processed ? (
    <FuseLoading />
  ) : (
    <Form
      config={flowable['addManageWorkflowSettings']?.formDef}
      onEvent={fn.onEventHandler}
      additionalData={fn.getAdditionaldata()}
      payload={fn.fetchPayload()}
      className={clsx(flwClasses.form, '')}
      debug={false}
    />
  );
}

export default AddSettingsPage;
