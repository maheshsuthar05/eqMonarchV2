import * as actions from '../actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  investorGroupStateAction: false,
  formDefinition: null,
  error: undefined,
  blockDataTable: false,
  loadedInvestor: false,
  investorFormStateAction: false,
  investorGroupCreationStateAction: false,
  investorList: [],
  refresh: false
};

const getInvestorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.INVESTOR_REFRESH: {
      return { ...state, refresh: action.payload };
    }
    case actions.SERACH_INVESTOR_GROUPS:
      return {
        ...state,
        blockDataTable: true
      };
    case actions.SERACH_INVESTOR_GROUPS_SUCCESS:
      return {
        ...state,
        blockDataTable: false,
        investorGroupSearchResult: action.payload
      };
    case actions.SERACH_INVESTOR_LIST_SUCCESS:
      return {
        ...state,
        investorList: action.payload
      };
    case actions.SAVE_INVESTOR_TO_GROUP:
    case actions.DELETE_INVESTOR_GROUP_BY_ID:
    case actions.CREATE_INVESTOR_GROUP:
      return {
        ...state,
        stateAction: false,
        investorGroupStateAction: false
      };
    case actions.FETCH_FORM_INVESTOR_GROUP_LIST:
      return INITIAL_STATE;
    case actions.DELETE_INVESTOR_GROUP_BY_ID_SUCCESS:
    case actions.DELETE_INVESTOR_GROUP_BY_ID_FAILURE:
    case actions.SAVE_INVESTOR_TO_GROUP_FAILURE:
    case actions.SAVE_INVESTOR_TO_GROUP_SUCCESS:
    case actions.CREATE_INVESTOR_GROUP_SUCCESS:
    case actions.FETCH_FORM_INVESTOR_GROUP_LIST_FAILURE:
    case actions.SERACH_INVESTOR_GROUPS_FAILURE:
    case actions.CREATE_RULE_FOR_ID_FAILURE:
      return {
        ...state,
        stateAction: true
      };
    case actions.CREATE_INVESTOR_GROUP_FAILURE:
      return {
        ...state,
        investorGroupStateAction: true
      };
    case actions.FETCH_UNASSIGNED_INVESTOR:
      return {
        ...state
      };
    case actions.FETCH_UNASSIGNED_INVESTOR_SUCCESS:
      return {
        ...state,
        unassignedInvestors: action.payload
      };
    case actions.FETCH_FORM_INVESTOR_TO_GROUP_SUCCESS:
      return {
        ...state,
        investorToGroupFormDefinition: action.payload,
        investorFormStateAction: true
      };
    case actions.FETCH_FORM_INVESTOR_TO_GROUP_FAILURE:
      return {
        ...state,
        investorFormStateAction: true
      };
    case actions.FETCH_FORM_INVESTOR_GROUP_CREATION_SUCCESS:
      return {
        ...state,
        investorGroupCreationStateAction: true,
        investorGroupCreationFromDefinition: action.payload
      };
    case actions.FETCH_FORM_INVESTOR_GROUP_CREATION_FAILURE:
      return {
        ...state,
        investorGroupCreationStateAction: true
      };
    case actions.FETCH_FORM_INVESTOR_GROUP_LIST_SUCCESS:
      return {
        ...state,
        investorGroupStateAction: true,
        investorGroupListFormDefinition: action.payload
      };
    case actions.FIND_INVESTOR_BY_INVESTOR_GROUP:
      return {
        ...state,
        loadedInvestor: false
      };
    case actions.FIND_INVESTOR_BY_INVESTOR_GROUP_SUCCESS:
      return {
        ...state,
        loadedInvestor: true,
        investorForInvestorGroup: action.payload
      };
    case actions.FIND_INVESTOR_BY_INVESTOR_GROUP_FAILURE:
      return {
        ...state,
        loadedInvestor: true
      };
    case actions.FETCH_FORM_INVESTOR_LIST:
      return INITIAL_STATE;
    case actions.FETCH_FORM_INVESTOR_LIST_SUCCESS:
      return {
        ...state,
        stateAction: true,
        investorListFormDefinition: action.payload
      };
    default:
      return state;
  }
};

export default getInvestorReducer;
