import * as actionType from '../actionTypes';

const initialState = {
    serviceData: {},
    loading: false,
    integrationData:{},
    bodyValue:null
}
const serviceTest = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_API_SERVICES_SUCCESS:
            return {
                ...state,
                serviceData: action.payload,
                loading: false
            }
        case actionType.GET_API_SERVICES_LOADING:
            return {
                ...state,
                loading: true
            }
        case actionType.GET_DATA_INTEGRATION_DATA_SUCCESS:
            return{
                ...state,
                integrationData:action.payload
            }
         case actionType.GET_BODY_VALUE_SUCCESS:
             return{
                 ...state,bodyValue:action.payload
             }     
        default:
            return state
    }
}

export default serviceTest;
