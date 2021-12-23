import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import clsx from 'clsx';
import AddSettingsPage from './AddSettingsPage';
import {
  closeDialog,
  closeModal,
  openDialog,
  openModal
} from 'app/store/actions';
import { AdminManagerApiConfig } from 'app/config/api';
import { flowableCustomFetch } from 'app/common/helpers/common-helper';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import Tooltip from '@material-ui/core/Tooltip';
import { DialogActions, DialogTitle, IconButton } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import _ from '@lodash';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import { v4 as uuidv4 } from 'uuid';
import { REFRESH } from 'app/main/admin/store/actions';

const ManageWorkflowSettingPage = (props) => {
  const pageLayout = useRef(null);
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const FLOWABLE_CASE_KEY = 'adminManageWorkflowSetting';
  const FLOWABLE_PROCESS_KEY = 'adminWorkFlowSettingEventProducer';
  const user = useSelector(({ auth }) => auth.user);

  const refresh = useSelector(
    ({ admin }) => admin.refresh.MANAGE_WORKFLOW_SETTING
  );
  const flowable = useSelector(({ admin }) => admin.flowable);
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );
  const caseDef = useSelector(({ admin }) => admin?.tenant_forms);
  const processId = useSelector(({ admin }) => admin.tenant_forms.processId);

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  const [refreshForm, setRefreshForm] = React.useState(false);
  const [caseId, setCaseId] = React.useState();

  useEffect(() => {
    if (refresh) {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
        dispatch({
          type: REFRESH.SETTINGS.MANAGE_WORKFLOW_SETTING,
          payload: false
        });
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['manage_workflow_settings_listing'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
    dispatch(Actions.getCaseId(FLOWABLE_CASE_KEY));
    dispatch(Actions.getProcessId(FLOWABLE_PROCESS_KEY));
  }, [dispatch]);

  useEffect(() => {
    if (caseDef[FLOWABLE_CASE_KEY]?.caseId) {
      setCaseId(caseDef[FLOWABLE_CASE_KEY]?.caseId);
    }
  }, [caseDef, FLOWABLE_CASE_KEY]);

  const fn = {
    fetchPayload: () => ({ refreshForm }),
    getAdditionalData: () => ({
      additionalData: {
        url: AdminManagerApiConfig.api.getCaseQueryUrl,
        tenantCode: user.tenantCode
      }
    }),
    saveWorkflowSettings: (isEdit, data) => {
      if (!formPayloadRef.current.hasOwnProperty('workflowId') && !isEdit) {
        formPayloadRef.current['workflowId'] = uuidv4();
      }
      const variables = [];
      Object.keys(formPayloadRef.current).map((item) => {
        const getType = typeof formPayloadRef.current[item];
        let type = '';
        if (getType === 'object') {
          type = 'json';
        } else if (getType === 'number') {
          type = 'double';
        } else {
          type = getType;
        }
        variables.push({
          name: item,
          type: type,
          value: formPayloadRef.current[item]
        });
        return item;
      });

      let targetPayload = {
        processDefinitionId: processId,
        businessKey: formPayloadRef.current.workflowId,
        variables: variables
      };

      const uniqueSearchPayload = Actions.uniqueSearchVariable(
        FLOWABLE_CASE_KEY,
        variables,
        'investorGroups'
      );

      if (isEdit) {
        dispatch(
          Actions.update(
            user.tenantCode,
            uniqueSearchPayload,
            targetPayload.variables,
            FLOWABLE_CASE_KEY,
            data.id,
            REFRESH.SETTINGS.MANAGE_WORKFLOW_SETTING
          )
        );
      } else {
        targetPayload.caseDefinitionId = caseId;
        dispatch(
          Actions.save(
            user.tenantCode,
            uniqueSearchPayload,
            targetPayload,
            FLOWABLE_CASE_KEY,
            REFRESH.SETTINGS.MANAGE_WORKFLOW_SETTING
          )
        );
      }
      dispatch(closeModal());
    },
    handleAddSettingClick: (data, isEdit) => {
      dispatch(
        openModal({
          children: (
            <AddSettingsPage data={data} isEdit={isEdit} caseId={caseId} />
          ),
          title: `${isEdit ? `Edit` : `Add`} Manage Workflow Settings`,
          maxwidth: 'md',
          buttons: (
            <>
              <MonarchButton
                onClick={() => fn.saveWorkflowSettings(isEdit, data)}
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
        case 'Payload.afterChange':
          if (_.has(api.payload.get(), 'manageWorkflowSettingsList')) {
            if (api.payload.get().manageWorkflowSettingsList.key === 'Edit') {
              fn.handleAddSettingClick(
                api.payload.get().manageWorkflowSettingsList.DATA,
                true
              );
            }

            if (api.payload.get().manageWorkflowSettingsList.key === 'Delete') {
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
                          onClick={() => {
                            dispatch(
                              Actions.deleteStateEvictionById(
                                api.payload.get().manageWorkflowSettingsList
                                  .DATA,
                                REFRESH.SETTINGS.MANAGE_WORKFLOW_SETTING
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
            }
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
      contentTitle={'Manage Workflow Settings'}
      contentToolbar={
        <>
          <Tooltip title="Add Setting">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => fn.handleAddSettingClick({}, false)}
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
          {!flowable['manage_workflow_settings_listing']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['manage_workflow_settings_listing']?.formDef}
              className={clsx(flwClasses.form, 'listing-page')}
              onEvent={fn.onEventHandler}
              additionalData={fn.getAdditionalData()}
              fetch={flowableCustomFetch(
                fn.getAdditionalData().additionalData.url,
                Actions.customfetchPayload(FLOWABLE_CASE_KEY)
              )}
              payload={fn.fetchPayload()}
            />
          )}
        </>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
};
export default ManageWorkflowSettingPage;
