import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './../../store/actionTypes';
import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { openDialog, closeDialog } from 'app/store/actions/fuse';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import clsx from 'clsx';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import AddProductModel from './AddProductsModel';

export default function ListProducts(props) {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ admin }) => admin.flowable);
  const [reset, setReset] = useState(false);
  const [deletePayload, setDeletePayload] = useState({});
  const deletePayloadRef = useRef({});
  deletePayloadRef.current = deletePayload;

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'manage-products-vendors',
      fileNames: ['manageProductApprovedList'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
  }, [dispatch, reset]);

  const deleteApprovedProduct = () => {
    dispatch({
      type: Actions.DELETE_APPROVED_PRODUCT,
      data: deletePayloadRef.current,
      fileNames: ['manageProductApprovedList']
    });
    setReset(true);
    dispatch(closeDialog());
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        if (api.payload.get().key === 'Delete') {
          setDeletePayload(api.payload.get());
          dispatch(
            openDialog({
              children: (
                <>
                  <DialogTitle id="alert-dialog-title">
                    Are You sure you want to Delete?.
                  </DialogTitle>
                  <DialogActions>
                    <MonarchButton
                      onClick={() => dispatch(closeDialog())}
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      {'No'}
                    </MonarchButton>
                    <MonarchButton
                      onClick={deleteApprovedProduct}
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      {'Yes'}
                    </MonarchButton>
                  </DialogActions>
                </>
              )
            })
          );
        }
        break;
      default:
        break;
    }
  };
  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Manage Products'}
      leftSidebarContent={<></>}
      contentToolbar={
        <>
          <AddProductModel />
          <div className="show-clear-filter">&nbsp;</div>
        </>
      }
      content={
        <>
          <div className="p-0">
            {!flowable['manageProductApprovedList']?.processed ? (
              <FuseLoading />
            ) : (
              <Form
                className={clsx(flwClasses.form)}
                onEvent={onEventHandler}
                config={flowable['manageProductApprovedList']?.formDef}
              />
            )}
          </div>
        </>
      }
    />
  );
}
