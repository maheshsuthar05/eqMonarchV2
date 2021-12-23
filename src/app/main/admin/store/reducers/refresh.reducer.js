import { REFRESH } from '../actions';

const INITIAL_STATE = {
  STATE_ROLE_ASSIGNMENT: false,
  LEGAL_ENTITY: false,
  TEAM_ROLES: false,
  DEFAULT_ROLES: false,
  STATE_EVICTION: false,
  MANAGE_VALUVATION: false,
  MANAGE_COMMISSION: false,
  MANAGE_WORKFLOW_SETTING: false,
  MANAGE_SET_RESERVE_PRICE: false,
  MANAGE_STATE_APPRAISAL: false,
  MI_COMPANY: false,
  INVESTOR: false,
  INVESTOR_GROUP: false
};

const adminRefreshReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REFRESH.ACCESS_MANAGMENT.MI_COMPANY: {
      return { ...state, MI_COMPANY: action.payload };
    }
    case REFRESH.ACCESS_MANAGMENT.INVESTOR: {
      return { ...state, INVESTOR: action.payload };
    }
    case REFRESH.ACCESS_MANAGMENT.INVESTOR_GROUP: {
      return { ...state, INVESTOR_GROUP: action.payload };
    }
    case REFRESH.SETTINGS.MANAGE_WORKFLOW_SETTING: {
      return { ...state, MANAGE_WORKFLOW_SETTING: action.payload };
    }
    case REFRESH.SETTINGS.MANAGE_SET_RESERVE_PRICE: {
      return { ...state, MANAGE_SET_RESERVE_PRICE: action.payload };
    }
    case REFRESH.SETTINGS.MANAGE_STATE_APPRAISAL: {
      return { ...state, MANAGE_STATE_APPRAISAL: action.payload };
    }
    case REFRESH.RULES.STATE_EVICTION: {
      return { ...state, STATE_EVICTION: action.payload };
    }
    case REFRESH.RULES.MANAGE_VALUVATION: {
      return { ...state, MANAGE_VALUVATION: action.payload };
    }
    case REFRESH.RULES.MANAGE_COMMISSION: {
      return { ...state, MANAGE_COMMISSION: action.payload };
    }
    case REFRESH.PROPERTY.STATE_ROLE_ASSIGNMENT: {
      return { ...state, STATE_ROLE_ASSIGNMENT: action.payload };
    }
    case REFRESH.PROPERTY.LEGAL_ENTITY: {
      return { ...state, LEGAL_ENTITY: action.payload };
    }
    case REFRESH.PROPERTY.TEAM_ROLES: {
      return { ...state, TEAM_ROLES: action.payload };
    }
    case REFRESH.PROPERTY.DEFAULT_ROLES: {
      return { ...state, DEFAULT_ROLES: action.payload };
    }
    default:
      return state;
  }
};

export default adminRefreshReducer;
