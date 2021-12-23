import * as actions from 'app/main/property/store/actionTypes';
import { API_CALL_ERROR } from 'app/store/actions/actionTypes';
import _ from 'lodash';

export const fetchPropertyStart = (tenantCode, caseInstanceId) => ({
  type: actions.PROPERTY_FETCH_START,
  caseInstanceId: caseInstanceId,
  tenantCode: tenantCode
});

export const fetchPropertySuccess = (property) => ({
  type: actions.PROPERTY_FETCH_SUCCESS,
  property: property
});

export const fetchPropertyFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_FETCH_SUCCESS,
  error: error
});

const propertyValuationsInsertFields = [
  'clientValuationType_PropertyValuationMethodType',
  'clientDesignatedValueAmount_PropertyValuationAmount',
  'clientDesignatedValueDate_PropertyValuationEffectiveDate',
  'clientValuationAmount_PropertyValuationAmount',
  'clientValuationDate_PropertyValuationEffectiveDate'
];

export const updatePropertyValuationsField = (data, payload) => {
  if (_.has(data, 'propertyValuationsData')) {
    const insertPayload = _.map(propertyValuationsInsertFields, (res) => {
      if (data.propertyValuationsData[res]) {
        switch (res) {
          case 'clientValuationType_PropertyValuationMethodType':
            return {
              propertyValuationMethodType: data.propertyValuationsData[res],
              propertyValuationStateType: 'Initial'
            };
          case 'clientValuationAmount_PropertyValuationAmount':
            return {
              propertyValuationAmount: data.propertyValuationsData[res],
              propertyValuationStateType: 'Initial',
              propertyValuationMethodType: 'ClientValuationAmount'
            };
          case 'clientValuationDate_PropertyValuationEffectiveDate':
            return {
              propertyValuationEffectiveDate: data.propertyValuationsData[res],
              propertyValuationStateType: 'Initial',
              propertyValuationMethodType: 'ClientValuationDate'
            };
          case 'clientDesignatedValueAmount_PropertyValuationAmount':
            return {
              propertyValuationAmount: data.propertyValuationsData[res],
              propertyValuationStateType: 'Initial',
              propertyValuationMethodType: 'ClientDesignatedAmount'
            };
          case 'clientDesignatedValueDate_PropertyValuationEffectiveDate':
            return {
              propertyValuationEffectiveDate: data.propertyValuationsData[res],
              propertyValuationStateType: 'Initial',
              propertyValuationMethodType: 'ClientDesignatedDate'
            };
          default:
            break;
        }
      }
    }).filter(Boolean);
    return insertPayload;
  }
};

export const getPropertyValuationData = (data) => {
  let getValuationData = {};
  _.map(data, (res) => {
    if (res.propertyValuationStateType === 'Initial') {
      getValuationData['clientValuationType_PropertyValuationMethodType'] =
        res.propertyValuationMethodType;
    }
    if (
      res.propertyValuationMethodType === 'ClientValuationDate' &&
      res.propertyValuationStateType === 'Initial'
    ) {
      getValuationData['clientValuationDate_PropertyValuationEffectiveDate'] =
        res.propertyValuationEffectiveDate;
    }
    if (
      res.propertyValuationMethodType === 'ClientValuationAmount' &&
      res.propertyValuationStateType === 'Initial'
    ) {
      getValuationData['clientValuationAmount_PropertyValuationAmount'] =
        res.propertyValuationAmount;
    }
    if (
      res.propertyValuationMethodType === 'ClientDesignatedAmount' &&
      res.propertyValuationStateType === 'Initial'
    ) {
      getValuationData['clientDesignatedValueAmount_PropertyValuationAmount'] =
        res.propertyValuationAmount;
    }
    if (
      res.propertyValuationMethodType === 'ClientDesignatedDate' &&
      res.propertyValuationStateType === 'Initial'
    ) {
      getValuationData[
        'clientDesignatedValueDate_PropertyValuationEffectiveDate'
      ] = res.propertyValuationEffectiveDate;
    }
    if (
      res.propertyValuationMethodType === 'AgentBPO' &&
      res.propertyValuationStateType === 'Initial'
    ) {
      getValuationData['agentInitialBpoAmount_PropertyValuationAmount'] =
        res.propertyValuationAmount;
      getValuationData['agentInitialBpoDate_PropertyValuationEffectiveDate'] =
        res.propertyValuationEffectiveDate;
    }
    if (
      res.propertyValuationMethodType === 'VendorBPO' &&
      res.propertyValuationStateType === 'Initial'
    ) {
      getValuationData['vendorInitialBpoAmount_PropertyValuationAmount'] =
        res.propertyValuationAmount;
      getValuationData['vendorInitialBpoDate_PropertyValuationEffectiveDate'] =
        res.propertyValuationEffectiveDate;
    }
    if (
      res.propertyValuationMethodType === 'VendorIndependentBPO' &&
      res.propertyValuationStateType === 'Initial'
    ) {
      getValuationData['vendorIndependentBpoAmount_PropertyValuationAmount'] =
        res.propertyValuationAmount;
      getValuationData[
        'vendorIndependentBpoDate_PropertyValuationEffectiveDate'
      ] = res.propertyValuationEffectiveDate;
    }

    if (
      res.propertyValuationMethodType === 'PriorSale' &&
      res.propertyValuationStateType === 'Initial'
    ) {
      getValuationData['fcSaleValue2_PropertyValuationAmount'] =
        res.propertyValuationAmount;
      getValuationData['fcSaleValue2Date_PropertyValuationEffectiveDate'] =
        res.propertyValuationEffectiveDate;
      getValuationData['fcSaleValue1_PropertyValuationAmount'] =
        res.propertyValuationAmount;
      getValuationData['fcSaleValue1Date_PropertyValuationEffectiveDate'] =
        res.propertyValuationEffectiveDate;
    }
    if (
      res.propertyValuationMethodType === 'Appraisal' &&
      res.propertyValuationStateType === 'Initial'
    ) {
      getValuationData['appraisalAmount_PropertyValuationAmount'] =
        res.propertyValuationAmount;
      getValuationData['appraisalDate_PropertyValuationEffectiveDate'] =
        res.propertyValuationEffectiveDate;
    }

    if (
      res.propertyValuationMethodType === 'Appraisal' &&
      res.propertyValuationStateType === 'Updated'
    ) {
      getValuationData['updatedAppraisalAmount_PropertyValuationAmount'] =
        res.propertyValuationAmount;
      getValuationData['updatedAppraisalDate_PropertyValuationEffectiveDate'] =
        res.propertyValuationEffectiveDate;
    }
  });
  return getValuationData;
};
