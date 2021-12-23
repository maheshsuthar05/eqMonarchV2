import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './../../store/actionTypes';
import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { closeModal, openModal, updateModal } from 'app/store/actions';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';

function ListProducts() {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const routeParams = useParams();
  const [legalEntity, setLegalEntity] = React.useState(null);
  const legalEntityPayloadRef = React.useRef({});
  legalEntityPayloadRef.current = legalEntity;

  const [dialogData, setDialogData] = React.useState(null);
  const dialogDataRef = React.useRef({});
  dialogDataRef.current = dialogData;

  const flowable = useSelector(({ admin }) => admin.flowable);
  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'manage-products-vendors',
      fileNames: ['manageVendorList', 'manageVendorApprovalDialog'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleModalClick = () => {
    dispatch(
      openModal({
        children: (
          <div className="mb-48">
            {!flowable['manageVendorApprovalDialog']?.processed ? (
              <FuseLoading />
            ) : (
              <Form
                className={clsx(flwClasses.form)}
                onEvent={onEventHandlerModal}
                config={flowable['manageVendorApprovalDialog']?.formDef}
                payload={legalEntityPayloadRef.current}
              />
            )}
          </div>
        ),
        title: `${legalEntityPayloadRef.current?.LEGAL_ENTITY_FULL_NAME}`,
        buttons: (
          <>
            <MonarchButton
              onClick={onFormButtonHandler}
              color="primary"
              variant="contained"
              size="small"
              disabled
            >
              {'Submit'}
            </MonarchButton>
          </>
        )
      })
    );
  };

  const onEventHandlerModal = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        if (api.formValid()) {
          dispatch(updateModal(api.formValid()));
          setDialogData(api.payload.get());
        }
        break;
      default:
        return true;
    }
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        if (api.payload.get().vendorList) {
          setLegalEntity(api.payload.get().vendorList);
          handleModalClick();
        }
        break;
      default:
        return true;
    }
  };

  const onFormButtonHandler = () => {
    dispatch({
      type: Actions.PROCESS_VENDOR_APPROVAL,
      data: dialogDataRef.current,
      fileNames: ['manageVendorList', 'manageVendorApprovalDialog']
    });
    handleClose();
  };

  return (
    <div className="p-0">
      {!flowable['manageVendorList']?.processed ? (
        <FuseLoading />
      ) : (
        <Form
          className={clsx(flwClasses.form)}
          onEvent={onEventHandler}
          config={flowable['manageVendorList']?.formDef}
          payload={{
            data: legalEntity,
            searchText: routeParams.vendorId
          }}
        />
      )}
    </div>
  );
}

export default ListProducts;
