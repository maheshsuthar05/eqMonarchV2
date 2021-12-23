import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { makeStyles } from '@material-ui/core/styles';
import useIsMounted from 'app/common/hooks/useIsMounted';
import PropTypes, { element } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTenantHeaderFormStart,
  tenantEditStart,
  tenantGetStart
} from 'app/main/tenant/store/actions';
import { useRouteMatch } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: '2px 2px 2px 2px'
  }
}));

const TenantHeader = ({ headerType = 'property', id, tenantId }) => {
  const classes = useStyles();
  const isMounted = useIsMounted();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const formDefinition = useSelector(
    (state) => state.tenant.tenantHeader.formDefinition
  );
  const stateAction = useSelector(
    (state) => state.tenant.tenantHeader.stateAction
  );
  const inProgress = useSelector((state) => state.tenant.tenantAdd.tenantEdit);

  const fetchedTenant = useSelector(
    (state) => state.tenant.tenantGet.tenantDetails
  );
  const getStateAction = useSelector(
    (state) => state.tenant.tenantGet.stateAction
  );
  const editResponse = useSelector((state) => state.tenant.tenantAdd.response);

  let listOfTenants = [];
  if (fetchedTenant) {
    listOfTenants = fetchedTenant?.tenant?.tenants.map((elements) => {
      if (elements.caseInstanceId == tenantId) {
        return elements;
      }
    });
  }
  let validTenant = [];
  if (typeof listOfTenants !== 'undefined') {
    validTenant = listOfTenants.filter((elm) => elm);
  }
  const record = validTenant[0];
  const headerStateAction = useSelector(
    (state) => state.property.header.stateAction
  );
  const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(fetchTenantHeaderFormStart());
    }
  }, [isMounted, fetchTenantHeaderFormStart]);

  useEffect(() => {
    if (isMounted.current && tenantId) {
      dispatch(tenantGetStart(tenantId));
    }
  }, [isMounted, tenantEditStart, editResponse]);

  const additionalData = {
    additionalData: record
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Button.click':
        if (config && config.id === 'script-button2') {
          let payload = api.payload.get();
          const newPayload = constructPayload(payload);
          dispatch(tenantEditStart(user.tenantCode, newPayload));
        }
        break;
      default:
        break;
    }
    return true;
  };

  const constructPayload = (payload) => {
    const { $temp, _links, ...rest } = payload;
    return rest;
  };

  return !stateAction || inProgress ? (
    <FuseLoading />
  ) : (
    <div className={classes.root + ' propertyPageHeader'}>
      <div className={classes.content}>
        <Form
          config={formDefinition}
          payload={record}
          onEvent={onEventHandler}
          additionalData={additionalData}
        />
      </div>
    </div>
  );
};

TenantHeader.propTypes = {
  headerType: PropTypes.string.isRequired
};

export default TenantHeader;
