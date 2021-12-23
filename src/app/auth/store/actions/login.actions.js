import * as Actions from '../actionTypes'

export const submitLogin = (payload) => ({
    type: Actions.LOGIN_SUBMIT,
    username: payload.email,
    password: payload.password
});

export const loginSuccess = response => ({
    type: Actions.LOGIN_SUCCESS,
    response: response
});

export const loginFailure = error => ({
    type: Actions.LOGIN_ERROR,
    atAction: Actions.LOGIN_SUCCESS,
    error: error
});