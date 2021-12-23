import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import AddValuationPage from './AddValuationPage';
import {
  closeDialog,
  closeModal,
  openDialog,
  openModal
} from 'app/store/actions';
import { AdminManagerApiConfig } from 'app/config/api';
import clsx from 'clsx';
import { flowableCustomFetch } from 'app/common/helpers/common-helper';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import Tooltip from '@material-ui/core/Tooltip';
import { DialogActions, DialogTitle, IconButton } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import _ from '@lodash';
import { v4 as uuidv4 } from 'uuid';
import { REFRESH } from 'app/main/admin/store/actions';

const ManageValuationPage = (props) => {
  const pageLayout = useRef(null);
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const FLOWABLE_CASE_KEY = 'adminValuation';
  const FLOWABLE_PROCESS_KEY = 'adminValuationEventProducer';
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );
  const flowable = useSelector(({ admin }) => admin.flowable);
  const user = useSelector(({ auth }) => auth.user);
  const caseDef = useSelector(({ admin }) => admin.tenant_forms);
  const processId = useSelector(({ admin }) => admin.tenant_forms.processId);
  const refresh = useSelector(({ admin }) => admin.refresh.MANAGE_VALUVATION);

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
          type: REFRESH.RULES.MANAGE_VALUVATION,
          payload: false
        });
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['manage_valuations_listing'],
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
    handleAddValuationClick: (data, isEdit) => {
      dispatch(
        openModal({
          children: (
            <AddValuationPage
              data={data}
              isEdit={isEdit}
              caseDefinitionKey={FLOWABLE_CASE_KEY}
              processDefinitionId={FLOWABLE_PROCESS_KEY}
            />
          ),
          title: isEdit ? 'Edit Valuation' : 'Add Valuation',
          maxwidth: 'md',
          buttons: (
            <>
              <MonarchButton
                onClick={() => fn.onFormButtonHandler(data, isEdit)}
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
    onFormButtonHandler: (payload, isEdit) => {
      if (!formPayloadRef.current.hasOwnProperty('valuationId') && !isEdit) {
        formPayloadRef.current['valuationId'] = uuidv4();
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
        return true;
      });

      let targetPayload = {
        processDefinitionId: processId,
        businessKey: formPayloadRef.current.valuationId,
        variables: variables
      };

      const uniqueSearchPayload = Actions.uniqueSearchVariable(
        FLOWABLE_CASE_KEY,
        variables,
        'agentType',
        'investorGroups',
        'states',
        'propertyType',
        'occupancy',
        'valueBand',
        'lRVRequired'
      );

      if (isEdit) {
        dispatch(
          Actions.update(
            user.tenantCode,
            uniqueSearchPayload,
            targetPayload.variables,
            FLOWABLE_CASE_KEY,
            payload.id,
            REFRESH.RULES.MANAGE_VALUVATION
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
            REFRESH.RULES.MANAGE_VALUVATION
          )
        );
      }
      dispatch(closeModal());
    },
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Payload.afterChange':
          if (_.has(api.payload.get(), 'manageValuationsList')) {
            if (api.payload.get().manageValuationsList.key === 'Edit') {
              fn.handleAddValuationClick(
                api.payload.get().manageValuationsList.DATA,
                true
              );
            }
            if (api.payload.get().manageValuationsList.key === 'Delete') {
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
                                api.payload.get().manageValuationsList.DATA,
                                REFRESH.RULES.MANAGE_VALUVATION
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
      contentTitle={'Manage Valuation'}
      contentToolbar={
        <>
          <Tooltip title="Add Valution">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => fn.handleAddValuationClick({}, false)}
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
          {!flowable['manage_valuations_listing']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['manage_valuations_listing']?.formDef}
              className={clsx(flwClasses.form, 'listing-page')}
              additionalData={fn.getAdditionalData()}
              fetch={flowableCustomFetch(
                fn.getAdditionalData().additionalData.url,
                Actions.customfetchPayload(FLOWABLE_CASE_KEY)
              )}
              payload={fn.fetchPayload()}
              onEvent={fn.onEventHandler}
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

export default ManageValuationPage;
