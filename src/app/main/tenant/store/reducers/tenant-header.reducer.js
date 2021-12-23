import {
    TENANT_HEADER_FORM_FETCH_START, TENANT_HEADER_FORM_FETCH_SUCCESS, TENANT_HEADER_FORM_FETCH_FAILURE
} from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
    stateAction: false,
    inProgress: false,
    formDefinition: null,
    response: null,
    error: undefined
};

const tenantHeaderReducer = (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case TENANT_HEADER_FORM_FETCH_START:
            return {
                ...state,
                stateAction: false
            };
        case TENANT_HEADER_FORM_FETCH_SUCCESS:
            return {
                ...state,
                stateAction: true,
                    formDefinition: {
                        ...state.formDefinition,
                        ...action.payload
                    }
            };
        case TENANT_HEADER_FORM_FETCH_FAILURE:
            return {
                ...state,
                inProgress: false,
                stateAction: false,
                formDefinition: null,
                error: action.error
            };   
        default:
            return state;
    }
};

export default tenantHeaderReducer;