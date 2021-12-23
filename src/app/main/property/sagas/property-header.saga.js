import { PropertyApiConfig } from 'app/config/api';
import * as Actions from 'app/main/property/store/actionTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { propertyApi } from '../services/property.api';
import * as propertyActions from '../store/actions';

function* getPropertyHeaderForm(action) {
  try {
    const key = PropertyApiConfig.keys.header_form;
    const processDefinition = yield call(
      propertyApi.getProcessDefinition,
      action.tenantCode,
      key
    );
    let processDefinitionId = null;
    if (
      processDefinition &&
      processDefinition.data &&
      processDefinition.data.length
    ) {
      processDefinitionId = processDefinition.data[0].id;
    }
    const formDefinition = yield call(
      propertyApi.getFormDefinitionByProcess,
      action.tenantCode,
      processDefinitionId
    );
    yield put(propertyActions.fetchPropertyHeaderFormSuccess(formDefinition));
  } catch (error) {
    yield put(propertyActions.fetchPropertyHeaderFormFailure(error.message));
  }
}


function* watchGetPropertyHeaderForm() {
  yield takeLatest(Actions.PROPERTY_HEADER_FORM_FETCH_START, getPropertyHeaderForm);
}

function* processInstances(args) {
  try {
    const instances = yield call(propertyApi.getAllProcessInstances, args.data);
    yield put({
      type: Actions.PROPERTY_GET_ALL_PROCESS_INSTANCES_SUCCESS,
      allProcessIntances: instances.data
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Fetch Process Intancess failed',
      atAction: Actions.PROPERTY_GET_ALL_PROCESS_INSTANCES_SUCCESS
    });
  }
}

export function* watchProcessInstances(args) {
  yield takeLatest(
    Actions.PROPERTY_GET_ALL_PROCESS_INSTANCES,
    processInstances
  );
}

export default watchGetPropertyHeaderForm;
