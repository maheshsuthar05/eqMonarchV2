import * as Actions from '../actionTypes';

export const getServices = (page, size) => ({
  type: Actions.GET_SERVICES,
  page: page,
  size: size
});

export const fetchServices = (data) => ({
  type: Actions.FETCH_SERVICES,
  payload: data
});

export const deleteServices = (data) => ({
  type: Actions.DELETE_SERVICE,
  payload: data
});

export const addNewService = (data) => ({
  type: Actions.INSERT_NEW_SERVICE,
  payload: data
});

export const editService = (data) => ({
  type: Actions.EDIT_SERVICE,
  payload: data
});

export const setServicesSearchText = (text) => ({
  type: Actions.SET_SERVICES_SEARCH_TEXT,
  searchText: text
});

export const getServiceByID = (routeParam) => ({
  type: Actions.GET_SERVICES_BY_ID,
  payload: routeParam
});

export const getServiceDownload=(id)=>({
  type:Actions.GET_SERVICE_LIST_DOWNLOAD,
  id
})

export const getServiceUpload=(payload)=>({
  type:Actions.GET_SERVICE_LIST_UPLOAD,
  payload
})
