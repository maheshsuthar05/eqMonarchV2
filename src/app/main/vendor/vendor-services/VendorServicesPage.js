import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { openModal } from 'app/store/actions';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import clsx from 'clsx';
import { IoAddCircleOutline } from 'react-icons/io5';
import * as actions from 'app/main/vendor/store/actionTypes';
import { Form } from '@flowable/forms';
import VendorServicesManage from './VendorServicesManage';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const VendorServicesPage = (props) => {
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const flwClasses = useFormStyles();
  const isMounted = useIsMounted();

  const flowable = useSelector(({ vendor }) => vendor.flowable);
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );
  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  useEffect(() => {
    if (isMounted.current) {
      dispatch({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'vendor',
        fileNames: ['VendorServicesList', 'VendorServicesManage'],
        formAction: actions.VENDOR_FORMDEFIINITION
      });
    }
  }, [dispatch, isMounted]);

  const onFormButtonHandler = () => {
    dispatch({
      type: actions.INSERT_PRODUCT_SERVICES_START,
      payload: formPayloadRef.current
    });
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Button.click':
        if (config.extraSettings.text === 'Delete') {
          const productSubscriptionId = config.extraSettings.script.id;
          dispatch({
            type: actions.UPDATE_VENDOR_PRODUCT_SUBSCRIPTIONS_START,
            payload: productSubscriptionId
          });
        }
        break;
      default:
        break;
    }

    return true;
  };

  const handleServicesModal = (data, isEdit) => {
    dispatch(
      openModal({
        children: <VendorServicesManage />,
        title: isEdit ? 'Edit Vendor Services' : 'Add Vendor Services',
        maxwidth: 'sm',
        buttons: (
          <>
            <MonarchButton
              onClick={onFormButtonHandler}
              color="primary"
              variant="contained"
              size="small"
              disabled
            >
              {'Save'}
            </MonarchButton>
          </>
        )
      })
    );
  };
  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Services'}
      leftSidebarContent={<></>}
      ref={pageLayout}
      contentToolbar={
        <>
          <Tooltip title="Add Services">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => handleServicesModal({}, false)}
              size="small"
            >
              <IoAddCircleOutline />
            </IconButton>
          </Tooltip>
          <div className="show-clear-filter">&nbsp;</div>
        </>
      }
      content={
        <>
          {!flowable['VendorServicesList']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              className={clsx(flwClasses.form)}
              config={flowable['VendorServicesList']?.formDef}
              onEvent={onEventHandler}
            />
          )}
        </>
      }
    />
  );
};

export default VendorServicesPage;
