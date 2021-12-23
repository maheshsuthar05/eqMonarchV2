import { randomUniqueIdentifier } from 'app/common/helpers/common-helper';
import * as Actions from '../actionTypes';

export const getApiServices=(payload)=>{
  return{
    type:Actions.GET_OPERATION_TESTING_START,
    payload
  }
}
export const getOperations = (routeParams) => ({
  type: Actions.GET_OPERATIONS,
  routeParams
});

export const fetchOperations = (data) => ({
  type: Actions.FETCH_OPERATIONS,
  payload: data
});

export const deleteOperation = (data, routeParams) => ({
  type: Actions.DELETE_OPERATION,
  payload: data,
  routeParams
});

export const addNewOperation = (data, routeParams) => ({
  type: Actions.INSERT_NEW_OPERATION,
  payload: data,
  routeParams
});

export const editOperation = (data, routeParams) => ({
  type: Actions.EDIT_OPERATION,
  payload: data,
  routeParams
});

export const setOperationSearchText = (text) => ({
  type: Actions.SET_OPERATIONS_SEARCH_TEXT,
  searchText: text
});

export const getOperationById = (data) => ({
  type: Actions.GET_OPERATION_BY_ID,
  payload: data
});

export const fetchOperationById = (data) => ({
  type: Actions.FETCH_OPERATION_BY_ID,
  payload: data
});

export const getMappingByOperationId = (data) => ({
  type: Actions.GET_MAPPING_BY_OPERATION,
  payload: data
});

export const fetchMappingByOperationId = (data) => ({
  type: Actions.FETCH_MAPPING_BY_OPERATION,
  payload: data
});

export const saveMappingByOperationID = (data, operationsId) => ({
  type: Actions.SAVE_MAPPINGS_BY_OPERATION,
  payload: data,
  operationsId
});

export const updateMappingByOperationID = (data, operationsId) => ({
  type: Actions.UPDATE_MAPPINGS_BY_OPERATION,
  payload: data,
  operationsId
});

export const InsertTemplate = (data) => ({
  type: Actions.INSERT_TEMPLATE,
  payload: data
});

export const deleteMappingByOperationID = (data, operationsId) => ({
  type: Actions.DELETE_MAPPINGS_BY_OPERATION,
  payload: data,
  operationsId
});

export const updateOperationalDetails = (
  oldData,
  newData,
  operationId,
  operation,
  key,
  routeParams
) => ({
  type: Actions.UPDATE_INPUT_OPERATION,
  oldData: oldData,
  newData: newData,
  randomId: randomUniqueIdentifier(),
  operation,
  key,
  operationId,
  routeParams
});

export const mappingPublish = (data, action) => ({
  type: Actions.UPDATE_MAPPING_PUBLISHED,
  data,
  action
});
