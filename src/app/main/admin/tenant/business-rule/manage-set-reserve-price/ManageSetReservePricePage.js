import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { AdminManagerApiConfig } from 'app/config/api';
import SetReservePriceAdd from './SetReservePriceAdd';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import {
  closeDialog,
  closeModal,
  openDialog,
  openModal
} from 'app/store/actions';
import { flowableCustomFetch } from 'app/common/helpers/common-helper';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import Tooltip from '@material-ui/core/Tooltip';
import { DialogActions, DialogTitle, IconButton } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import clsx from 'clsx';
import _ from '@lodash';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import { REFRESH } from 'app/main/admin/store/actions';

const ManageSetReservePricePage = (props) => {
  const pageLayout = useRef(null);
  const user = useSelector(({ auth }) => auth.user);
  const flwClasses = useFormStyles();
  const dispatch = useDispatch();
  const FLOWABLE_CASE_KEY = 'adminManageSetReservePrice';
  const FLOWABLE_PROCESS_KEY = 'adminSetReservePriceSettingEventProducer';

  const INVESTOR_GROUP_ID_KEY = 'investorGroupId';
  const INVESTOR_GROUP_KEY = 'investorGroup';

  const stateAction = useSelector(
    ({ admin }) => admin.tenant_forms.stateAction
  );
  const flowable = useSelector(({ admin }) => admin.flowable);
  const caseDef = useSelector(({ admin }) => admin.tenant_forms);
  const processId = useSelector(({ admin }) => admin.tenant_forms.processId);
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );
  const refresh = useSelector(
    ({ admin }) => admin.refresh.MANAGE_SET_RESERVE_PRICE
  );

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
          type: REFRESH.SETTINGS.MANAGE_SET_RESERVE_PRICE,
          payload: false
        });
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['manage_set_reserve_price_listing'],
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
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Payload.afterChange':
          if (_.has(api.payload.get(), 'manageSetReservePrice')) {
            if (api.payload.get().manageSetReservePrice.key === 'Edit') {
              fn.handleCRUDClick(
                api.payload.get().manageSetReservePrice.DATA,
                true
              );
            }
            if (api.payload.get().manageSetReservePrice.key === 'Delete') {
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
                                api.payload.get().manageSetReservePrice.DATA,
                                REFRESH.SETTINGS.MANAGE_SET_RESERVE_PRICE
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
    },
    saveReservePrice: (isEdit, data) => {
      const variables = [];

      Object.keys(formPayloadRef.current).map((item) => {
        const type = typeof formPayloadRef.current[item];
        if (item === 'investorGroup') {
          variables.push({
            name: INVESTOR_GROUP_ID_KEY,
            type: 'string',
            value: formPayloadRef.current[item].investorGroupId
          });
          variables.push({
            name: INVESTOR_GROUP_KEY,
            type: 'string',
            value: formPayloadRef.current[item].investorGroup
          });
        } else {
          variables.push({
            name: item,
            type: type === 'number' ? 'double' : type,
            value: formPayloadRef.current[item]
          });
        }
        return type;
      });

      let targetPayload = {
        processDefinitionId: processId,
        businessKey: formPayloadRef.current.investorGroup.investorGroupId,
        name: formPayloadRef.current.investorGroup.investorGroup,
        variables: variables
      };

      const uniqueSearchPayload = Actions.uniqueSearchVariable(
        FLOWABLE_CASE_KEY,
        variables,
        'investorGroupId'
      );

      if (isEdit) {
        targetPayload.processDefinitionId = processId;
        dispatch(
          Actions.update(
            user.tenantCode,
            uniqueSearchPayload,
            targetPayload.variables,
            FLOWABLE_CASE_KEY,
            data.id,
            REFRESH.SETTINGS.MANAGE_SET_RESERVE_PRICE
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
            REFRESH.SETTINGS.MANAGE_SET_RESERVE_PRICE
          )
        );
      }
      dispatch(closeModal());
    },
    handleCRUDClick: (data, isEdit) => {
      dispatch(
        openModal({
          children: (
            <SetReservePriceAdd
              data={data}
              isEdit={isEdit}
              caseDefinitionKey={FLOWABLE_CASE_KEY}
              processDefinitionId={FLOWABLE_PROCESS_KEY}
              caseId={caseDef[FLOWABLE_CASE_KEY]?.caseId}
            />
          ),
          title: `${isEdit ? `Edit` : `Add`} Manage Set Reserve Price`,
          maxwidth: 'sm',
          buttons: (
            <>
              <MonarchButton
                onClick={() => fn.saveReservePrice(isEdit, data)}
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
      contentTitle={'Manage Set Reserve Price'}
      contentToolbar={
        <>
          <Tooltip title="Add Setting">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => fn.handleCRUDClick({}, false)}
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
          {!flowable['manage_set_reserve_price_listing']?.processed ||
          !stateAction ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['manage_set_reserve_price_listing']?.formDef}
              onEvent={fn.onEventHandler}
              fetch={flowableCustomFetch(
                fn.getAdditionalData().additionalData.url,
                Actions.customfetchPayload(FLOWABLE_CASE_KEY)
              )}
              additionalData={fn.getAdditionalData()}
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

export default ManageSetReservePricePage;
