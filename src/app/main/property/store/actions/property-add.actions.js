import * as actions from 'app/main/property/store/actionTypes';
import { API_CALL_ERROR } from 'app/store/actions/actionTypes';
import _ from 'lodash';

export const getInvestorGroupByInvestorId = (investorList, investorId) => {
  const list = _.filter(investorList, (res) => {
    if (res.INVESTOR_CODE === investorId) {
      return res;
    }
  });
  if (!_.isEmpty(list)) {
    return [
      {
        investorCode: list[0]?.INVESTOR_CODE,
        investorGroup: list[0]?.INVESTOR_GROUP
      }
    ];
  } else {
    return [
      {
        investorCode: null,
        investorGroup: null
      }
    ];
  }
};

export const updateInvestorGroupByInvestorId = (
  investorList,
  investorInformation
) => {
  const list = _.filter(investorList, (res) => {
    if (res.INVESTOR_CODE === investorInformation.investorCode) {
      return res;
    }
  });
  if (!_.isEmpty(list)) {
    return [
      {
        ...investorInformation,
        investorCode: list[0]?.INVESTOR_CODE,
        investorGroup: list[0]?.INVESTOR_GROUP
      }
    ];
  } else {
    return [
      {
        ...investorInformation,
        investorCode: null,
        investorGroup: null
      }
    ];
  }
};

export const fetchPropertyAddFormStart = (tenantCode) => ({
  type: actions.PROPERTY_ADD_FORM_FETCH_START,
  tenantCode: tenantCode
});

export const fetchPropertyAddFormSuccess = (formDefinition) => ({
  type: actions.PROPERTY_ADD_FORM_FETCH_SUCCESS,
  formDefinition: formDefinition
});

export const fetchPropertyAddFormFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_ADD_FORM_FETCH_SUCCESS,
  error: error
});

export const propertyAddStart = (
  tenantCode,
  payload,
  flowablePayload,
  toaster
) => ({
  type: actions.PROPERTY_ADD_START,
  payload: payload,
  flowablePayload: flowablePayload,
  tenantCode: tenantCode,
  toaster: toaster
});

export const propertyAddSuccess = (response) => ({
  type: actions.PROPERTY_ADD_SUCCESS,
  response: response
});

export const propertyAddFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_ADD_SUCCESS,
  error: error
});
