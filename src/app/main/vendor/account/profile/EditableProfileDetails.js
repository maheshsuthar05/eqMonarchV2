import { makeStyles } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { contextInfo } from 'app/common/helpers/common-helper';
import { useSelector,useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { Form } from '@flowable/forms';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import { updateModal } from 'app/store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: '2px'
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold !Important',
    fontSize: '12px'
  }
}));

const EditableProfileDetails = (props) => {
  const classes = useStyles();
  const flwClasses = useFormStyles();
  const userType = contextInfo().userType;
  const dispatch = useDispatch();
  const flowable = useSelector(({ vendor }) => vendor.flowable);
  const [formPayload] = useState({});
  const vendorProfileInformation = useSelector(
    ({ vendor }) => vendor.vendorProfile.vendorProfileInformation
  );
  const formPayloadRef = useRef({});
  formPayloadRef.current = formPayload;
  const additionalData = {
    additionalData: {
      isVendor: userType === 'vendor' ? true : false,
      isAgent: userType === 'agent' ? true : false
    }
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        dispatch(updateModal(api.formValid()));
        if (api.formValid()) {
          if (api.payload.get()) {
            dispatch({ type: 'GET_CHILD_FORM_DATA_CLEAR' });
            dispatch({
              type: 'GET_CHILD_FORM_DATA',
              payload: api.payload.get()
            });
          }
        }
        break;

      default:
        break;
    }

    return true;
  };

  return (
    <div className={classes.root}>
      <div className="inline flex-col sm:inline sm:flex-row editProfile">
        {!flowable['EditVendorProfile']?.processed ? (
          <FuseLoading />
        ) : (
          <Form
            config={flowable['EditVendorProfile']?.formDef}
            additionalData={additionalData}
            payload={vendorProfileInformation}
            className={clsx(flwClasses.form, '')}
            onEvent={onEventHandler}
          />
        )}
      </div>
    </div>
  );
};

export default EditableProfileDetails;
