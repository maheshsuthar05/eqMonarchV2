import { Form, _ as __ } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { navigationStart } from 'app/common/store/actions';
import { PropertyApiConfig } from 'app/config/api';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import LinearProgress from '@material-ui/core/LinearProgress';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded/MonarchPageCarded';
import MonarchTitle from '@monarch/core/MonarchTitle/MonarchTitle';
import * as userActions from 'app/auth/store/actions/user.actions';

const DEFAULT_SEARCH_CRITERIA = {
  sortFieldName: 'CREATED_DATE',
  sortOrder: 'DESC'
};

const PropertyListPage = ({ history }) => {
  const dispatch = useDispatch();

  const flowable = useSelector(({ flowable }) => flowable.jsonForm);

  const DEFAULT_LIVING_AREA_LIST = [
    {
      text: '500',
      value: 500
    },
    {
      text: '750',
      value: 750
    },
    {
      text: '1,000',
      value: 1000
    },
    {
      text: '1,250',
      value: 1250
    },
    {
      text: '1,500',
      value: '1500'
    },
    {
      text: '1,750',
      value: 1750
    },
    {
      text: '2,000',
      value: 2000
    },
    {
      text: '2,250',
      value: 2250
    },
    {
      text: '2,500',
      value: '2500'
    },
    {
      text: '2,750',
      value: 2750
    },
    {
      text: '3,000',
      value: 3000
    },
    {
      text: '3,500',
      value: 3500
    },
    {
      text: '4,000',
      value: 4000
    },
    {
      text: '5,000',
      value: 5000
    },
    {
      text: '7,500',
      value: 7500
    }
  ];
  const user = useSelector(({ auth }) => auth.user);

  const currentPortalKey = user.userType;
  const additionalData = {
    additionalData: {
      url: PropertyApiConfig.api.property_list,
      MODAL_SEARCH_NAME_ID: 'modal_search_save',
      MODAL_MORE_ID: 'modal_search_more',
      SAVED_PROPERTY_URL: PropertyApiConfig.api.property_listing_filter,
      SAVED_SEARCH_LINK_ID: 'savedSearchButton',
      SAVED_SEARCH_LINK_DELETE_ID: 'savedSearchDeleteButton'
    }
  };

  let payload = {
    searchCriteria: DEFAULT_SEARCH_CRITERIA,
    uiVariable: {
      livingAreaListMin: DEFAULT_LIVING_AREA_LIST,
      livingAreaListMax: DEFAULT_LIVING_AREA_LIST,
      filterModalProgress: true
    },
    userId: null,
    userType: null,
    role: null
  };

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('tenantCode', user.tenantCode);

  useEffect(() => {
    dispatch({ type: 'FLOWABLE_DEFINITION_BY_JSON_CLEAR' });
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'property',
      fileNames: [`${_.upperCase(user.userType)}_Property_List_form`]
    });
  }, [dispatch, user.userType]);

  const refreshSavedPropertyList = (api) => {
    api.payload.set('uiVariable.filterModalProgress', true);
    __.futch(PropertyApiConfig.api.property_listing_filter, {
      headers: headers,
      method: 'GET'
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result._embedded && result._embedded.propertyListingFilters) {
            let sortedList = _.sortBy(
              result._embedded.propertyListingFilters,
              function (item) {
                var dt = new Date(item.createdDate);
                return -dt;
              }
            );
            let savedCriteria = [];
            for (let i = 0; i < sortedList.length && i < 5; i++) {
              let criteria = {
                id: sortedList[i].propertyListingFiltersId,
                name: sortedList[i].searchFilterName,
                criteria: sortedList[i]
              };

              savedCriteria.push(criteria);
            }

            api.payload.set('savedCriteria', savedCriteria);
          }
        },
        (error) => {}
      )
      .finally(function () {
        api.payload.set('uiVariable.filterModalProgress', false);
      });
  };
  let prevMinValue = null;
  let preMaxValue = null;

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        // On row select navigate
        if (state && state.selectedProperty) {
          const url =
            currentPortalKey === 'servicer'
              ? `/property/details/${state.selectedProperty.CASE_INSTANCE_ID}/snapshot`
              : `/property/details/${state.selectedProperty.CASE_INSTANCE_ID}/TaskManagement/Claims`;
          dispatch(
            userActions.selectedTenant(state.selectedProperty.TENANT_ID)
          );
          dispatch(navigationStart(history, url));
        }

        /////////////////////////////
        ////minAreaFilterSelection///
        ////////////////////////////
        let minValue = api.payload.get('searchCriteria.livingMinArea');
        let maxValue = api.payload.get('searchCriteria.livingMaxArea');
        if (prevMinValue !== minValue) {
          if (minValue === null) {
            api.payload.set(
              'uiVariable.livingAreaListMax',
              DEFAULT_LIVING_AREA_LIST
            );
          } else {
            api.payload.set(
              'uiVariable.livingAreaListMax',
              _.filter(DEFAULT_LIVING_AREA_LIST, function (item) {
                return item.value > minValue;
              })
            );
          }
        }
        if (preMaxValue !== maxValue) {
          if (maxValue === null) {
            api.payload.set(
              'uiVariable.livingAreaListMin',
              DEFAULT_LIVING_AREA_LIST
            );
          } else {
            api.payload.set(
              'uiVariable.livingAreaListMin',
              _.filter(DEFAULT_LIVING_AREA_LIST, function (item) {
                return item.value < maxValue;
              })
            );
          }
        }
        ///////////////////////////////////
        ///end of minAreaFilterSelection///
        //////////////////////////////////
        break;
      case 'Payload.beforeChange':
        prevMinValue = api.payload.get('searchCriteria.livingMinArea');
        preMaxValue = api.payload.get('searchCriteria.livingMaxArea');
        break;
      case 'Form.ready':
        refreshSavedPropertyList(api);
        break;
      case 'Modal.open':
        break;
      case 'Modal.close':
        let inputtedName = api.payload.get('searchName');
        if (
          inputtedName &&
          config &&
          config.id === additionalData.additionalData.MODAL_SEARCH_NAME_ID &&
          inputtedName !== ''
        ) {
          //call rest api
          let currentPayload = api.payload.get();
          var criteriaPayload = {
            searchFilterName: config.value.searchName,
            searchText: currentPayload.searchCriteria.search,
            maxLivingArea: currentPayload.searchCriteria.livingMaxArea,
            maxLotSize: currentPayload.searchCriteria.lotSizeMax,
            maxYearBuilt: currentPayload.searchCriteria.buildYearMax,
            minLivingArea: currentPayload.searchCriteria.livingMinArea,
            minLotSize: currentPayload.searchCriteria.lotSizeMin,
            minYearBuilt: currentPayload.searchCriteria.buildYearMin,
            propertyBathroomCount: currentPayload.searchCriteria.numOfBath,
            propertyBedroomCount: currentPayload.searchCriteria.numOfBed
          };

          __.futch(PropertyApiConfig.api.property_listing_filter, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(criteriaPayload)
          })
            .then((res) => res.json())
            .then(
              (result) => {
                refreshSavedPropertyList(api);
              },
              (error) => {}
            )
            .finally(function () {
              if (state && state.payloadBackup) {
                state.payloadBackup.searchName = '';
              }
              api.payload.set('searchName', '');
            });
        }
        break;
      case 'Button.click':
        if (config.id === 'button-clear-filter') {
          api.payload.set('searchCriteria', DEFAULT_SEARCH_CRITERIA);
        }
        break;
      case 'Link.click':
        if (
          config.id === additionalData.additionalData.SAVED_SEARCH_LINK_ID &&
          config.criteria
        ) {
          let searchCriteria = {
            sortFieldName: 'CREATED_DATE',
            sortOrder: 'ASC',
            search: config.criteria.searchText,
            numOfBath: config.criteria.propertyBathroomCount,
            numOfBed: config.criteria.propertyBedroomCount,
            livingMinArea: config.criteria.minLivingArea,
            livingMaxArea: config.criteria.maxLivingArea,
            lotSizeMin: config.criteria.minLotSize,
            lotSizeMax: config.criteria.maxLotSize,
            buildYearMin: config.criteria.minYearBuilt,
            buildYearMax: config.criteria.maxYearBuilt
          };
          api.payload.set('searchCriteria', searchCriteria);
          api.payload.set('uiVariable.selectedTab', 'tab-filter');
        } else if (
          config.id ===
          additionalData.additionalData.SAVED_SEARCH_LINK_DELETE_ID
        ) {
          api.payload.set('uiVariable.filterModalProgress', true);
          let systemId = config.systemId;
          __.futch(
            PropertyApiConfig.api.property_listing_filter_delete(systemId),
            {
              headers: headers,
              method: 'DELETE'
            }
          )
            .then(
              (result) => {
                let existingSavedCriteria = api.payload.get('savedCriteria');
                let clearedCriteras = _.filter(
                  existingSavedCriteria,
                  function (item) {
                    return item.id !== systemId;
                  }
                );
                api.payload.set('savedCriteria', clearedCriteras);
              },
              (error) => {
                refreshSavedPropertyList(api);
              }
            )
            .finally(function () {
              api.payload.set('uiVariable.filterModalProgress', false);
            });
        } else if (config.id === 'button-clear-filter') {
          api.payload.set('searchCriteria', DEFAULT_SEARCH_CRITERIA);
        }
        break;
      default:
        break;
    }

    return true;
  };

  return !flowable.isFormProcessed ? (
    <FuseLoading />
  ) : (
    <MonarchPageCarded
      classes={{
        toolbar: 'p-0',
        content: 'p-12'
      }}
      contentToolbar={
        <>
          <MonarchTitle title="Property Search" />
        </>
      }
      leftSidebarContent={<></>}
      content={
        <div data-tour="list">
          <Form
            config={flowable.formDefinition[0].json}
            payload={payload}
            additionalData={additionalData}
            Components={{ 'linear-progress': LinearProgress }}
            onEvent={onEventHandler}
          />
        </div>
      }
      innerScroll
    />
  );
};

export default PropertyListPage;
