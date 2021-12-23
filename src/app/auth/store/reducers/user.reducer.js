import Cookies from 'js-cookie';
import * as Actions from '../actions';
import { _cookies } from 'app/auth/store/actions';
import { forgerock } from 'app/config/api';

export const saveUserState = (payload) => {
  try {
    localStorage.removeItem('userState');
    const serializedState = JSON.stringify(payload);
    localStorage.setItem(
      'userState',
      _cookies.string.encodeBase64(serializedState)
    );
  } catch (e) {
    // Ignore write errors;
  }
};

export const loadUserState = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null || serializedState === '') {
      return {
        roles: [],
        data: {
          displayName: '',
          email: '',
          shortcuts: [],
          userName: '',
          id: '',
          encodedValue: '',
          userType: ''
        },
        tenantIds: [],
        tenantCode: '',
        realm: '',
        externalURLs: '',
        selectedResource: '',
        selectedTenant: '',
        datastudioAuth: []
      };
    }
    return JSON.parse(_cookies.string.decodeBase64(serializedState));
  } catch (e) {
    return undefined;
  }
};

const initialState = loadUserState();

const user = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_USER_DATA: {
      return {
        ...state
      };
    }
    case Actions.SET_USER_DATA: {
      return {
        ...state,
        ...action.payload
      };
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...initialState
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return initialState;
    }
    case Actions.USER_CHANGE_TENANT:
      return {
        ...state,
        tenantCode: action.tenantCode,
        tenantCodeChanged: true
      };
    case Actions.SET_TENANT_FROM_VENDOR_AGENT_TASK: {
      return {
        ...state,
        tenantIds: [_cookies.getCookies('vendorTaskSearchTenant')],
        tenantCode: _cookies.getCookies('vendorTaskSearchTenant')
      };
    }
    case Actions.SET_INITIAL_USER_PROFILE_SETTINGS:
      return {
        ...state,
        ...action.payload
      };
    case Actions.DASHBOARD_CURRENT_TENANT_SUCCESS: {
      return {
        ...state,
        externalURLs: action.externalURLs,
        datastudioAuth: action.datastudioAuth
      };
    }
    case Actions.DASHBOARD_SET_SELECTED_RESOURCE_SUCCESS: {
      return {
        ...state,
        selectedResource: action.selectedResource
      };
    }
    case Actions.USER_SELECTED_TENANT: {
      return {
        ...state,
        selectedTenant: setSelectedTenant(action.selectedTenant)
      };
    }
    case Actions.DATASTUDIO_REDIRECT_SUCCESS: {
      return {
        ...state,
        redirect: action.rediect
      };
    }
    case Actions.DATASTUDIO_REDIRECT_FAILURE: {
      return {
        ...state,
        redirect: false
      };
    }
    default: {
      return state;
    }
  }
};

export default user;

const setSelectedTenant = (selected) => {
  Cookies.set(forgerock.cookie.selectedTenant, selected);
  return selected;
};
