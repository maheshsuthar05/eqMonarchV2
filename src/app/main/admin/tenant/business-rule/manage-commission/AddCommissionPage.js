import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@flowable/forms';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import { updateModal } from 'app/store/actions';
import FuseLoading from '@fuse/core/FuseLoading';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import clsx from 'clsx';

function AddCommissionPage(props) {
  const { data, isEdit, caseId } = props;
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ flowable }) => flowable.formDefinition);
  const variables = useSelector(({ admin }) => admin.tenant_forms.variables);
  const [payload, setPayload] = React.useState({});

  useEffect(() => {
    if (caseId) {
      dispatch(Actions.getForm(caseId));
    }
  }, [dispatch, caseId]);

  useEffect(() => {
    variables.processed ? setPayload(variables.data) : setPayload({});
  }, [variables]);

  useEffect(() => {
    isEdit
      ? dispatch(Actions.convertDataToVariables(data))
      : dispatch(Actions.convertDataToVariables());
  }, [isEdit, data, dispatch]);

  const fn = {
    fetchPayload: () => ({ ...payload }),
    getAdditionalData: () => ({
      additionalData: {
        isEdit: isEdit
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

  return !flowable['addManageCommission']?.processed ? (
    <FuseLoading />
  ) : (
    <Form
      config={flowable['addManageCommission']?.formDef}
      payload={fn.fetchPayload()}
      additionalData={fn.getAdditionalData()}
      onEvent={fn.onEventHandler}
      className={clsx(flwClasses.form)}
    />
  );
}

export default AddCommissionPage;
