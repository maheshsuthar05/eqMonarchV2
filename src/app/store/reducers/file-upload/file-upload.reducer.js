import * as Actions from 'app/store/actions/actionTypes';

const initialState = {
    stateAction: false,
    uploaded: 0,
    completed: false,
    data: {},
    messageAttachments: []
};


const fileUploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.POST_UPLOAD_ATTACHMENT:
            return {
                ...state,
                stateAction: true,
                data: action.data,
                completed: false
            }
        case Actions.GET_UPLOAD_ATTACHMENT:
            return {
                ...state,
                stateAction: false,
                uploaded: state.uploaded + 1,
                messageAttachments: [...state.messageAttachments, action.json],
                completed: false
            }
        case Actions.FINISHED_UPLOAD:
            return {
                ...state,
                completed: true
            }
        case Actions.RESET_UPLOAD:
            return {
                ...state,
                completed: false
            }
        case Actions.RESET_UPLOAD_FILE:{
            return initialState
        }    
        default:
            return state;
    }
}

export default fileUploadReducer;