import React, { useEffect, useRef, useState } from 'react';
import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDefaultGlobalRolesStart,
  updateAllDefaultGlobalRolesStart
} from 'app/main/admin/store/actions/tenant-admin.actions';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import Tooltip from '@material-ui/core/Tooltip';
import _ from 'lodash';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { closeModal, openModal, updateModal } from 'app/store/actions';
import { FiEdit } from 'react-icons/fi';
import { IconButton, useTheme } from '@material-ui/core';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';
import useIsMounted from 'app/common/hooks/useIsMounted';

const DefaultRolesPage = (props) => {
  const pageLayout = useRef(null);
  const isMounted = useIsMounted();
  const theme = useTheme();
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const [formPayload, setFormPayload] = useState(null);
  const flowable = useSelector(({ admin }) => admin.flowable);
  const globalRolesList = useSelector(
    ({ admin }) => admin.propertyAdmin.globalRolesList
  );

  const globalRolesListFlag = useSelector(
    ({ admin }) => admin.propertyAdmin.globalRolesListFlag
  );

  const formPayloadRef = useRef({});
  formPayloadRef.current = formPayload;

  useEffect(() => {
    if (isMounted.current) {
      dispatch({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'tenant-admin',
        fileNames: ['property_default_role_list', 'Property_Roles_List'],
        formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
      });
    }
  }, [isMounted, dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(getAllDefaultGlobalRolesStart());
    }
  }, [isMounted, dispatch]);

  const payload = {
    customData: globalRolesList
  };

  const onFormButtonHandler = () => {
    const getObjectHasValue = formPayloadRef.current.customData.filter(
      (res) => {
        if (typeof res.individualFullName === 'object') {
          return res;
        }
        return false;
      }
    );
    const partyRolePayload = getObjectHasValue.map((res) => {
      return {
        roleType: res.partyRoleType,
        oldPartyId: res.partyId,
        newPartyId: res?.individualFullName?.partyId
      };
    });
    dispatch(updateAllDefaultGlobalRolesStart(partyRolePayload));
    dispatch(closeModal());
  };

  const handleOpenDialog = () => {
    dispatch(
      openModal({
        children: (
          <>
            {!flowable['property_default_role_list']?.processed ? (
              <FuseLoading />
            ) : (
              <div className="bg-white">
                <Form
                  config={flowable['property_default_role_list']?.formDef}
                  payload={payload}
                  onEvent={onEventHandler}
                />
              </div>
            )}
          </>
        ),
        title: 'Edit Default Roles',
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

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange' || 'Payload.beforeChange':
        dispatch(updateModal(api.formValid()));
        if (api.formValid()) {
          setFormPayload(api.payload.get());
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
      contentTitle={'Default Roles'}
      contentToolbar={
        <>
          {!_.isEmpty(payload.customData) && (
            <Tooltip title="Edit Default Roles">
              <IconButton
                color="primary"
                aria-label="maximize"
                component="span"
                onClick={(ev) => handleOpenDialog(ev)}
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
          {!flowable['Property_Roles_List']?.processed ||
          !globalRolesListFlag ? (
            <FuseLoading />
          ) : (
            <div>
              <Form
                className={clsx(flwClasses.form)}
                config={flowable['Property_Roles_List']?.formDef}
                payload={payload}
              />
            </div>
          )}
        </>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
};

export default DefaultRolesPage;
