import React, { useEffect, useRef, useState } from 'react';
import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDispatch, useSelector } from 'react-redux';
import TeamRoleList from './TeamRoleList';
import TeamRoleListReadOnly from './TeamRoleListReadOnly';
import * as actions from 'app/main/admin/store/actionTypes';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import Tooltip from '@material-ui/core/Tooltip';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { closeModal, openModal } from 'app/store/actions';
import { FiEdit } from 'react-icons/fi';
import { IconButton, useTheme } from '@material-ui/core';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const TeamRolesPage = (props) => {
  const theme = useTheme();
  const pageLayout = useRef(null);
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ admin }) => admin.flowable);
  const [selectedTeamRole, setSelectedTeamRole] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const partyRoleTypeFlag = useSelector(
    ({ admin }) => admin.propertyAdmin.partyRoleTypeFlag
  );
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: [
        'property_team_role_header',
        'property_team_role_list',
        'property_team_role_list_readonly'
      ],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
  }, [dispatch]);

  const addPartyRoleTeamParties = () => {
    const getObjectHasValue = formPayloadRef.current.customData.filter(
      (res) => {
        if (typeof res.individualFullName === 'object') {
          return res;
        }
        return false;
      }
    );
    dispatch({
      type: actions.ADD_PARTY_ROLE_TEAM_PARTIES_START,
      payload: getObjectHasValue
    });
    dispatch(closeModal());
  };

  const handleOpenDialog = () => {
    dispatch(
      openModal({
        children: !loadingFlag ? (
          ''
        ) : !partyRoleTypeFlag ? (
          <FuseLoading />
        ) : (
          <TeamRoleList config={flowable['property_team_role_list']?.formDef} />
        ),
        title: 'Edit Team Roles',
        buttons: (
          <>
            <MonarchButton
              onClick={addPartyRoleTeamParties}
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
        if (selectedTeamRole !== null) {
          if (selectedTeamRole !== state.teamLeadRole) {
            setLoadingFlag(false);
            dispatch({
              type: actions.PARTY_ROLE_TYPE_LISTDATA_CLEAN
            });
          }
        }
        if (
          state.hasOwnProperty('teamLeadRole') &&
          state.hasOwnProperty('teamLead')
        ) {
          setLoadingFlag(true);
          dispatch({
            type: actions.PARTY_ROLE_TYPE_LISTDATA_CLEAN
          });
          dispatch({
            type: actions.GET_TEAM_ROLE_START,
            partyRoleType: state?.teamLeadRole,
            partyId: state?.teamLead?.partyId
          });
          setSelectedTeamRole(state.teamLeadRole);
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
      contentTitle={'Team Roles'}
      contentToolbar={
        <>
          {partyRoleTypeFlag && (
            <Tooltip title="Update Team Roles">
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
          {!flowable['property_team_role_header']?.processed ||
          !flowable['property_team_role_list_readonly']?.processed ? (
            <FuseLoading />
          ) : (
            <>
              <div className="p-24">
                <Form
                  config={flowable['property_team_role_header']?.formDef}
                  onEvent={onEventHandler}
                  className={flwClasses.form}
                />

                {!loadingFlag ? (
                  ''
                ) : !partyRoleTypeFlag ? (
                  <FuseLoading />
                ) : (
                  <TeamRoleListReadOnly
                    config={
                      flowable['property_team_role_list_readonly']?.formDef
                    }
                  />
                )}
              </div>
            </>
          )}
        </>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
};

export default TeamRolesPage;
