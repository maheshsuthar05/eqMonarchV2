import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@flowable/forms';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import { updateModal } from 'app/store/actions';
import FuseLoading from '@fuse/core/FuseLoading';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const StateEvictionAdd = (props) => {
  const { modificationMode, caseId } = props;
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ flowable }) => flowable.formDefinition);

  useEffect(() => {
    if (caseId) {
      dispatch(Actions.getForm(caseId));
    }
  }, [dispatch, caseId]);

  const fn = {
    fetchPayload: () => ({ modificationMode, ...props.data, stateEvictionId :props.data.id}),
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

  return !flowable['stateEviction']?.processed ? (
    <FuseLoading />
  ) : (
    <div className="bg-white">
      <Form
        config={flowable['stateEviction']?.formDef}
        payload={fn.fetchPayload()}
        onEvent={fn.onEventHandler}
        className={clsx(flwClasses.form)}
        debug={false}
      />
    </div>
  );
};

export default StateEvictionAdd;