import * as Actions from '../actionTypes';

const initialState = {
  navigationResources: [],
  loadingResources: true,
  contextLoadingResources: true,
  contextResources: []
};

const IAMResourceProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.NAVIGATION_RESOURCE_START: {
      return {
        ...state,
        loadingResources: true,
        navigationResources: []
      };
    }
    case Actions.NAVIGATION_RESOURCE_SUCCESS: {
      return {
        ...state,
        navigationResources: action.resources,
        loadingResources: false
      };
    }

    case Actions.CONTEXT_RESOURCE_START: {
      return {
        ...state,
        contextLoadingResources: true,
        contextResources: []
      };
    }
    case Actions.CONTEXT_RESOURCE_SUCCESS: {
      return {
        ...state,
        contextResources: action.resources,
        contextLoadingResources: false
      };
    }
    case Actions.CONTEXT_RESOURCE_FAILURE: {
      return {
        ...state,
        contextResources: [],
        contextLoadingResources: false
      };
    }

    default: {
      return state;
    }
  }
};

export default IAMResourceProviderReducer;
