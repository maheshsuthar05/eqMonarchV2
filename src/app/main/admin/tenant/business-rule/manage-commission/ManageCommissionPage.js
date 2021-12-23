import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import AddCommissionPage from './AddCommissionPage';
import ManageListingTypePage from './ManageListingTypePage';
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
import { useTheme } from '@material-ui/core/styles';
import { FiEdit } from 'react-icons/fi';
import _ from '@lodash';
import { v4 as uuidv4 } from 'uuid';
import { REFRESH } from 'app/main/admin/store/actions';

const ManageCommissionPage = (props) => {
  const pageLayout = useRef(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const flwClasses = useFormStyles();
  const FLOWABLE_CASE_KEY = 'adminManageCommission';
  const FLOWABLE_PROCESS_KEY = 'adminCommissionSettingEventProducer';

  const caseDef = useSelector(({ admin }) => admin?.tenant_forms);
  const processId = useSelector(({ admin }) => admin.tenant_forms.processId);

  const flowable = useSelector(({ admin }) => admin.flowable);
  const user = useSelector(({ auth }) => auth.user);
  const refresh = useSelector(({ admin }) => admin.refresh.MANAGE_COMMISSION);

  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );

  const [refreshForm, setRefreshForm] = React.useState(false);
  const [caseId, setCaseId] = React.useState();

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  useEffect(() => {
    if (refresh) {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
        dispatch({ type: REFRESH.RULES.MANAGE_COMMISSION, payload: false });
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['Manage_Commission_listing'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
    dispatch(Actions.getCaseId(FLOWABLE_CASE_KEY));
    dispatch(Actions.getProcessId(FLOWABLE_PROCESS_KEY));
    dispatch(Actions.getListingTypeStart());
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
    onAddCommisionFormButtonHandler: (data, isEdit) => {
      if (!formPayloadRef.current.hasOwnProperty('commissionId') && !isEdit) {
        formPayloadRef.current['commissionId'] = uuidv4();
      }
      const variables = [];

      Object.keys(formPayloadRef.current).map((item) => {
        const type = typeof formPayloadRef.current[item];
        variables.push({
          name: item,
          type: type === 'number' ? 'double' : type,
          value: formPayloadRef.current[item]
        });
        return item;
      });

      let targetPayload = {
        processDefinitionId: processId,
        businessKey: formPayloadRef.current.commissionId,
        variables: variables
      };

      const uniqueSearchPayload = Actions.uniqueSearchVariable(
        FLOWABLE_CASE_KEY,
        variables,
        'commissionId'
      );

      if (isEdit) {
        dispatch(
          Actions.update(
            user.tenantCode,
            uniqueSearchPayload,
            targetPayload.variables,
            FLOWABLE_CASE_KEY,
            data.id,
            REFRESH.RULES.MANAGE_COMMISSION
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
            REFRESH.RULES.MANAGE_COMMISSION
          )
        );
      }
      dispatch(closeModal());
    },
    handleAddCommissionnModal: (data, isEdit) => {
      dispatch(
        openModal({
          children: (
            <AddCommissionPage data={data} isEdit={isEdit} caseId={caseId} />
          ),
          title: isEdit ? 'Edit Commission' : 'Add Commission',
          maxwidth: 'md',
          buttons: (
            <>
              <MonarchButton
                onClick={() => fn.onAddCommisionFormButtonHandler(data, isEdit)}
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
    handleManageListingTypeClick: (data, isEdit) => {
      dispatch(
        openModal({
          children: <ManageListingTypePage />,
          title: 'Manage Listing Type',
          maxwidth: 'md'
        })
      );
    },
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Payload.afterChange':
          if (_.has(api.payload.get(), 'manageCommissionList')) {
            if (api.payload.get().manageCommissionList.key === 'Edit') {
              fn.handleAddCommissionnModal(
                api.payload.get().manageCommissionList.DATA,
                true
              );
            }
            if (api.payload.get().manageCommissionList.key === 'Delete') {
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
                                api.payload.get().manageCommissionList.DATA,
                                REFRESH.RULES.MANAGE_COMMISSION
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
      contentTitle={'Manage Commission'}
      contentToolbar={
        <>
          <Tooltip title="Add Commission">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => fn.handleAddCommissionnModal({}, false)}
              size="small"
            >
              <IoAddCircleOutline />
            </IconButton>
          </Tooltip>
          <Tooltip title="Manage Listing Type">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => fn.handleManageListingTypeClick()}
              size="small"
            >
              <FiEdit className={theme.icons.fontSize} />
            </IconButton>
          </Tooltip>
          <div className="show-clear-filter">&nbsp;</div>
        </>
      }
      content={
        <>
          {!flowable['Manage_Commission_listing']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['Manage_Commission_listing']?.formDef}
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

export default ManageCommissionPage;
