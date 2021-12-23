import * as Actions from '../store/actionTypes';
import * as appActions from 'app/store/actions/actionTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { predefinedListService } from '../services/predefined-list.service';

function* getStateUS() {
  try {
    const response = yield call(predefinedListService.getStateUS);
    //convert it to object
    let stateUSMap = new Map();
    let stateUSList = [];
    if (response && response._embedded && response._embedded.states) {
      response._embedded.states.map((item) => {
        stateUSMap[item.stateCode] = item.stateName;
        return item;
      });
      stateUSList = response._embedded.states;
    }
    yield put({
      type: Actions.GET_STATE_US_SUCCESS,
      payload: stateUSList,
      stateUSMap: stateUSMap
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Fetch State failed',
      atAction: Actions.GET_STATE_US_SUCCESS
    });
  }
}

function* getDeliverableMatrix() {
  try {
    const response = yield call(predefinedListService.getDeliverableMatrix);
    //convert it to object
    let map = new Map();
    let deliverableMatrix = [];
    if (
      response &&
      response._embedded &&
      response._embedded.enumerationMasters
    ) {
      response._embedded.enumerationMasters.map((item) => {
        map[item.enumerationValue] = item.enumerationDisplayName;
        return item;
      });
      deliverableMatrix = response._embedded.enumerationMasters;
      deliverableMatrix.sort((a, b) =>
        a.enumerationDisplayName > b.enumerationDisplayName ? 1 : -1
      );
    }
    yield put({
      type: Actions.GET_DELIVERABLE_MATRIX_SUCCESS,
      payload: deliverableMatrix,
      deliverableMatrixMap: map
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Fetch Deliverable Matrix failed',
      atAction: Actions.GET_DELIVERABLE_MATRIX
    });
  }
}

function* getEvictionType() {
  try {
    const response = yield call(predefinedListService.getEvictionType);
    //convert it to object
    let map = new Map();
    let list = [];
    if (
      response &&
      response._embedded &&
      response._embedded.enumerationMasters
    ) {
      response._embedded.enumerationMasters.map((item) => {
        map[item.enumerationValue] = item.enumerationDisplayName;
        return item;
      });
      list = response._embedded.enumerationMasters;
      list.sort((a, b) =>
        a.enumerationDisplayName > b.enumerationDisplayName ? 1 : -1
      );
    }
    yield put({
      type: Actions.GET_EVICTION_TYPE_SUCCESS,
      payload: list,
      evictionTypeMap: map
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Fetch Eviction Type failed',
      atAction: Actions.GET_EVICTION_TYPE
    });
  }
}

function* getPropertyType() {
  try {
    const response = yield call(predefinedListService.getPropertyTypeAPI);
    //convert it to object
    let map = new Map();
    let list = [];
    if (
      response &&
      response._embedded &&
      response._embedded.enumerationMasters
    ) {
      response._embedded.enumerationMasters.map((item) => {
        map[item.enumerationValue] = item.enumerationDisplayName;
        return item;
      });
      list = response._embedded.enumerationMasters;
      list.sort((a, b) =>
        a.enumerationDisplayName > b.enumerationDisplayName ? 1 : -1
      );
    }
    yield put({
      type: Actions.GET_PROPERTY_TYPE_SUCCESS,
      payload: list,
      propertyTypeMap: map
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Failed to fetch the data',
      atAction: Actions.GET_PROPERTY_TYPE_FAILURE
    });
  }
}

function* getTaskData() {
  try {
    const response = yield call(predefinedListService.getTaskDataAPI);
    //convert it to object
    let map = new Map();
    let list = [];
    if (
      response &&
      response._embedded &&
      response._embedded.enumerationMasters
    ) {
      response._embedded.enumerationMasters.map((item) => {
        map[item.enumerationValue] = item.enumerationDisplayName;
        return item;
      });
      list = response._embedded.enumerationMasters;
      list.sort((a, b) =>
        a.enumerationDisplayName > b.enumerationDisplayName ? 1 : -1
      );
    }
    yield put({
      type: Actions.GET_TASK_DATA_SUCCESS,
      payload: list,
      taskTypeMap: map
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Failed to fetch the data',
      atAction: Actions.GET_TASK_DATA_FAILURE
    });
  }
}

function* getAgentType() {
  try {
    const response = yield call(predefinedListService.getAgentTypeAPI);
    //convert it to object
    let map = new Map();
    let list = [];
    if (
      response &&
      response._embedded &&
      response._embedded.enumerationMasters
    ) {
      response._embedded.enumerationMasters.map((item) => {
        map[item.enumerationValue] = item.enumerationDisplayName;
        return item;
      });
      list = response._embedded.enumerationMasters;
      list.sort((a, b) =>
        a.enumerationDisplayName > b.enumerationDisplayName ? 1 : -1
      );
    }
    yield put({
      type: Actions.GET_AGENT_TYPE_SUCCESS,
      payload: list,
      agentTypeMap: map
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Failed to fetch the data',
      atAction: Actions.GET_AGENT_TYPE_FAILURE
    });
  }
}

export function* watchGetStateUS() {
  yield takeLatest(Actions.GET_STATE_US, getStateUS);
}

export function* watchGetDeliverableMatrix() {
  yield takeLatest(Actions.GET_DELIVERABLE_MATRIX, getDeliverableMatrix);
}

export function* watchGetEvictionType() {
  yield takeLatest(Actions.GET_EVICTION_TYPE, getEvictionType);
}

export function* watchGetPropertyType() {
  yield takeLatest(Actions.GET_PROPERTY_TYPE, getPropertyType);
}

export function* watchGetTaskData() {
  yield takeLatest(Actions.GET_TASK_DATA, getTaskData);
}

export function* watchGetAgentType() {
  yield takeLatest(Actions.GET_AGENT_TYPE, getAgentType);
}
