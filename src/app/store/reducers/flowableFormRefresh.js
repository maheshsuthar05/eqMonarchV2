import * as Actions from 'app/store/actions/actionTypes';

const initialState = {
  formRefreshFlag: false
};

const flowableFormRefresh = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FLOWABLE_FORM_REFRESH_SUCCESS: {
      return {
        ...state,
        formRefreshFlag: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default flowableFormRefresh;
