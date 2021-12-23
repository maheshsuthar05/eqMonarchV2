import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { AdminManagerApiConfig } from 'app/config/api';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import {
  closeDialog,
  closeModal,
  openDialog,
  openModal
} from 'app/store/actions';
import StateEvictionAdd from './StateEvictionAdd';
import * as CommonActions from 'app/common/store/actions/predefined-list.actions';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import Tooltip from '@material-ui/core/Tooltip';
import { DialogActions, DialogTitle, IconButton } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import _ from '@lodash';
import { REFRESH, stateEvictionActionDELETE, updateStateEvictionId, saveStateEvictionId } from 'app/main/admin/store/actions';
import * as actions from 'app/main/admin/store/actionTypes';

const StateEvictionPage = (props) => {
  const pageLayout = useRef(null);
  const user = useSelector(({ auth }) => auth.user);
  const FLOWABLE_CASE_KEY = 'adminStateEviction';
  const FLOWABLE_PROCESS_KEY = 'adminStateEvictionEventProducer';
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const payload = {};

  const STATE_EVICTION_ORDER_TYPE_LIST = [
    {
      label: 'Eviction Order',
      value: 'EVICTION_ORDER'
    }
  ];

  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );
  const refresh = useSelector(({ admin }) => admin.refresh.STATE_EVICTION);

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  const STATE_US_MAP = useSelector(
    ({ common }) => common.predefinedList.stateUSMap
  );
  const DELIVERABLE_MATRIX_MAP = useSelector(
    ({ common }) => common.predefinedList.deliverableMatrixMap
  );
  const EVICTION_TYPE_MAP = useSelector(
    ({ common }) => common.predefinedList.evictionTypeMap
  );
  const flowable = useSelector(({ admin }) => admin.flowable);

  const caseDef = useSelector(({ admin }) => admin.tenant_forms);
  const processId = useSelector(({ admin }) => admin.tenant_forms.processId);
  const [caseId, setCaseId] = React.useState();

  const [refreshForm, setRefreshForm] = React.useState(false);

  useEffect(() => {
    if (refresh) {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
        dispatch({ type: REFRESH.RULES.STATE_EVICTION, payload: false });
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['state-eviction'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
    dispatch(Actions.getCaseId(FLOWABLE_CASE_KEY));
    dispatch(Actions.getProcessId(FLOWABLE_PROCESS_KEY));
    dispatch(CommonActions.getDeliverableMatrix());
    dispatch(CommonActions.getEvictionType());
  }, [dispatch]);

  useEffect(() => {
    if (caseDef[FLOWABLE_CASE_KEY]?.caseId) {
      setCaseId(caseDef[FLOWABLE_CASE_KEY]?.caseId);
    }
  }, [caseDef, FLOWABLE_CASE_KEY]);

  useEffect(() => {
    dispatch({ type: 'STATE_EVITION_REFRESH' });
  }, [dispatch]);


  const fn = {
    fetchPayload: () => ({ refreshForm }),
    onFormButtonHandler: (data, modificationMode, api) => {
      if (modificationMode) {
        let stateEvictionmodifypayload = {
          activeIndicator: formPayloadRef.current.activeIndicator,
          createdBy: formPayloadRef.current.createdBy,
          createdDate: formPayloadRef.current.createdDate,
          orderType: formPayloadRef.current.orderType,
          stateCode: formPayloadRef.current.stateCode,
          stateOrderDeliverableMatrices: [
              {
                  activeIndicator: formPayloadRef.current.activeIndicator,
                  createdBy: formPayloadRef.current.createdBy,
                  createdDate: formPayloadRef.current.createdDate,
                  daysToPause: formPayloadRef.current.stateOrderDeliverableMatrices[0].daysToPause,
                  stateOrderDeliverableMatrixId: formPayloadRef.current.id,
                  stateOrderMatrixId: formPayloadRef.current.id,
                  stepNumber: formPayloadRef.current.stateOrderDeliverableMatrices[0].stepNumber,
                  taskKey: formPayloadRef.current.stateOrderDeliverableMatrices[0].taskKey,
                  updatedBy: formPayloadRef.current.updatedBy,
                  updatedDate: formPayloadRef.current.updatedDate
              }
          ],
      
          stateOrderMatrixId: formPayloadRef.current.id,
          subOrderType: formPayloadRef.current.subOrderType,
          timeline: formPayloadRef.current.timeline,
          updatedBy: formPayloadRef.current.updatedBy,
          updatedDate: formPayloadRef.current.updatedDate,
          usafnEvictionTimelineDays: formPayloadRef.current.usafnEvictionTimelineDays,
          usafnPpEvictionBy: formPayloadRef.current.usafnPpEvictionBy,
          usafnPpThreshold: formPayloadRef.current.usafnPpThreshold
      }

          dispatch(
            updateStateEvictionId (
              stateEvictionmodifypayload,
              REFRESH.RULES.STATE_EVICTION
            )
          );
      }
      else {
          let stateEvictionaddpayload = {
            activeIndicator: 1,
            orderType: formPayloadRef.current.orderType,
            stateOrderDeliverableMatrices: [
                {
                    activeIndicator: 1, //formPayloadRef.current.activeIndicator,
                    daysToPause: formPayloadRef.current.stateOrderDeliverableMatrices[0].daysToPause,
                    stepNumber: formPayloadRef.current.stateOrderDeliverableMatrices[0].stepNumber,
                    taskKey: formPayloadRef.current.stateOrderDeliverableMatrices[0].taskKey,
                }
            ],
            stateCode: formPayloadRef.current.stateCode,
            subOrderType: formPayloadRef.current.subOrderType,
            timeline: formPayloadRef.current.timeline,
            usafnEvictionTimelineDays: formPayloadRef.current.usafnEvictionTimelineDays,
            usafnPpEvictionBy: formPayloadRef.current.usafnPpEvictionBy,
            usafnPpThreshold: formPayloadRef.current.usafnPpThreshold
        }
          dispatch(
            saveStateEvictionId(
              stateEvictionaddpayload,
              REFRESH.RULES.STATE_EVICTION
            )
          );
      }

      dispatch(closeModal());
    },

    handleAddEvictionModal: (data, modificationMode) => {
      dispatch(
        openModal({
          children: (
            <StateEvictionAdd
              data={data}
              modificationMode={modificationMode}
              caseId={caseId}
            />
          ),
          title: modificationMode ? 'Edit Eviction' : 'Add Eviction',
          maxwidth: 'sm',
          buttons: (
            <>
              <MonarchButton
                onClick={() => fn.onFormButtonHandler(data, modificationMode)}
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
        case 'Form.ready':
          setRefreshForm(true);
          setTimeout(() => {
            setRefreshForm(false);
          }, 2000);
          break;
        case 'Payload.afterChange':
          if (_.has(api.payload.get(), 'selectedStateEviction')) {
            if (api.payload.get().selectedStateEviction.key === 'Edit') {
              fn.handleAddEvictionModal(
                api.payload.get().selectedStateEviction.DATA,
                true
              );
            }
            if (api.payload.get().selectedStateEviction.key === 'Delete') {
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
                            dispatch(stateEvictionActionDELETE(api.payload.get().selectedStateEviction.DATA, REFRESH.RULES.STATE_EVICTION))
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
    }
  };

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'State Eviction'}
      contentToolbar={
        <>
          <Tooltip title="Add State Eviction">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => fn.handleAddEvictionModal({}, false)}
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
          {!flowable['state-eviction']?.processed ? (
            <FuseLoading />
          ) : (
            <>
              <Form
                config={flowable['state-eviction']?.formDef}
                onEvent={fn.onEventHandler}
                className={clsx(flwClasses.form, 'listing-page')}
                payload={fn.fetchPayload()}
                debug={false}
              />
            </>
          )}
        </>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
};

export default StateEvictionPage;