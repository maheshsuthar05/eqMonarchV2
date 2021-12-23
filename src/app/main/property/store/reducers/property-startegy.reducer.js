import * as actions from '../actionTypes';

const INITIAL_STATE = {
  savingAction: false,
  claimAction: false,
  actualAction: false,
  conveyanceAction: false,
  cwcotAction: false,
  reoAsIsAction: false,
  reoRepairAction: false,
  savingForm: {},
  claimForm: {},
  actualForm: {},
  conveyanceForm: {},
  cwcotForm: {},
  reoAsIsForm: {},
  reoRepairForm: {},
  getProjectionsResponse: {},
  getProjectionsResponseFlag:false,
  addProjectionsResponse: {},
  updateProjectionsResponse: {},
  gldResponse: {},
  flowableBindingData: {},
  projectionsList:[],
  historyValue:{},
  baseLineForm:{},
  baseLineAction:false
};

const getPropertyStrategyFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PROPERTY_STRATEGY_BASELINE_FORM_SUCCESS:
      return{
        ...state,
        baseLineForm:action.payload,
        baseLineAction:true
      }
    case actions.PROPERTY_PROJECTIONS_SET_HISTORY:
      return{
        ...state,
        historyValue:action.payload
      }
    case actions.PROPERTY_PROJECTIONS_LIST_GET_SUCCESS:
      return {
        ...state,
        projectionsList:action.payload
      };
    case actions.PROPERTY_PROJECTIONS_GLD_FORM_DATA:
      return {
        ...state,
        gldResponse: { ...state.gldResponse, ...action.payload }
      };
    case actions.PROPERTY_PROJECTIONS_FLW_BINDING_DATA:
      return {
        ...state,
        flowableBindingData: action.payload
      };
    case actions.PROPERTY_PROJECTIONS_GET_SUCCESS:
      return {
        ...state,
        getProjectionsResponse: action.payload,
        getProjectionsResponseFlag:true
      };
    case actions.PROPERTY_PROJECTIONS_ADD_SUCCESS:
      return {
        ...state,
        addProjectionsResponse: action.payload
      };
    case actions.PROPERTY_PROJECTIONS_UPDATE_SUCCESS:
      return {
        ...state,
        updateProjectionsResponse: action.payload
      };
    case actions.PROPERTY_PROJECTIONS_DATA_RESET:
      return {
        ...state,
        getProjectionsResponse:{},
        getProjectionsResponseFlag:false,
        gldResponse:{},
        historyValue:{}
      }
    case actions.PROPERTY_STRATEGY_SAVINGS_FORM_SUCCESS:
      return {
        ...state,
        savingForm: action.payload,
        savingAction: true
      };
    case actions.PROPERTY_STRATEGY_CLAIMS_FORM_SUCCESS:
      return {
        ...state,
        claimForm: action.payload,
        claimAction: true
      };
    case actions.PROPERTY_STRATEGY_ACTUALS_FORM_SUCCESS:
      return {
        ...state,
        actualForm: action.payload,
        actualAction: true
      };
    case actions.PROPERTY_STRATEGY_CONVEYANCE_FORM_SUCCESS:
      return {
        ...state,
        conveyanceForm: action.payload,
        conveyanceAction: true
      };
    case actions.PROPERTY_STRATEGY_CWCOT_FORM_SUCCESS:
      return {
        ...state,
        cwcotForm: action.payload,
        cwcotAction: true
      };
    case actions.PROPERTY_STRATEGY_REO_ASIS_FORM_SUCCESS:
      return {
        ...state,
        reoAsIsForm: action.payload,
        reoAsIsAction: true
      };
    case actions.PROPERTY_STRATEGY_REO_REPAIR_FORM_SUCCESS:
      return {
        ...state,
        reoRepairForm: action.payload,
        reoRepairAction: true
      };

    default:
      return state;
  }
};

export default getPropertyStrategyFormReducer;
