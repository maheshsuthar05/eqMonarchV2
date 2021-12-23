import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import PropertyDetailsPage from './PropertyDetailsPage';
import {
  fetchPropertyUpdateFormStart,
  fetchPropertyStart
} from 'app/main/property/store/actions';
import { hasAccess } from 'app/common/helpers/common-helper';
import { resourceKeys } from 'app/main/property/resources/ResourceConfig';
import { useParams } from 'react-router';
import * as Actions from 'app/main/property/store/actions/property-get.actions';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';

const PropertyDetailsMainPage = (props) => {
  const pageLayout = useRef(null);
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const routeParams = useParams();

  const flowable = useSelector(({ property }) => property.flowable);
  const property = useSelector(({ property }) => property.get.property);

  const propertyStateAction = useSelector(
    ({ property }) => property?.get?.stateAction
  );

  const updateResponse = useSelector(
    ({ property }) => property.update.response
  );

  const user = useSelector(({ auth }) => auth.user);

  const contextResources = useSelector(
    ({ common }) => common.IAMResource.contextResources
  );

  useEffect(() => {
    if (
      hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Details_Form_API_CALL
      )
    ) {
      if (routeParams.caseInstanceId) {
        dispatch(fetchPropertyUpdateFormStart(user.tenantCode));
      }
    }
  }, [user.tenantCode, routeParams.caseInstanceId, contextResources, dispatch]);

  useEffect(() => {
    if (routeParams.caseInstanceId) {
      dispatch(fetchPropertyStart(user.tenantCode, routeParams.caseInstanceId));
    }
  }, [routeParams.caseInstanceId, dispatch, updateResponse, user.tenantCode]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'property',
      fileNames: ['Property_Details_Template'],
      formAction: 'PROPERTY_FLOWABLE_FORMDEF'
    });
  }, [dispatch]);

  let propertyModified;
  if (property) {
    propertyModified = {
      ...property,
      propertyTitles: [
        {
          ...property.propertyTitles[0],
          foreclosureDilRecordedIndicator:
          property?.propertyTitles[0]?.foreclosureDilRecordedIndicator === 2 ? '-':
          (property?.propertyTitles[0]?.foreclosureDilRecordedIndicator === 1
            ? 'Yes'
            : 'No')
        }
      ],
      marketingPlan: {
        ...property.marketingPlan,
        strategyType:
          property?.marketingPlan?.strategyType === null
            ? 'TBD'
            : property?.marketingPlan?.strategyType
      },
      loan: {
        ...property.loan,
        miCoverageExistsIndicator:
          property?.loan?.miCoverageExistsIndicator === '1' ? 'Yes' : 'No'
      },
      propertyValuationsData: Actions.getPropertyValuationData(
        property.propertyValuations
      )
    };
  }

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Property Details'}
      contentToolbar={
        <>
          {hasAccess(
            contextResources,
            resourceKeys.Property_Details_Widget_Property_Details_Edit_Property
          ) && <PropertyDetailsPage />}
        </>
      }
      content={
        !flowable['Property_Details_Template']?.processed ||
        !propertyStateAction ? (
          <FuseLoading />
        ) : (
          <Form
            className={clsx(flwClasses.form, 'propertDetails')}
            config={flowable['Property_Details_Template']?.formDef}
            payload={propertyModified}
          />
        )
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
};

export default PropertyDetailsMainPage;
