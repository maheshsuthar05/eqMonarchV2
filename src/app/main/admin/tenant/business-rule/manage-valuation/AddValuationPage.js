import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { fetchFormByProcess } from 'app/config/flowable-core/store/actions';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import clsx from 'clsx';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import { updateModal } from 'app/store/actions';

const AddValuationPage = (props) => {
  const flwClasses = useFormStyles();
  const { data, isEdit } = props;
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const flowable = useSelector(({ flowable }) => flowable.formDefinition);

  const variables = useSelector(({ admin }) => admin.tenant_forms.variables);

  const [payload, setPayload] = React.useState({});

  useEffect(() => {
    dispatch(
      fetchFormByProcess(
        'internal',
        props.processDefinitionId,
        props.caseDefinitionKey
      )
    );
  }, [dispatch, props]);

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

  return !flowable[props.caseDefinitionKey]?.processed ? (
    <FuseLoading />
  ) : (
    <Form
      className={clsx(flwClasses.form)}
      config={flowable[props.caseDefinitionKey]?.formDef}
      onEvent={fn.onEventHandler}
      payload={fn.fetchPayload()}
      additionalData={fn.getAdditionaldata()}
      debug={false}
    />
  );
};

export default AddValuationPage;
