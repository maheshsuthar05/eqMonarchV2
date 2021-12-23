import { Form } from '@flowable/forms';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple';
import { updateModal } from 'app/store/actions';

function AddLegalEntityPage(props) {
  const { data, isEdit } = props;
  const dispatch = useDispatch();
  const flowable = useSelector(({ admin }) => admin.flowable);

  let payload = {};
  if (isEdit) {
    payload = data;
  }

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        if (api.formValid()) {
          dispatch(updateModal(api.formValid()));
          const payload = api.payload.get();
          dispatch({
            type: 'GET_FLOWABLE_FORM_DATA_START',
            payload: payload
          });
        }
        break;
      default:
        break;
    }
  };

  return !flowable['add_legal_entity']?.processed ? (
    <FuseLoading />
  ) : (
    <MonarchPageSimple
      innerScroll
      content={
        <>
          <Form
            config={flowable['add_legal_entity']?.formDef}
            className="listing-page"
            onEvent={onEventHandler}
            payload={payload}
          />
        </>
      }
    />
  );
}

export default AddLegalEntityPage;
