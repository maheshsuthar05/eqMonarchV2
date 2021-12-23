import * as actionType from '../actionTypes';

export const getApiServices = () => ({type: actionType.GET_API_SERVICES_START})
export const getApiServicesSuccess = (payload) => ({type: actionType.GET_API_SERVICES_SUCCESS,payload})

export const getIntegrationDataStart = () => ({type: actionType.GET_DATA_INTEGRATION_DATA_START})

export const getIntegrationDataSuccess = (payload) => {
    return {type: actionType.GET_DATA_INTEGRATION_DATA_SUCCESS, payload}
}

export const setBodyValue = (payload) => {
    return {type: actionType.GET_BODY_VALUE_SUCCESS, payload}
}
