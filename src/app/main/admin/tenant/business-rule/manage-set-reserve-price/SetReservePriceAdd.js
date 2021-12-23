import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { updateModal } from 'app/store/actions';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';

export default function SetReservePriceCRUD(props) {
  const flwClasses = useFormStyles();
  const dispatch = useDispatch();

  const flowable = useSelector(({ flowable }) => flowable.formDefinition);
  const variables = useSelector(({ admin }) => admin.tenant_forms.variables);

  const user = useSelector(({ auth }) => auth.user);

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
    if (variables.processed) {
      variables.data.investorGroup = {
        investorGroupId: variables.data.investorGroupId,
        investorGroup: variables.data.investorGroup
      };
      setPayload(variables.data);
    } else {
      setPayload({});
    }
  }, [variables]);
  const fn = {
    fetchPayload: () => ({ ...payload, isEdit: props.isEdit }),
    getAdditionaldata: () => ({
      additionalData: {
        tenantCode: user.tenantCode
      },
      isEdit: props.isEdit
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
}
