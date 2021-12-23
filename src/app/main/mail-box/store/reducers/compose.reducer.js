import * as Actions from '../actionTypes';

const initialState = {
  stateAction: false,
  formDefinition: {},
  data: {
    //payload: null,
    from: null,
    //investorId: null,
    fileCategoryType: null,
    //tags: null,
    propertyLoanId: null,
    tenantId: null,
    to: null,
    cc: null,
    highImportance:null,
    mainContentType: null,
    mainContent: null,
    replyToMessageId: null,
    fromPartyRoleType:null,
    threadId:null,
    attachmentDtos: []
  }
};

const composeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_MAIL_COMPOSE_FORM:
      return {
        ...state,
        stateAction: false
      };
    case Actions.FETCH_MAIL_COMPOSE_FORM:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.json
        }
      };
    case Actions.POST_MAIL_COMPOSE_DATA:
      return {
        ...state,
        stateAction: true,
        data: {
          //payload: 'INSERT',
          from: action.data.from,
         // investorId: action.data.investorId,
          fileCategoryType: action.data.fileCategoryType,
          //tags: action.data.tenantId + ',' + action.data.propertyLoanId,
          propertyLoanId: action.data.propertyId,
          tenantId: action.data.tenantId,
          to: action.data.to.toString(),
          cc: action.data.cc,
          highImportance: action.data.highImportance === true ? 1 : 0,
          mainContentType: action.data.mainContentType,
          mainContent: action.data.mainContent,
          attachmentDtos: [action.attachmentDtos]
        }
      };
    case Actions.GET_MAIL_COMPOSE_DATA:
      return {
        ...state,
        stateAction: true
      };
    default:
      return state;
  }
};

export default composeReducer;
