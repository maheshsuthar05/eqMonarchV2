import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { updateModal } from 'app/store/actions';
import clsx from 'clsx';
import { Form } from '@flowable/forms';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const VendorServicesManage = (props) => {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ vendor }) => vendor.flowable);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        dispatch(updateModal(api.formValid()));
        if (api.formValid()) {
          dispatch({
            type: 'GET_FLOWABLE_FORM_DATA_START',
            payload: api.payload.get()
          });
        }
        break;
      default:
        break;
    }

    return true;
  };

  return (
    <>
      {!flowable['VendorServicesManage']?.processed ? (
        <FuseLoading />
      ) : (
        <div className="bg-white p-2">
          <Form
            className={clsx(flwClasses.form)}
            config={flowable['VendorServicesManage']?.formDef}
            onEvent={onEventHandler}
          />
        </div>
      )}
    </>
  );
};

export default VendorServicesManage;
