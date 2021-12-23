import * as actions from 'app/main/property/store/actionTypes';

export const getPropertyStrategyBaselineForm = () => ({
  type: actions.PROPERTY_STRATEGY_BASELINE_FORM_START
});

export const fetchPropertyStartegyBaselineFormSuccess = (payload) => ({
  type: actions.PROPERTY_STRATEGY_BASELINE_FORM_SUCCESS,
  payload
});

export const resetPreviousData = () => ({
  type: actions.PROPERTY_PROJECTIONS_DATA_RESET
});

export const getGLDFormData = (payload) => ({
  type: actions.PROPERTY_PROJECTIONS_GLD_FORM_DATA,
  payload
});

export const setHistoryValue = (payload) => ({
  type: actions.PROPERTY_PROJECTIONS_SET_HISTORY,
  payload
});

export const getPropertyProjections = (propertyId,projectionId,flag) => ({
  type: actions.PROPERTY_PROJECTIONS_GET_START,
  propertyId,projectionId,flag
});

export const getProjectionsListAction = (propertyId) => ({
  type: actions.PROPERTY_PROJECTIONS_LIST_GET_START,
  propertyId
});

export const addPropertyProjectionsAction = (payload,propertyId) => ({
  type: actions.PROPERTY_PROJECTIONS_ADD_START,
  payload,
  propertyId
});

export const updatePropertyProjectionsAction = (payload) => ({
  type: actions.PROPERTY_PROJECTIONS_UPDATE_START,
  payload
});

export const getPropertyStrategySavingForm = () => ({
  type: actions.PROPERTY_STRATEGY_SAVINGS_FORM_START
});

export const fetchPropertyStartegySavingsFormSuccess = (payload) => ({
  type: actions.PROPERTY_STRATEGY_SAVINGS_FORM_SUCCESS,
  payload
});

export const getPropertyStrategyClaimForm = () => ({
  type: actions.PROPERTY_STRATEGY_CLAIMS_FORM_START
});

export const fetchPropertyStartegyClaimFormSuccess = (payload) => ({
  type: actions.PROPERTY_STRATEGY_CLAIMS_FORM_SUCCESS,
  payload
});

export const getPropertyStrategyActualsForm = () => ({
  type: actions.PROPERTY_STRATEGY_ACTUALS_FORM_START
});

export const fetchPropertyStartegyActualsFormSuccess = (payload) => ({
  type: actions.PROPERTY_STRATEGY_ACTUALS_FORM_SUCCESS,
  payload
});

export const getPropertyStrategyCWCOTForm = () => ({
  type: actions.PROPERTY_STRATEGY_CWCOT_FORM_START
});

export const fetchPropertyStartegyCWCOTFormSuccess = (payload) => ({
  type: actions.PROPERTY_STRATEGY_CWCOT_FORM_SUCCESS,
  payload
});

export const getPropertyStrategyConveyanceForm = () => ({
  type: actions.PROPERTY_STRATEGY_CONVEYANCE_FORM_START
});

export const fetchPropertyStartegyConveyanceFormSuccess = (payload) => ({
  type: actions.PROPERTY_STRATEGY_CONVEYANCE_FORM_SUCCESS,
  payload
});

export const getPropertyStrategyReoAsIsForm = () => ({
  type: actions.PROPERTY_STRATEGY_REO_ASIS_FORM_START
});

export const fetchPropertyStartegyReoAsIsFormSuccess = (payload) => ({
  type: actions.PROPERTY_STRATEGY_REO_ASIS_FORM_SUCCESS,
  payload
});

export const getPropertyStrategyReoRepairForm = () => ({
  type: actions.PROPERTY_STRATEGY_REO_REPAIR_FORM_START
});

export const fetchPropertyStartegyReoRepairFormSuccess = (payload) => ({
  type: actions.PROPERTY_STRATEGY_REO_REPAIR_FORM_SUCCESS,
  payload
});
