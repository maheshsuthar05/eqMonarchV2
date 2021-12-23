import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import FlowableHelper from 'app/common/helpers/flowable-helper';
import { fetchPropertyAddFormStart } from 'app/main/property/store/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateModal } from 'app/store/actions';
import * as actions from 'app/common/store/actionTypes';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';

const PropertyAddPage = ({ match, history, location }) => {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const addStateAction = useSelector(
    ({ property }) => property.add.stateAction
  );
  const formDefinition = useSelector(
    ({ property }) => property.add.formDefinition
  );
  const inProgress = useSelector(({ property }) => property.add.inProgress);
  const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    dispatch(fetchPropertyAddFormStart(user.tenantCode));
  }, [dispatch, user.tenantCode]);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange' || 'Payload.beforeChange':
        dispatch(updateModal(api.formValid()));
        if (api.formValid()) {
          const payload = api.payload.get();
          const flowablePayload = FlowableHelper.buildPayload(
            formDefinition,
            payload
          );
          dispatch({
            type: actions.GET_FLOWABLE_FORM_DATA_START,
            payload: { payload, flowablePayload }
          });
        }
        break;
      default:
        break;
    }

    return true;
  };

  return inProgress || !addStateAction ? (
    <FuseLoading />
  ) : (
    <div className="propertyPageContent">
      <Form
        className={clsx(flwClasses.form)}
        config={formDefinition}
        onEvent={onEventHandler}
      />
    </div>
  );
};

export default PropertyAddPage;
