import { Form } from '@flowable/forms';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, withRouter } from 'react-router';
import { roleViewStart, roleDeleteStart } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import ConfirmationDialog from 'app/common/components/ConfirmationDialog';
import TenantAddRole from '../tenant-add-role/TenantAddRolePage';
import { openModal } from 'app/store/actions';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import * as Actions from 'app/main/tenant/store/actionTypes';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { roleAddStart, roleEditStart } from 'app/main/tenant/store/actions';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const TenantRoleList = () => {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const routeParams = useParams();
  const pageLayout = useRef(null);
  const flowable = useSelector(({ tenant }) => tenant.flowable);
  const inProgress = useSelector((state) => state.tenant.roleList.inProgress);
  const refreshAfterAddEdit = useSelector(
    (state) => state.tenant.roleAdd.inProgress
  );
  const user = useSelector(({ auth }) => auth.user);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle] = useState('Delete confirmation');
  const [dataToDelete, setDataToDelete] = useState({});
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );
  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-IAM',
      fileNames: ['role_listing_form_def', 'role_add_form_def'],
      formAction: Actions.TENANT_FORMDEFIINITION
    });
  }, [dispatch]);

  const handleClickDelete = () => {
    setDialogOpen(true);
  };

  const dialogHandleClose = (action) => {
    if (action) {
      dispatch(
        roleDeleteStart(
          user.tenantCode,
          dataToDelete.dataPayload,
          routeParams.tenantId
        )
      );
    }
    setDialogOpen(false);
  };

  const onFormButtonHandler = () => {
    if (formPayloadRef.current.isEdit) {
      dispatch(roleEditStart(user.tenantCode, formPayloadRef.current.payload));
    } else {
      dispatch(roleAddStart(user.tenantCode, formPayloadRef.current.payload));
    }
  };

  const handleOpenModal = (isEdit, payload) => {
    dispatch(
      openModal({
        children: (
          <TenantAddRole
            isEdit={isEdit}
            payload={payload}
            tenantId={routeParams.tenantId}
          />
        ),
        title: isEdit ? 'Edit Access Groups' : 'Add Access Groups',
        buttons: (
          <>
            <MonarchButton
              onClick={onFormButtonHandler}
              color="primary"
              variant="contained"
              size="small"
              disabled
            >
              Save
            </MonarchButton>
          </>
        )
      })
    );
  };

  const onEventHandler = (eventName, config, state, api) => {
    let dataPayload;
    switch (eventName) {
      case 'Button.click':
        dataPayload = config.$scope;
        if (config.extraSettings.text === 'Delete') {
          setDialogMessage(
            `Are you sure you want to delete "${dataPayload.name}" ?`
          );
          handleClickDelete();
          setDataToDelete({
            dataPayload
          });
        } else {
          dispatch(
            roleViewStart(user.tenantCode, dataPayload, routeParams.tenantId)
          );
          handleOpenModal(true, dataPayload);
        }
        break;
      default:
        break;
    }
    return true;
  };

  return (
    <MonarchPageCarded
      contentTitle={'Access Groups'}
      contentToolbar={
        <>
          <Tooltip title="Add access groups">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => handleOpenModal(false, {})}
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
          <ConfirmationDialog
            keepMounted
            open={dialogOpen}
            onClose={dialogHandleClose}
            message={dialogMessage}
            title={dialogTitle}
          />
          {!flowable['role_listing_form_def']?.processed ||
          refreshAfterAddEdit ||
          inProgress ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['role_listing_form_def']?.formDef}
              onEvent={onEventHandler}
              className={clsx(flwClasses.form, 'listing-page')}
            />
          )}
        </>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
};

export default withRouter(TenantRoleList);
