import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router';
import FuseLoading from '@fuse/core/FuseLoading';
import { userDeleteStart, userResetPasswordStart } from '../store/actions';
import { userAddStart, userEditStart } from 'app/main/tenant/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, openDialog, openModal } from 'app/store/actions';
import TenantAddUser from '../tenant-add-user/TenantAddUserPage';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import * as Actions from 'app/main/tenant/store/actionTypes';
import Tooltip from '@material-ui/core/Tooltip';
import { DialogActions, DialogTitle, IconButton } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import _ from '@lodash';

const TenantUserList = (props) => {
  const flwClasses = useFormStyles();
  const pageLayout = useRef(null);
  const inProgress = useSelector((state) => state.tenant.userList.inProgress);
  const refresh = useSelector(({ tenant }) => tenant.userAdd.inProgress);
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  const flowable = useSelector(({ tenant }) => tenant.flowable);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [refreshForm, setRefreshForm] = React.useState(false);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-IAM',
      fileNames: ['tenant_users_listing', 'tenant_users_add'],
      formAction: Actions.TENANT_FORMDEFIINITION
    });
  }, [dispatch]);

  useEffect(() => {
    if (refresh || inProgress) {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh, inProgress]);

  const fn = {
    fetchPayload: () => ({ refreshForm }),
    confirmation: (message, payload, status) => {
      dispatch(
        openDialog({
          children: (
            <>
              <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
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
                  onClick={() => {
                    dispatch(
                      userDeleteStart(
                        user.tenantCode,
                        payload,
                        user.tenantId,
                        status
                      )
                    );
                    dispatch(closeDialog());
                  }}
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
    },
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Payload.afterChange':
          if (_.has(api.payload.get(), 'userListData')) {
            _.has(api.payload.get().userListData, 'key') &&
              api.payload.get().userListData.key === 'edit' &&
              fn.handleAddUserModal(true, api.payload.get().userListData.DATA);

            _.has(api.payload.get().userListData, 'key') &&
              api.payload.get().userListData.key === 'sendPasswordLink' &&
              dispatch(
                userResetPasswordStart(
                  api.payload.get().userListData.DATA,
                  user.realm
                )
              );

            if (
              _.has(api.payload.get().userListData, 'key') &&
              api.payload.get().userListData.key === 'activeDeactive'
            ) {
              if (
                api.payload.get().userListData.DATA.inetUserStatus ===
                'Inactive'
              ) {
                if (api.payload.get().userListData.DATA.tenantId.length > 1) {
                  dispatch({
                    type: 'API_CALL_ERROR',
                    error:
                      'This User is associated to multiple tenants and hence cannot be Activated?',
                    atAction: 'Tenant Add',
                    showError: true
                  });
                } else {
                  fn.confirmation(
                    `Are you sure you want to Activate "${
                      api.payload.get().userListData.DATA.id
                    }" ?`,
                    api.payload.get().userListData.DATA,
                    'Activate'
                  );
                }
              }

              if (
                api.payload.get().userListData.DATA.inetUserStatus === 'Active'
              ) {
                if (api.payload.get().userListData.DATA.tenantId.length > 1) {
                  dispatch({
                    type: 'API_CALL_ERROR',
                    error:
                      'This User is associated to multiple tenants and hence cannot be Inactivated?',
                    atAction: 'Tenant Add',
                    showError: true
                  });
                } else {
                  fn.confirmation(
                    `Are you sure you want to Inactivate "${
                      api.payload.get().userListData.DATA.id
                    }" ?`,
                    api.payload.get().userListData.DATA,
                    'Inactivate'
                  );
                }
              }
            }
          }
          break;
        default:
          break;
      }

      return true;
    },
    handleAddUserModal: (isEdit, payload) => {
      dispatch(
        openModal({
          children: <TenantAddUser isEdit={isEdit} payload={payload} />,
          title: isEdit ? 'Edit User' : 'Add User',
          buttons: (
            <>
              <MonarchButton
                onClick={() => fn.onFormButtonHandler()}
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
    },
    onFormButtonHandler: () => {
      if (formPayloadRef.current.isEdit) {
        dispatch(
          userEditStart(
            user.tenantCode,
            formPayloadRef.current,
            user.tenantId,
            user.realm
          )
        );
      } else {
        dispatch(
          userAddStart(
            user.tenantCode,
            formPayloadRef.current,
            user.tenantId,
            user.realm
          )
        );
      }
    }
  };

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Users'}
      contentToolbar={
        <>
          <Tooltip title="Add User">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => fn.handleAddUserModal(false, {})}
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
          {!flowable['tenant_users_listing']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['tenant_users_listing']?.formDef}
              onEvent={fn.onEventHandler}
              className={clsx(flwClasses.form, 'listing-page')}
              payload={fn.fetchPayload()}
              debug={false}
            />
          )}
        </>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
};

export default withRouter(TenantUserList);
