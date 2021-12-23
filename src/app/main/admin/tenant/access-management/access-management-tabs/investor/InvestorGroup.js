import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@flowable/forms';
import { DecisionRuleApiConfig } from 'app/config/api';
import { updateModal } from 'app/store/actions';
import FuseLoading from '@fuse/core/FuseLoading';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';

export default function InvestorGroup(props) {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const user = useSelector(({ auth }) => auth.user);
  const flowable = useSelector(({ admin }) => admin.flowable);

  const fn = {
    fetchPayload: () => ({
      ...props.data
    }),
    getAdditionalData: () => ({
      additionalData: {
        url: DecisionRuleApiConfig.api.getInvestorGroup,
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

  return !flowable['Add_Investor_to_Group']?.processed ? (
    <FuseLoading />
  ) : (
    <Form
      config={flowable['Add_Investor_to_Group']?.formDef}
      onEvent={fn.onEventHandler}
      additionalData={fn.getAdditionalData()}
      payload={fn.fetchPayload()}
      className={clsx(flwClasses.form)}
      debug={false}
    />
  );
}
