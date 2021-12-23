import * as actions from '../../actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  error: undefined,
  loading: false,
  caseIdStateAction: false,
  caseDatas: {},
  variables: {
    data: {},
    processed: false
  },
  refresh: false
};

const getTenantAdminFormsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_MANAGE_CLIENT_CONFIG_FORM_START:
      return {
        ...state,
        stateAction: false,
        formDefinition: null
      };
    case actions.FETCH_MANAGE_CLIENT_CONFIG_FORM_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.formDef
        }
      };
    case actions.FETCH_USER_LOAD_BALANCE_FORM_START:
      return {
        ...state,
        stateAction: false,
        formDefinition: null
      };
    case actions.FETCH_USER_LOAD_BALANCE_FORM_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.formDef
        }
      };
    case actions.FETCH_FLOWABLE_CASE_ID:
      return {
        ...state,
        caseIdStateAction: false
      };
    case actions.FETCH_FLOWABLE_CASE_ID_SUCCESS:
      return {
        ...state,
        caseIdStateAction: true,
        caseId: action.payload,
        [action.payload.key]: {
          caseId: action.payload.id
        }
      };
    case actions.FETCH_FLOWABLE_PROCESS_ID_SUCCESS:
      return {
        ...state,
        stateAction: true,
        processId: action.payload
      };
    case actions.GET_CASE_DATA_SUCCESS:
      return {
        ...state,
        stateAction: true,
        caseData: action.responsePayload,
        caseDatas: {
          ...state.caseDatas,
          [action.responsePayload.key]: {
            caseAction: true,
            caseData: action.responsePayload
          }
        }
      };
    case actions.GET_LISTING_TYPE:
      return {
        ...state,
        stateAction: false
      };
    case actions.GET_LISTING_TYPE_SUCCESS:
      return {
        ...state,
        stateAction: true,
        listingTypeData: action.payload
      };
    case actions.STATE_EVITION_REFRESH:
      return {
        ...state,
        refresh: action.payload
      };
    case actions.CONVERT_TO_VARIABLES:
      return {
        ...state,
        variables: {
          ...state.variables,
          data: action.payload.variables,
          processed: action.payload.processed
        }
      };
    default:
      return state;
  }
};

export default getTenantAdminFormsReducer;
