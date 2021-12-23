import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { openModal } from 'app/store/actions';
import AddMICompanyPage from './AddMICompanyPage';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import { AdminManagerApiConfig } from 'app/config/api';
import clsx from 'clsx';
import { flowableCustomFetch } from 'app/common/helpers/common-helper';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import { IconButton, Tooltip } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';

import { useFormStyles } from '@monarch/Flowable/useStyles';
import { REFRESH } from 'app/main/admin/store/actions';

const MICompaniesPage = (props) => {
  const pageLayout = useRef(null);
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const FLOWABLE_CASE_KEY = 'adminMICompany';
  const FLOWABLE_PROCESS_KEY = 'adminMICompanyEventProducer';
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;
  const flowable = useSelector(({ admin }) => admin.flowable);
  const user = useSelector(({ auth }) => auth.user);

  const caseDef = useSelector(({ admin }) => admin.tenant_forms);
  const isLoadingDate = useSelector(
    ({ admin }) => admin.tenant_forms.stateAction
  );
  const processId = useSelector(({ admin }) => admin.tenant_forms.processId);
  const refresh = useSelector(({ admin }) => admin.refresh.MI_COMPANY);
  const [caseId, setCaseId] = React.useState({});
  const [refreshForm, setRefreshForm] = React.useState(false);

  useEffect(() => {
    if (refresh) {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
        dispatch({
          type: REFRESH.ACCESS_MANAGMENT.MI_COMPANY,
          payload: false
        });
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['mi_company_listing'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
    dispatch(Actions.getCaseId(FLOWABLE_CASE_KEY));
    dispatch(Actions.getProcessId(FLOWABLE_PROCESS_KEY));
  }, [dispatch]);

  useEffect(() => {
    setCaseId(caseDef[FLOWABLE_CASE_KEY]?.caseId);
  }, [caseDef]);

  const fn = {
    fetchPayload: () => ({ refreshForm }),
    saveMIDetails: (isEdit, data) => {
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
        businessKey: formPayloadRef.current.mICode,
        name: formPayloadRef.current.mICompanyName,
        variables: variables
      };

      const uniqueSearchPayload = Actions.uniqueSearchVariable(
        FLOWABLE_CASE_KEY,
        variables,
        'mICode'
      );

      if (isEdit) {
        dispatch(
          Actions.update(
            user.tenantCode,
            uniqueSearchPayload,
            targetPayload.variables,
            FLOWABLE_CASE_KEY,
            data.id,
            REFRESH.ACCESS_MANAGMENT.MI_COMPANY
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
            REFRESH.ACCESS_MANAGMENT.MI_COMPANY
          )
        );
      }
    },
    handleAddMICompanyClick: (data, isEdit) => {
      dispatch(
        openModal({
          children: (
            <AddMICompanyPage caseId={caseId} data={data} isEdit={isEdit} />
          ),
          title: isEdit ? 'Edit MI Company' : 'Add MI Company',
          maxwidth: 'sm',
          buttons: (
            <>
              <MonarchButton
                onClick={() => fn.saveMIDetails(isEdit, data)}
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
    getAdditionalData: () => ({
      additionalData: {
        url: AdminManagerApiConfig.api.getCaseQueryUrl,
        tenantCode: user.tenantCode,
        key: FLOWABLE_CASE_KEY
      }
    }),
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Button.click':
          if (config.extraSettings.script === 'Edit') {
            fn.handleAddMICompanyClick(config.$scope, true);
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
      contentTitle={'MI Company'}
      contentToolbar={
        <>
          <Tooltip title="Add MI Company">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => fn.handleAddMICompanyClick({}, false)}
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
          {!flowable['mi_company_listing']?.processed || !isLoadingDate ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['mi_company_listing']?.formDef}
              onEvent={fn.onEventHandler}
              payload={fn.fetchPayload()}
              additionalData={fn.getAdditionalData()}
              fetch={flowableCustomFetch(
                fn.getAdditionalData().additionalData.url,
                Actions.customfetchPayload(FLOWABLE_CASE_KEY)
              )}
              className={clsx(flwClasses.form, 'listing-page')}
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

export default MICompaniesPage;
