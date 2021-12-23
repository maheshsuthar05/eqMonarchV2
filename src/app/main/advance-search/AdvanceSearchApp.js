import React, { useEffect } from 'react';
import { Form } from '@flowable/forms';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import * as userActions from 'app/auth/store/actions/user.actions';
import { navigationStart } from 'app/common/store/actions';
import history from '@history';
import { _cookies, closeModal } from 'app/store/actions';
import * as Actions from './store/actionTypes';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import _ from '@lodash';
import { fileDownloader } from 'app/common/helpers/common-helper';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const DEFAULT_SEARCH_CRITERIA = {
  sortFieldName: 'CREATED_DATE',
  sortOrder: 'DESC'
};

const AdvanceSearchApp = (props) => {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const [active, setActive] = React.useState(false);
  const historyLister = useHistory();

  const user = useSelector(({ auth }) => auth.user);

  const flowable = useSelector(
    ({ AdvanceSearchApp }) => AdvanceSearchApp.flowable
  );

  let payload = {
    searchCriteria: DEFAULT_SEARCH_CRITERIA,
    ...(!active
      ? {
          propertySearchCriteria: {
            PropertySearch: ' ',
            filters: 1
          }
        }
      : {
          propertySearchCriteria: {
            filters: 1
          },
          taskSearchCriteria: {
            taskFilters: 1
          },
          vendorSearchCriteria: {
            vendorFilters: 1
          }
        })
  };

  const additionalData = {
    additionalData: {
      isServicer: user.userType === 'servicer' ? true : false,
      selectedRolesDefault: props.roles
    }
  };

  const getFirstItem = (thePath) => {
    const segments = thePath.split('/');
    return `/${segments[1]}/${segments[2]}`;
  };

  useEffect(() => {
    if (!_.isEmpty(historyLister.location.pathname)) {
      const toPath = getFirstItem(historyLister.location.pathname);
      toPath === '/home/dashboard' ? setActive(false) : setActive(true);
    }
  }, [historyLister.location.pathname, active, setActive]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'search',
      fileNames: ['Advance_Search_Form'],
      formAction: Actions.SEARCH_FORMDEFIINITION
    });
  }, [dispatch]);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        if (_.has(api.payload.get(), 'selectedProperty')) {
          const caseInstanceId = api.payload.get().selectedProperty
            .CASE_INSTANCE_ID;
          if (caseInstanceId) {
            dispatch(
              userActions.selectedTenant(
                api.payload.get().selectedProperty.TENANT_ID
              )
            );
            dispatch(
              navigationStart(
                history,
                `/property/details/${
                  api.payload.get().selectedProperty.CASE_INSTANCE_ID
                }`
              )
            );
            dispatch(closeModal());
          } else {
            //sharief to work on this
          }
        }

        if (_.has(api.payload.get(), 'selectedTask')) {
          if (api.payload.get().selectedTask.CASE_INSTANCE_ID === null) return;
          const url = `/property/details/${
            api.payload.get().selectedTask.CASE_INSTANCE_ID
          }`;
          if (user.userType === 'vendor' || user.userType === 'agent') {
            _cookies.setCookies({
              vendorTaskSearchTenant: api.payload.get().selectedTask.TENANT_ID
            });
          }
          dispatch(navigationStart(history, url));
          dispatch(closeModal());
        }
        if (_.has(api.payload.get(), 'selectedVendor')) {
          const url = `/manage-vendor/details/${
            api.payload.get().selectedVendor.VENDOR_ID
          }`;
          dispatch(navigationStart(history, url));
          dispatch(closeModal());
        }
        break;

      case 'Button.click':
        if (
          config.id === 'property_clear_btn' &&
          !config.$scope.searchCriteria.filters
        ) {
          api.payload.set('propertySearchCriteria', {
            filters: !config.$scope.searchCriteria.filters,
            filterKeys: false,
            PropertySearch: false
          });
        }
        if (
          config.id === 'property_clear_btn' &&
          config.$scope.searchCriteria.filters
        ) {
          api.payload.set('propertySearchCriteria', {
            filters: config.$scope.searchCriteria.filters,
            filterKeys: false,
            PropertySearch: false
          });
        }
        if (
          config.id === 'task_clear_btn' &&
          !config.$scope.taskSearchCriteria.taskFilters
        ) {
          api.payload.set('taskSearchCriteria', {
            taskFilters: !config.$scope.taskSearchCriteria.taskFilters,
            taskFilterKeys: false,
            taskSearch: false
          });
        }
        if (
          config.id === 'task_clear_btn' &&
          config.$scope.searchCriteria.taskFilters
        ) {
          api.payload.set('searchCriteria', {
            taskFilters: config.$scope.searchCriteria.taskFilters,
            taskFilterKeys: false,
            taskSearch: false
          });
        }
        if (
          config.id === 'vendor_clear_btn' &&
          !config.$scope.searchCriteria.vendorFilters
        ) {
          api.payload.set('searchCriteria', {
            vendorFilters: !config.$scope.searchCriteria.vendorFilters,
            vendorFilterKeys: false,
            vendorSearch: false
          });
        }
        if (
          config.id === 'vendor_clear_btn' &&
          config.$scope.searchCriteria.vendorFilters
        ) {
          api.payload.set('searchCriteria', {
            vendorFilters: config.$scope.searchCriteria.vendorFilters,
            vendorFilterKeys: false,
            vendorSearch: false
          });
        }

        if (config.id === 'downloadExcel') {
          fileDownloader(
            api.payload.get().downloadSearchResult,
            'PropertySearchResults.csv',
            'text/csv'
          );
        }
        break;
      default:
        break;
    }

    return true;
  };

  return flowable['Advance_Search_Form']?.processed ? (
    <Form
      className={clsx(flwClasses.form, 'advanceSearch')}
      config={flowable['Advance_Search_Form'].formDef}
      onEvent={onEventHandler}
      additionalData={additionalData}
      payload={payload}
    />
  ) : (
    <FuseLoading />
  );
};

export default withReducer('AdvanceSearchApp', reducer)(AdvanceSearchApp);
