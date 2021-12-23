import { Form } from '@flowable/forms';
import React, { useEffect, useRef } from 'react';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import AddManageTimelinePage from './AddManageTimelinePage';
import { closeModal, openModal } from 'app/store/actions';
import { AdminManagerApiConfig } from 'app/config/api';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import * as CommonActions from 'app/common/store/actions/predefined-list.actions';
import { flowableCustomFetch } from 'app/common/helpers/common-helper';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import { uniqueIdentifier } from "app/common/helpers/common-helper";
import { useFormStyles } from '@monarch/Flowable/useStyles';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';

const ManageTimelinePage = (props) => {
  const pageLayout = useRef(null);
  const isMounted = useIsMounted();
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const FLOWABLE_CASE_KEY = 'adminManageTimelines';
  const FLOWABLE_PROCESS_KEY = 'adminManageTimelinesEventProducer';

  const flowable = useSelector(({ admin }) => admin.flowable);
  const user = useSelector(({ auth }) => auth.user);
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  const caseId = useSelector(({ admin }) => admin.tenant_forms.caseId);
  const processId = useSelector(({ admin }) => admin.tenant_forms.processId);

  const additionalData = {
    additionalData: {
      url: AdminManagerApiConfig.api.getCaseQueryUrl,
      tenantCode: user.tenantCode
    }
  };

  const customFetch = flowableCustomFetch(
    additionalData.additionalData.url,
    Actions.customfetchPayload(FLOWABLE_CASE_KEY)
  );

  useEffect(() => {
    if (isMounted.current) {
      dispatch({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'tenant-admin',
        fileNames: ['manage_timelines_listing'],
        formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
      });
      dispatch(Actions.getCaseId(FLOWABLE_CASE_KEY));
      dispatch(Actions.getProcessId(FLOWABLE_PROCESS_KEY));
      dispatch(CommonActions.getAgentType());
    }
  }, [isMounted, dispatch]);

  const onFormButtonHandler = (data,isEdit) => {
    if (!formPayloadRef.current.hasOwnProperty("timelineId") && !isEdit) {
      formPayloadRef.current["timelineId"] = uniqueIdentifier();
    }
    formPayloadRef.current["vendorSettings"] = [
      {
        vendorId: formPayloadRef.current.vendor.VENDOR_ID,
        venodrName: formPayloadRef.current.vendor.PRODUCT_NAME,
        ...formPayloadRef.current.vendorSwitches,
      },
    ];
    delete formPayloadRef.current["vendor"];
    delete formPayloadRef.current["vendorSwitches"];
    const variables = [];

    Object.keys(formPayloadRef.current).map((item) => {
      const type = typeof formPayloadRef.current[item];
      variables.push({
        name: item,
        type: type === "object" ? "json" : type,
        value: formPayloadRef.current[item],
      });
      return item;
    });

    let targetPayload = {
      processDefinitionId: processId,
      businessKey: formPayloadRef.current.timelineId,
      variables: variables,
    };

    const uniqueSearchPayload = Actions.uniqueSearchVariable(
      FLOWABLE_CASE_KEY,
      variables,
      "timelineId"
    );

    if (isEdit) {
      dispatch(
        Actions.update(
          user.tenantCode,
          uniqueSearchPayload,
          targetPayload.variables,
          FLOWABLE_CASE_KEY,
          data.id
        )
      );
    } else {
      targetPayload.caseDefinitionId = caseId;
      dispatch(
        Actions.save(
          user.tenantCode,
          uniqueSearchPayload,
          targetPayload,
          FLOWABLE_CASE_KEY
        )
      );
    }
    dispatch(closeModal());
  }

  function handleAddTimeLineModal(data, isEdit) {
    dispatch(
      openModal({
        children: (
          <AddManageTimelinePage
            data={data}
            isEdit={isEdit}
          />
        ),
        title: isEdit ? 'Edit Timeline' : 'Add Timeline',
        maxwidth: 'sm',
        buttons: (
          <>
            <MonarchButton
              onClick={()=> onFormButtonHandler(data, isEdit)}
              color="primary"
              variant="contained"
              size="small"
              disabled
            >
              {'Send'}
            </MonarchButton>
          </>
        )
      })
    );
  }

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Button.click':
        if (config.extraSettings.script === 'Edit') {
          handleAddTimeLineModal(config.$scope, true);
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
      contentToolbar={
        <>
          <Tooltip title="Add TimeLine">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => handleAddTimeLineModal(false, {})}
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
          {!flowable['manage_timelines_listing']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              config={flowable['manage_timelines_listing']?.formDef}
              className={clsx(
                flwClasses.form,
                'listing-page'
              )}
              additionalData={additionalData}
              fetch={customFetch}
              onEvent={onEventHandler}
            />
          )}
        </>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
};

export default ManageTimelinePage;
