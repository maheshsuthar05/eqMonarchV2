import * as Actions from './../actionTypes';

const initialState = {
  stateAction: false,
  formDefinition: null,
  completed: false,
  productCategoryData: [],
  productCategoryDataComplete: false
};

const manageProductVendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FETCH_MANAGE_PRODUCT_FORM:
      return {
        ...state,
        completed: false
      };
    case Actions.PROCESS_MANAGE_PRODUCT_FORM:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.json
        }
      };
    case Actions.PROCESS_MANAGE_PRODUCT_FORM_SUCCESS:
      return {
        ...state,
        completed: false
      };
    case Actions.CLOSE_MODEL:
      return {
        ...state,
        completed: action.userAction
      };
    case Actions.FETCH_MANAGE_PRODUCT_LIST:
      return {
        ...state,
        productCategoryDataComplete: false
      };
    case Actions.FETCH_MANAGE_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productCategoryDataComplete: true
      };
    case Actions.FETCH_MANAGE_PRODUCT_LIST_CLEAR:
      return {
        ...state,
        productCategoryData: [],
        productCategoryDataComplete: false
      };
    case Actions.FETCH_PRODUCT_CATEGORY_DATA:
      return {
        ...state,
        productCategoryData: [
          ...state.productCategoryData,
          buildJsonInformation(action.productInfo, action.categoryInfo)
        ]
      };
    default:
      return state;
  }
};

export default manageProductVendorReducer;

const buildJsonInformation = (product, category) => {
  const data = {
    product,
    category
  };
  return data;
};
