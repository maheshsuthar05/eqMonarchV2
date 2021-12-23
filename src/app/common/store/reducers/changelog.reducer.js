import {REQUEST_CHANGE_LOG_PAYLOAD_SUCCESS} from 'app/common/store/actionTypes';
  
  const INITIAL_STATE = {
    requestPayload:{}
  };
  
  const changelogReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case REQUEST_CHANGE_LOG_PAYLOAD_SUCCESS:
        return{
          ...state,
          requestPayload:action.payload
        }
      default:
        return state;
    }
  };
  
  export default changelogReducer;
  