import React, { useEffect } from 'react';
import _ from '@lodash';
import { renderRoutes } from 'react-router-config';
import FuseSuspense from '@fuse/core/FuseSuspense';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple/MonarchPageSimple';
import MonarchNavigation from '@monarch/core/MonarchNavigation/MonarchNavigation';
import PropertyStartegyNavigationConfig from './Navigation';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPropertyProjections,
  resetPreviousData
} from 'app/main/property/store/actions';
import PropertyStrategyTapHistory from './property-strategy-tab/PropertyStrategyTapHistory';
import { hasAccess } from 'app/common/helpers/common-helper';
import { resourceKeys } from 'app/main/property/resources/ResourceConfig';

const PropertyStrategyPage = ({ content, route }) => {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const caseInstanceId = routeParams.caseInstanceId;
  const contextResources = useSelector(
    (state) => state.common.IAMResource.contextResources
  );
  const navigationConfig = () => {
    const data = PropertyStartegyNavigationConfig.map((navigation) => {
      const compiled = _.template(navigation.url);
      return {
        ...navigation,
        url: compiled({ caseInstanceId: caseInstanceId }),
        visible: hasAccess(contextResources, navigation.id)
      };
    });
    return data;
  };

  useEffect(() => {
    dispatch(resetPreviousData());
    if (
      hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Strategy_API_CALL
      )
    ) {
      dispatch(getPropertyProjections(caseInstanceId, '', ''));
    }
  }, [dispatch, caseInstanceId, contextResources]);

  return (
    <MonarchPageSimple
      contentToolbar={
        <>
          <MonarchNavigation
            className={clsx('navigation')}
            navigation={navigationConfig()}
            layout="horizontal"
          />
          <div className="flex justify-end pr-40 w-full">
            <div className="flex items-center">
              <PropertyStrategyTapHistory />
            </div>
          </div>
        </>
      }
      content={<FuseSuspense> {renderRoutes(route.routes)}</FuseSuspense>}
      innerScroll
    />
  );
};

export default PropertyStrategyPage;
