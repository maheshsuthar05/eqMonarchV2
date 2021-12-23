import { _, Form } from '@flowable/forms';
import React, { useEffect } from 'react';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { tenantAddStart } from 'app/main/tenant/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import FlowableHelper from 'app/common/helpers/flowable-helper';
import { tenantAddFormfetchStart } from 'app/main/tenant/store/actions';
import FuseLoading from '@fuse/core/FuseLoading';
import MonarchTitle from '@monarch/core/MonarchTitle/MonarchTitle';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const TenantAdd = () => {
  const isMounted = useIsMounted();
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const routeParams = useParams();

  const formDefinition = useSelector(
    ({ tenant }) => tenant.tenantAdd?.formDefinition
  );
  const stateAction = useSelector(({ tenant }) => tenant.tenantAdd.stateAction);
  const tenantId = routeParams.tenantId;

  let url = `/eq-api/core/cmmn-api/cmmn-runtime/case-instances/${tenantId}/stage-overview?assignee=admin`;
  url = `/eq-api/flowable-engage/cmmn-api/cmmn-runtime/tasks?caseInstanceIdWithChildren=${tenantId}&assignee=admin`;

  const additionalData = {
    additionalData: {
      url: url
    }
  };

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('authorization', 'Basic YWRtaW46dGVzdA==');

  const payload = {
    sort: 'endTime',
    order: 'desc',
    caseInstanceIdWithChildren: tenantId,
    finished: true,
    taskAssignee: 'admin'
  };

  const customFetch = () => {
    return _.futch(additionalData.additionalData.url, {
      headers: headers,
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(payload)
    });
  };

  useEffect(() => {
    if (isMounted.current) {
      dispatch(tenantAddFormfetchStart());
    }
  }, [isMounted, dispatch]);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Link.click':
        break;
      case 'Button.click':
        const payloadData = api.payload.get();
        const flowablePayload = FlowableHelper.buildPayload(
          formDefinition,
          payloadData
        );
        dispatch(
          tenantAddStart(user.tenantCode, payloadData, flowablePayload, user)
        );
        break;
      default:
        break;
    }
    return true;
  };

  return !stateAction ? (
    <FuseLoading />
  ) : (
    <MonarchPageSimple
      classes={{
        toolbar: 'p-0',
        content: 'p-12'
      }}
      innerScroll
      contentToolbar={
        <>
          <MonarchTitle title="Add Tenant" />
        </>
      }
      content={
        <Form
          config={formDefinition}
          fetch={customFetch}
          additionalData={additionalData}
          onEvent={onEventHandler}
        />
      }
    />
  );
};

export default TenantAdd;
