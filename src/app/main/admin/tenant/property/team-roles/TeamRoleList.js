import React from 'react';
import { Form } from '@flowable/forms';
import { useDispatch, useSelector } from 'react-redux';
import { updateModal } from 'app/store/actions';

const TeamRoleList = ({ config }) => {
  const dispatch = useDispatch();
  const partyRoleTypeList = useSelector(
    ({ admin }) => admin.propertyAdmin.partyRoleTypeList
  );
  const payload = {
    customData: partyRoleTypeList
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange' || 'Payload.beforeChange':
        dispatch(updateModal(api.formValid()));
        const payload = api.payload.get();
        dispatch({
          type: 'GET_FLOWABLE_FORM_DATA_START',
          payload
        });
        break;
      default:
        break;
    }

    return true;
  };
  return (
    <>
      <Form config={config} payload={payload} onEvent={onEventHandler} />
    </>
  );
};

export default TeamRoleList;
