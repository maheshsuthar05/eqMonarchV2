import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@flowable/forms';
import { updateModal } from 'app/store/actions';
import FuseLoading from '@fuse/core/FuseLoading';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import clsx from 'clsx';

function AddAppraisalPage(props) {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();

  const flowable = useSelector(({ flowable }) => flowable.formDefinition);
  const variables = useSelector(({ admin }) => admin.tenant_forms.variables);

  const [payload, setPayload] = React.useState({});

  useEffect(() => {
    if (props.caseId) {
      dispatch(Actions.getForm(props.caseId));
    }
  }, [dispatch, props.caseId]);

  useEffect(() => {
    props.isEdit
      ? dispatch(Actions.convertDataToVariables(props.data))
      : dispatch(Actions.convertDataToVariables());
  }, [props.isEdit, props.data, dispatch]);

  useEffect(() => {
    variables.processed ? setPayload(variables.data) : setPayload({});
  }, [variables]);

  const fn = {
    fetchPayload: () => ({ ...payload }),
    getAdditionaldata: () => ({}),
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

  return !flowable['addStateAppraisal']?.processed ? (
    <FuseLoading />
  ) : (
    <Form
      config={flowable['addStateAppraisal']?.formDef}
      onEvent={fn.onEventHandler}
      additionalData={fn.getAdditionaldata()}
      payload={fn.fetchPayload()}
      className={clsx(flwClasses.form, '')}
      debug={false}
    />
  );
}

export default AddAppraisalPage;
