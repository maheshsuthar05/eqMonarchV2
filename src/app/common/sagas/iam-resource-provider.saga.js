import _ from '@lodash';
import * as resourceConfig from 'app/common/iam-resource-provider';
import NavigationConfig from 'app/fuse-configs/navigationConfig';
import navigationResourceKeys from 'app/fuse-configs/navigationResourceConfig';
import * as FuseActions from 'app/store/actions/fuse';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import resourceService from '../services/iam-resource-provider.api';
import * as Actions from '../store/actionTypes';
import * as appActions from 'app/store/actions/actionTypes';

import {
  isPublicPage,
  routeWithPageName
} from 'app/common/helpers/common-helper';
import history from '@history';

function* navigationResource(action) {
  const navigationConfig = NavigationConfig();
  const enforcedRealm = yield select(({ auth }) => auth.user.realm);
  try {
    const navigationItems = [...navigationConfig];
    yield all([
      yield put({
        type: FuseActions.SET_NAVIGATION,
        navigation: []
      }),
      yield put({
        type: Actions.DASHBOARD_CURRENT_TENANT_START,
        tenantCode: action.tenantCode
      })
    ]);

    const resourceIds = yield call(
      resourceService.getResourceIds,
      navigationResourceKeys
    );

    const response = yield call(
      resourceService.resourceAccess,
      resourceIds,
      action.tenantCode,
      enforcedRealm
    );

    yield put({
      type: Actions.NAVIGATION_RESOURCE_SUCCESS,
      resources: response.data
    });

    const navigationItemAccess = yield call(
      resourceService.navigationAccess,
      navigationItems,
      response.data
    );

    const accessableNavigation = yield call(
      resourceService.getNavigationConfig,
      navigationItemAccess
    );

    const finalAccessableNavigation = accessableNavigation.filter(
      (navigationItem) =>
        !navigationItem.hasOwnProperty('children') ||
        (navigationItem.hasOwnProperty('children') &&
          navigationItem.children.length > 0)
    );

    yield put({
      type: FuseActions.SET_NAVIGATION,
      navigation: finalAccessableNavigation
    });
  } catch (error) {
    if (error.message !== 'Request failed with status code 403') {
      yield put({
        type: appActions.API_CALL_ERROR,
        error: 'Service Down, Please contact Administrator',
        atAction: Actions.NAVIGATION_RESOURCE_SUCCESS
      });
    }
  }
}

function* navigationResourceWatcher() {
  yield takeLatest(Actions.NAVIGATION_RESOURCE_START, navigationResource);
}

function* contextResource(arg) {
  try {
    const resourceData = yield call(getResourceIds, arg);
    if (resourceData.resourceKeys.length) {
      const response = yield call(
        resourceService.resourceAccess,
        resourceData.resourceKeys,
        arg.tenantCode,
        arg.realm
      );

      yield put({
        type: Actions.CONTEXT_RESOURCE_SUCCESS,
        resources: response.data
      });
    } else {
      yield put({
        type: Actions.CONTEXT_RESOURCE_SUCCESS,
        resources: []
      });

      if (!isPublicPage(arg.url) && resourceData.resourceNotFound) {
        history.push(`/pages/resource-not-found?${arg.url}`);
      }
    }
  } catch (error) {
    yield all([
      yield put({
        type: Actions.CONTEXT_RESOURCE_FAILURE
      }),
      yield put({
        type: appActions.API_CALL_ERROR,
        error: 'Service Down, Please contact Administrator',
        atAction: Actions.CONTEXT_RESOURCE_SUCCESS
      })
    ]);
  }
}

function* contextResourceWatcher() {
  yield takeLatest(Actions.CONTEXT_RESOURCE_START, contextResource);
}

function* getResourceIds(action) {
  const data = { resourceKeys: [], resourceNotFound: true };
  try {
    const { route, pageName } = routeWithPageName(action.url);
    const routeConfig = resourceConfig[route] ? resourceConfig[route] : [];
    const resource = _.find(routeConfig.conifugartion, {
      pageName: pageName
    });

    if (resource !== undefined && resource.hasOwnProperty('resources')) {
      data.resourceNotFound = false;
    }
    if (
      resource !== undefined &&
      resource.hasOwnProperty('resources') &&
      resource.resources.length
    ) {
      data.resourceKeys = resource.resources.map((item) => item.key);
    }
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Service Down, Please contact Administrator',
      atAction: Actions.CONTEXT_RESOURCE_SUCCESS
    });
  }
  return data;
}

export default {
  navigationResourceWatcher,
  contextResourceWatcher
};
