import history from '@history';
import _ from '@lodash';
import auth0Service from 'app/services/auth0Service';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import * as FuseActions from 'app/store/actions/fuse';
import * as Actions from '../actionTypes';
import { contextInfo } from 'app/common/helpers';
import { verifyRedirection } from 'app/main/verification/store/actions';

export function setUserData() {
  return (dispatch, getState) => {
    dispatch(verifyRedirection());
    const user = getState().auth.user;
    dispatch(FuseActions.setDefaultSettings(user.data.settings));

    dispatch({
      type: Actions.SET_USER_DATA,
      payload: user
    });
  };
}

export function updateUserSettings(settings) {
  return (dispatch, getState) => {
    const oldUser = getState().auth.user;
    const user = _.merge({}, oldUser, { data: { settings } });

    updateUserData(user, dispatch);
    return dispatch(setUserData(user));
  };
}

export function updateUserShortcuts(shortcuts) {
  return (dispatch, getState) => {
    const { user } = getState().auth;
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts
      }
    };

    updateUserData(newUser, dispatch);
    return dispatch(setUserData(newUser));
  };
}

export function removeUserData() {
  return {
    type: Actions.REMOVE_USER_DATA
  };
}

export function logoutUser() {
  return (dispatch, getState) => {
    const { user } = getState().auth;

    if (!user.tenantIds || user.tenantIds.length === 0) {
      // is guest
      return null;
    }

    history.push({
      pathname: '/'
    });

    switch (user.from) {
      case 'firebase': {
        firebaseService.signOut();
        break;
      }
      case 'auth0': {
        auth0Service.logout();
        break;
      }
      default: {
        jwtService.logout();
      }
    }

    dispatch(FuseActions.setInitialSettings());

    return dispatch({
      type: Actions.USER_LOGGED_OUT
    });
  };
}

function updateUserData(user, dispatch) {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }

  switch (user.from) {
    case 'firebase': {
      firebaseService
        .updateUserData(user)
        .then(() => {
          dispatch(
            MessageActions.showMessage({
              message: 'User data saved to firebase'
            })
          );
        })
        .catch((error) => {
          dispatch(MessageActions.showMessage({ message: error.message }));
        });
      break;
    }
    case 'auth0': {
      auth0Service
        .updateUserData({
          settings: user.data.settings,
          shortcuts: user.data.shortcuts
        })
        .then(() => {
          dispatch(
            MessageActions.showMessage({ message: 'User data saved to auth0' })
          );
        })
        .catch((error) => {
          dispatch(MessageActions.showMessage({ message: error.message }));
        });
      break;
    }
    default: {
      jwtService
        .updateUserData(user)
        .then(() => {
          dispatch(
            MessageActions.showMessage({ message: 'User data saved with api' })
          );
        })
        .catch((error) => {
          dispatch(MessageActions.showMessage({ message: error.message }));
        });
      break;
    }
  }
}

export const changeUserTenant = (action) => ({
  type: Actions.USER_CHANGE_TENANT,
  tenantCode: action.tenantCode
});

export const getUserTenentCode = (getState) => {
  return getState.auth.user.tenantCode;
};

export const selectedTenant = (selectedTenant = contextInfo().tenantCode) => ({
  type: Actions.USER_SELECTED_TENANT,
  selectedTenant
});

export const redirectDataStudio = (authDetails, tenantCodeChange) => ({
  type: Actions.DATASTUDIO_REDIRECT_START,
  authDetails,
  tenantCodeChange
});
