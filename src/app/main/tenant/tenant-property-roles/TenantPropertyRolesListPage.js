import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { openModal, closeDialog, openDialog } from 'app/store/actions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import * as actions from 'app/main/tenant/store/actionTypes';
import TenantPropertyRolesAdd from './TenantPropertyRolesAdd';
import * as Actions from 'app/main/tenant/store/actionTypes';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';

function TenantPropertyRolesListPage(props) {
  const isMounted = useIsMounted();
  const flwClasses = useFormStyles();
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const flowable = useSelector(({ tenant }) => tenant.flowable);
  const addFormData = useSelector(
    ({ tenant }) => tenant.propertyRole.addEditFormData
  );
  const tableRefresh = useSelector(
    ({ tenant }) => tenant.propertyRole.tableRefresh
  );
  const formPayloadRef = useRef({});
  formPayloadRef.current = addFormData;

  useEffect(() => {
    if (isMounted.current) {
      dispatch({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'tenant-IAM',
        fileNames: ['tenant_property_roles_list', 'tenant_property_roles_add'],
        formAction: Actions.TENANT_FORMDEFIINITION
      });
    }
  }, [isMounted, dispatch]);

  const onFormButtonHandler = () => {
    dispatch({
      type: actions.TENANT_PROPERTY_ROLES_ADD_START,
      payload: formPayloadRef.current
    });
  };

  function handleAddLegalEntityClick(data, isEdit) {
    dispatch(
      openModal({
        children: <TenantPropertyRolesAdd data={data} isEdit={isEdit} />,
        title: isEdit ? 'Edit Property Role' : 'Add Property Role',
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
  }

  const handleAddRolesModal = () => {
    dispatch({ type: actions.GET_TENANT_PROPERTY_ROLES_START });
    handleAddLegalEntityClick({}, false);
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Button.click':
        if (config.extraSettings.text === 'Edit') {
          handleAddLegalEntityClick(config.$scope, true);
          dispatch({
            type: actions.TENANT_PROPERTY_ROLES_USERS_START,
            partyRoleType: config.$scope.partyRoleType
          });
        }
        if (config.extraSettings.text === 'Delete') {
          dispatch(
            openDialog({
              children: (
                <>
                  <DialogTitle id="alert-dialog-title">
                    Are You sure you want to delete{' '}
                    {config.$scope.partyRoleType} ?
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
                      onClick={() => {
                        dispatch({
                          type: actions.TENANT_PROPERTY_ROLES_DELETE_START,
                          payload: config.$scope
                        });
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
      contentTitle={'Property Roles'}
      leftSidebarContent={<></>}
      contentToolbar={
        <>
          <Tooltip title="Add Property Roles">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => handleAddRolesModal()}
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
          {!flowable['tenant_property_roles_list']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['tenant_property_roles_list']?.formDef}
              className={clsx(flwClasses.form, 'listing-page')}
              onEvent={onEventHandler}
              additionalData={{ tableRefresh }}
            />
          )}
        </>
      }
      ref={pageLayout}
    />
  );
}

export default TenantPropertyRolesListPage;
