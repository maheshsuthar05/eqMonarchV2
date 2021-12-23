import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { openModal, openDialog, closeDialog } from 'app/store/actions';
import {
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip
} from '@material-ui/core';
import AddStateRoleAssignment from './AddStateRoleAssignment';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import { IoAddCircleOutline } from 'react-icons/io5';
import * as actions from 'app/main/admin/store/actionTypes';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';
import { REFRESH } from 'app/main/admin/store/actions';

function StateRoleAssignmentPage(props) {
  const pageLayout = useRef(null);
  const flwClasses = useFormStyles();
  const dispatch = useDispatch();
  const flowable = useSelector(({ admin }) => admin.flowable);
  const refresh = useSelector(
    ({ admin }) => admin.refresh.STATE_ROLE_ASSIGNMENT
  );

  const [refreshForm, setRefreshForm] = React.useState(false);

  useEffect(() => {
    if (refresh) {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
        dispatch({
          type: REFRESH.PROPERTY.STATE_ROLE_ASSIGNMENT,
          refresh: false
        });
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: [
        'property_state_role_assignment_list',
        'property_state_role_assignment_add'
      ],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: 'GET_STATE_ROLE_ASSIGNMENT_START' });
  }, [dispatch]);

  const fn = {
    fetchPayload: () => ({ refreshForm }),
    onAddStateRoleAssignHandler: (isEdit) => {
      if (isEdit) {
        dispatch({
          type: actions.UPDATE_STATE_ROLE_ASSIGNMENT_START,
          refresh: REFRESH.PROPERTY.STATE_ROLE_ASSIGNMENT
        });
      } else {
        dispatch({
          type: actions.ADD_STATE_ROLE_ASSIGNMENT_START,
          refresh: REFRESH.PROPERTY.STATE_ROLE_ASSIGNMENT
        });
      }
    },
    handleAddStateRoleAssignClick: (data, isEdit) => {
      dispatch(
        openModal({
          children: <AddStateRoleAssignment data={data} isEdit={isEdit} />,
          title: `${isEdit ? `Edit` : `Add`} State / Role Assignment`,
          maxwidth: 'sm',
          buttons: (
            <>
              <MonarchButton
                onClick={() => fn.onAddStateRoleAssignHandler(isEdit)}
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
    },
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Button.click':
          if (config.extraSettings.text === 'Edit') {
            fn.handleAddStateRoleAssignClick(config.$scope, true);
          }
          if (config.extraSettings.text === 'Delete') {
            dispatch(
              openDialog({
                children: (
                  <>
                    <DialogTitle id="alert-dialog-title">
                      Are you sure you want to Delete?
                    </DialogTitle>
                    <DialogActions>
                      <MonarchButton
                        onClick={() => dispatch(closeDialog())}
                        color="primary"
                      >
                        No
                      </MonarchButton>
                      <MonarchButton
                        onClick={() =>
                          dispatch({
                            type: 'DELETE_STATE_ROLE_ASSIGNMENT_START',
                            payload: config.$scope,
                            refresh: REFRESH.PROPERTY.STATE_ROLE_ASSIGNMENT
                          })
                        }
                        color="primary"
                      >
                        Yes
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
    }
  };

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'State/Role Assignment'}
      contentToolbar={
        <>
          <Tooltip title="Add Role Assignment">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => fn.handleAddStateRoleAssignClick({}, false)}
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
          {!flowable['property_state_role_assignment_list']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['property_state_role_assignment_list']?.formDef}
              className={clsx(flwClasses.form, 'listing-page')}
              onEvent={fn.onEventHandler}
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
}

export default StateRoleAssignmentPage;
