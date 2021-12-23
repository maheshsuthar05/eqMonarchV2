import React, { useEffect, useRef, useState } from 'react';
import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { RoleAssignApiConfig } from 'app/config/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAssignedUserRoleFormStart,
  fetchAssignedUserRoleStart,
  updateUsersRolesStart
} from '../store/actions/role-assign.actions';
import { hasAccess } from 'app/common/helpers/common-helper';
import { resourceKeys } from 'app/main/property/resources/ResourceConfig';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import { useTheme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import * as Actions from 'app/main/property/store/actionTypes';
import { openModal, updateModal } from 'app/store/actions';
import Tooltip from '@material-ui/core/Tooltip';
import _ from 'lodash';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { FiEdit } from 'react-icons/fi';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import clsx from 'clsx';

const AssignedRolePage = (props) => {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const theme = useTheme();
  const [formData, setFormData] = useState(null);
  const flowable = useSelector(({ property }) => property.flowable);
  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  const propertyId = useSelector(
    ({ property }) => property.get.property?.property?.propertyId
  );

  const contextResources = useSelector(
    ({ common }) => common.IAMResource.contextResources
  );
  const fetchedRoles = useSelector(
    ({ property }) => property.roles.fetchedRolesUser
  );

  useEffect(() => {
    if (propertyId) {
      dispatch(fetchAssignedUserRoleFormStart());
      dispatch(fetchAssignedUserRoleStart(propertyId));
    }
  }, [propertyId, dispatch]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'property',
      fileNames: ['Property_Roles_List', 'Property_Roles_Edit'],
      formAction: Actions.PROPERTY_FLOWABLE_FORMDEF
    });
  }, [dispatch]);

  const fn = {
    getAdditionalData: () => ({
      additionalData: {
        url: RoleAssignApiConfig.api.get_user_role_group,
        isSelectEnable: false,
        isCancel: true,
        isSave: hasAccess(
          contextResources,
          resourceKeys.Property_Tab_Roles_Save
        )
      }
    }),
    fetchPayload: () => ({
      customData: fetchedRoles?.listPropertyPartyRoleLoanXref[0]
    }),
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Payload.afterChange':
          dispatch(updateModal(api.formValid()));
          if (api.formValid()) {
            setFormData(api.payload.get());
          }
          break;
        default:
          break;
      }
      return true;
    },
    onFormButtonHandler: () => {
      dispatch(updateUsersRolesStart(formPayloadRef.current, propertyId));
    },
    handleOpenDialog: () => {
      dispatch(
        openModal({
          children: (
            <>
              {!flowable['Property_Roles_Edit']?.processed ? (
                <FuseLoading />
              ) : (
                <Form
                  className={clsx(flwClasses.form)}
                  config={flowable['Property_Roles_Edit']?.formDef}
                  payload={fn.fetchPayload()}
                  additionalData={fn.getAdditionalData()}
                  onEvent={fn.onEventHandler}
                />
              )}
            </>
          ),
          title: 'Edit Roles',
          buttons: (
            <>
              <MonarchButton
                onClick={fn.onFormButtonHandler}
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
  };

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Roles'}
      leftSidebarContent={<></>}
      contentToolbar={
        <>
          {!_.isEmpty(fn.fetchPayload().customData) && (
            <Tooltip title="Edit Roles">
              <IconButton
                color="primary"
                aria-label="maximize"
                component="span"
                onClick={(ev) => fn.handleOpenDialog(ev)}
                size="small"
              >
                <FiEdit className={theme.icons.fontSize} />
              </IconButton>
            </Tooltip>
          )}
          <div className="show-clear-filter">&nbsp;</div>
        </>
      }
      content={
        <>
          {!flowable['Property_Roles_List']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              className={clsx(flwClasses.form)}
              config={flowable['Property_Roles_List'].formDef}
              payload={fn.fetchPayload()}
            />
          )}
        </>
      }
    />
  );
};

export default AssignedRolePage;
