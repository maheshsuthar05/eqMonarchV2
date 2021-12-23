import { Form } from '@flowable/forms';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, withRouter } from 'react-router';
import useIsMounted from 'app/common/hooks/useIsMounted';
import {
  resourceDeleteStart,
  fetchResourceListingFormStart,
  resourceUpload,
  resourceDownload,
  resourceListRefresh
} from '../store/actions';
import {
  resourceAddStart,
  resourceEditStart
} from 'app/main/tenant/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, updateModal } from 'app/store/actions';
import FuseLoading from '@fuse/core/FuseLoading';
import ConfirmationDialog from 'app/common/components/ConfirmationDialog';
import TenantAddPrivilege from '../tenant-add-privilege/TenantAddPrivilegePage';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import * as Actions from 'app/main/tenant/store/actionTypes';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import { RiFileUploadLine, RiFileDownloadLine } from 'react-icons/ri';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as actions from 'app/common/store/actionTypes';
import _ from 'lodash';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const TenantPrivilegeList = (props) => {
  const isMounted = useIsMounted();
  const flwClasses = useFormStyles();
  const routeParams = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle] = useState('Delete confirmation');
  const [dataToDelete, setDataToDelete] = useState({});
  const stateAction = useSelector(
    ({ tenant }) => tenant.resourceList.stateAction
  );
  const flowable = useSelector(({ tenant }) => tenant.flowable);
  const formDefinition = useSelector(
    ({ tenant }) => tenant.resourceList.formDefinition
  );
  const uploadFile = useSelector(
    ({ tenant }) => tenant.resourceList.uploadFile
  );
  const uploadFileTime = useSelector(
    ({ tenant }) => tenant.resourceList.uploadFileTime
  );

  const inProgress = useSelector(
    ({ tenant }) => tenant.resourceList.inProgress
  );
  const refreshAfterAddEdit = useSelector(
    ({ tenant }) => tenant.resourceAdd.inProgress
  );
  const user = useSelector(({ auth }) => auth.user);
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );
  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  useEffect(() => {
    if (isMounted.current) {
      dispatch({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'tenant-IAM',
        fileNames: [
          'tenant_upload_resource_privilege',
          'resource_add_form_def'
        ],
        formAction: Actions.TENANT_FORMDEFIINITION
      });
    }
  }, [isMounted, dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(fetchResourceListingFormStart());
      dispatch(resourceListRefresh(false));
    }
  }, [isMounted, dispatch]);

  const handleClickDelete = () => {
    setDialogOpen(true);
  };

  const dialogHandleClose = (action) => {
    if (action) {
      dispatch(
        resourceDeleteStart(
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
      dispatch(
        resourceEditStart(user.tenantCode, formPayloadRef.current.payload)
      );
    } else {
      dispatch(
        resourceAddStart(user.tenantCode, formPayloadRef.current.payload)
      );
    }
  };
  const onFormUploadButtonHandler = () => {
    dispatch(resourceUpload(formPayloadRef.current, user.tenantCode));
  };

  const onEventUploadHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        if (api.formValid()) {
          dispatch(updateModal(api.formValid()));
          if (_.has(api.payload.get(), 'resFile')) {
            let payload = api.payload.get().resFile[0].fileData;
            dispatch({
              type: actions.GET_FLOWABLE_FORM_DATA_START,
              payload
            });
          }
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleUploadResourceModal = () => {
    dispatch(
      openModal({
        children: (
          <>
            {!flowable['tenant_upload_resource_privilege']?.processed ? (
              <FuseLoading />
            ) : (
              <Form
                config={flowable['tenant_upload_resource_privilege']?.formDef}
                onEvent={onEventUploadHandler}
              />
            )}
          </>
        ),
        title: 'Upload Resources',
        buttons: (
          <>
            <MonarchButton
              onClick={onFormUploadButtonHandler}
              color="primary"
              variant="contained"
              size="small"
              disabled
            >
              Upload
            </MonarchButton>
          </>
        )
      })
    );
  };

  const handleAddResourcePrivileges = (isEdit, payload) => {
    dispatch(
      openModal({
        children: (
          <TenantAddPrivilege
            isEdit={isEdit}
            payload={payload}
            tenantId={routeParams.tenantId}
          />
        ),
        title: isEdit ? 'Edit Resource' : 'Add Resource',
        buttons: (
          <>
            <MonarchButton
              onClick={onFormButtonHandler}
              color="primary"
              variant="contained"
              size="small"
              disabled
            >
              {isEdit ? 'Save' : 'Add'}
            </MonarchButton>
          </>
        )
      })
    );
  };

  const handleResourceDownload = () => {
    dispatch(resourceDownload());
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
        } else if (config.extraSettings.text === 'View') {
          handleAddResourcePrivileges(true, dataPayload);
        }
        break;
      default:
        break;
    }
    return true;
  };

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Resource Privilege'}
      contentToolbar={
        <>
          <Tooltip title="Upload">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => handleUploadResourceModal()}
              size="small"
            >
              <RiFileUploadLine className={theme.icons.fontSize}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => handleResourceDownload()}
              size="small"
            >
              <RiFileDownloadLine className={theme.icons.fontSize}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Resource Privileges">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => handleAddResourcePrivileges(false, {})}
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
          {!stateAction || refreshAfterAddEdit || inProgress ? (
            <FuseLoading />
          ) : (
            <Form
              config={formDefinition}
              payload={{ uploadFile, uploadFileTime }}
              onEvent={onEventHandler}
              className={clsx(flwClasses.form, 'listing-page')}
            />
          )}
        </>
      }
      leftSidebarContent={<></>}
    />
  );
};

export default withRouter(TenantPrivilegeList);
