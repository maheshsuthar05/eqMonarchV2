import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import AddManageTimelinePage from './AddManageTimelinePage';
import { closeModal, openModal } from 'app/store/actions';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import clsx from 'clsx';
import { STATE_EVITION_REFRESH } from 'app/main/admin/store/actionTypes';
import { flowableCustomFetch } from 'app/common/helpers';
import { AdminManagerApiConfig } from 'app/config/api';

const ManageTimelinePageListing = (props) => {
  const pageLayout = useRef(null);
  const flwClasses = useFormStyles();
  const dispatch = useDispatch();
  const FLOWABLE_CASE_KEY = 'adminManageTimelines';
  const FLOWABLE_PROCESS_KEY = 'adminManageTimelinesEventProducer';

  const caseDef = useSelector(({ admin }) => admin?.tenant_forms);

  const flowable = useSelector(({ admin }) => admin.flowable);
  const user = useSelector(({ auth }) => auth.user);
  const refresh = useSelector(({ admin }) => admin.tenant_forms.refresh);

  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );

  const [refreshForm, setRefreshForm] = React.useState(false);
  const [setCaseId] = React.useState();

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  useEffect(() => {
    if (refresh) {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
        dispatch({ type: STATE_EVITION_REFRESH, payload: false });
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['manage_timelines_listing', 'Add_Manage_Timelines'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
    dispatch(Actions.getCaseId(FLOWABLE_CASE_KEY));
    dispatch(Actions.getProcessId(FLOWABLE_PROCESS_KEY));
  }, [dispatch]);

  useEffect(() => {
    if (caseDef[FLOWABLE_CASE_KEY]?.caseId) {
      setCaseId(caseDef[FLOWABLE_CASE_KEY]?.caseId);
    }
  }, [caseDef, FLOWABLE_CASE_KEY, setCaseId]);

  const fn = {
    fetchPayload: () => ({ refreshForm }),
    getAdditionalData: () => ({
      additionalData: {
        url: AdminManagerApiConfig.api.getCaseQueryUrl,
        tenantCode: user.tenantCode
      }
    })
  };

  const onSaveHandler = () => {};

  const handleEditDecisionTable = (data) => {
    dispatch(
      openModal({
        children: <AddManageTimelinePage data={data} />,
        title: 'Edit TimeLine',
        maxwidth: 'md',
        buttons: (
          <>
            <MonarchButton
              onClick={() => onSaveHandler()}
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

  const clone = (data) => {
    console.log(data);
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Button.click':
        if (config.extraSettings.text === 'Edit') {
          handleEditDecisionTable(config.$scope);
        }
        if (config.extraSettings.text === 'Clone') {
          dispatch(
            openModal({
              children: (
                <h3 className="text-center text-11">
                  Are You sure you want to Clone ?
                </h3>
              ),
              title: 'Clone Alert',
              maxwidth: 'sm',
              buttons: (
                <>
                  <MonarchButton
                    onClick={() => {
                      clone(config.$scope);
                      dispatch(closeModal());
                    }}
                    color="primary"
                    variant="contained"
                    size="small"
                  >
                    {'Clone'}
                  </MonarchButton>
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
  };

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Manage Timeline'}
      contentToolbar={<></>}
      content={
        <>
          {!flowable['manage_timelines_listing']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              className={clsx(flwClasses.form, 'listing-page')}
              config={flowable['manage_timelines_listing']?.formDef}
              fetch={flowableCustomFetch(
                fn.getAdditionalData().additionalData.url,
                Actions.customfetchPayload(FLOWABLE_CASE_KEY)
              )}
              payload={fn.fetchPayload()}
              onEvent={onEventHandler}
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

export default ManageTimelinePageListing;
