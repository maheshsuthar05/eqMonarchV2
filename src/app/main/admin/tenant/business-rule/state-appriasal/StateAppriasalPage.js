import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import AddApprisalPage from './AddApprisalPage';
import { AdminManagerApiConfig } from 'app/config/api';
import clsx from 'clsx';
import { flowableCustomFetch } from 'app/common/helpers/common-helper';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import _ from '@lodash';
import {
  closeDialog,
  closeModal,
  openDialog,
  openModal
} from 'app/store/actions';
import {
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip
} from '@material-ui/core';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { IoAddCircleOutline } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import { REFRESH } from 'app/main/admin/store/actions';

const StateAppriasalPage = (props) => {
  const pageLayout = useRef(null);
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const FLOWABLE_CASE_KEY = 'adminManageStateAppraisal';
  const FLOWABLE_PROCESS_KEY = 'adminManageStateAppraisalEventProducer';
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );
  const flowable = useSelector(({ admin }) => admin.flowable);
  const user = useSelector(({ auth }) => auth.user);
  const caseDef = useSelector(({ admin }) => admin.tenant_forms);
  const processId = useSelector(({ admin }) => admin.tenant_forms.processId);
  const refresh = useSelector(
    ({ admin }) => admin.refresh.MANAGE_STATE_APPRAISAL
  );

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  const [refreshForm, setRefreshForm] = React.useState(false);
  const [caseId, setCaseId] = React.useState();
  const [hideAddButton, setHideAddButton] = React.useState(true);

  useEffect(() => {
    if (refresh) {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
        dispatch({
          type: REFRESH.SETTINGS.MANAGE_STATE_APPRAISAL,
          payload: false
        });
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh]);

  useEffect(() => {
    dispatch(Actions.getCaseData(user.tanentCode, FLOWABLE_CASE_KEY));
  }, [user.tanentCode, FLOWABLE_CASE_KEY, dispatch]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['state_appraisal_listing'],
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
    refreshForm: () => {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
        dispatch({
          type: REFRESH.SETTINGS.MANAGE_STATE_APPRAISAL,
          payload: false
        });
      }, 2000);
      return true;
    },
    fetchPayload: () => ({ refreshForm }),
    getAdditionalData: () => ({
      additionalData: {
        url: AdminManagerApiConfig.api.getCaseQueryUrl,
        tenantCode: user.tenantCode
      }
    }),
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Datatable.dataLoaded':
          setRefreshForm(true);
          state.rows.length === 1
            ? setHideAddButton(false)
            : setHideAddButton(true);
          break;
        case 'Form.ready':
          fn.refreshForm();
          break;
        case 'Payload.afterChange':
          if (_.has(api.payload.get(), 'stateAppriasal')) {
            if (api.payload.get().stateAppriasal.key === 'Edit') {
              fn.handleAdd(api.payload.get().stateAppriasal.DATA, true);
              setRefreshForm(false);
            }
            if (api.payload.get().stateAppriasal.key === 'Delete') {
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
                                api.payload.get().stateAppriasal.DATA,
                                REFRESH.SETTINGS.MANAGE_STATE_APPRAISAL
                              )
                            );
                            dispatch(closeDialog());
                            setRefreshForm(false);
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
    },
    onFormButtonHandler: (payload, isEdit) => {
      if (
        !formPayloadRef.current.hasOwnProperty('stateAppraisalId') &&
        !isEdit
      ) {
        formPayloadRef.current['stateAppraisalId'] = uuidv4();
      }
      const variables = [];

      Object.keys(formPayloadRef.current).map((item) => {
        const type = typeof formPayloadRef.current[item];
        variables.push({
          name: item,
          type: type === 'object' ? 'json' : type,
          value: formPayloadRef.current[item]
        });
        return item;
      });

      let targetPayload = {
        processDefinitionId: processId,
        businessKey: formPayloadRef.current.stateAppraisalId,
        variables: variables
      };

      const uniqueSearchPayload = Actions.uniqueSearchVariable(
        FLOWABLE_CASE_KEY,
        variables,
        'stateAppraisalId'
      );

      if (isEdit) {
        dispatch(
          Actions.update(
            user.tenantCode,
            uniqueSearchPayload,
            targetPayload.variables,
            FLOWABLE_CASE_KEY,
            payload.id,
            REFRESH.SETTINGS.MANAGE_STATE_APPRAISAL
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
            REFRESH.SETTINGS.MANAGE_STATE_APPRAISAL
          )
        );
      }
      dispatch(closeModal());
    },
    handleAdd: (data, isEdit) => {
      dispatch(
        openModal({
          children: (
            <AddApprisalPage
              data={data}
              isEdit={isEdit}
              caseDefinitionKey={FLOWABLE_CASE_KEY}
              processDefinitionId={FLOWABLE_PROCESS_KEY}
              caseId={caseId}
            />
          ),
          title: `${isEdit ? `Edit` : `Add`} State Appraisal`,
          maxwidth: 'sm',
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
    }
  };

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'State Appraisal'}
      contentToolbar={
        <>
          {hideAddButton && (
            <Tooltip title="Add State Appraisal">
              <IconButton
                color="primary"
                aria-label="maximize"
                component="span"
                onClick={() => fn.handleAdd({}, false)}
                size="small"
              >
                <IoAddCircleOutline />
              </IconButton>
            </Tooltip>
          )}
          <div className="show-clear-filter">&nbsp;</div>
        </>
      }
      content={
        <>
          {!flowable['state_appraisal_listing']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['state_appraisal_listing']?.formDef}
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

export default StateAppriasalPage;
