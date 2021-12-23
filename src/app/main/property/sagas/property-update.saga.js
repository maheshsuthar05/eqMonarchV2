import { PropertyApiConfig } from 'app/config/api';
import {
  PROPERTY_UPDATE_FORM_FETCH_START,
  PROPERTY_UPDATE_START
} from 'app/main/property/store/actionTypes';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { propertyApi } from '../services/property.api';
import { closeModal } from 'app/store/actions';
import * as propertyActions from '../store/actions';

function* getPropertyUpdateForm(action) {
  try {
    const { tenantCode } = action;
    const key = PropertyApiConfig.keys.update_form;
    const processDefinition = yield call(
      propertyApi.getProcessDefinition,
      tenantCode,
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
      tenantCode,
      processDefinitionId
    );
    yield put(propertyActions.fetchPropertyUpdateFormSuccess(formDefinition));
  } catch (error) {
    yield put(propertyActions.fetchPropertyUpdateFormFailure(error.message));
  }
}

export function* watchGetPropertyUpdateForm() {
  yield takeLatest(PROPERTY_UPDATE_FORM_FETCH_START, getPropertyUpdateForm);
}

function* propertyUpdate(action) {
  try {
    const { payload } = action;
    const response = yield call(propertyApi.propertyUpdate, payload);
    yield all([
      put(propertyActions.propertyUpdateSuccess(response)),
      put({
        type: 'API_CALL_SUCCESS',
        message: 'Property has been updated successfully.'
      }),
      put(closeModal())
    ]);
  } catch (error) {
    yield put(closeModal());
    yield all([
      put({
        type: 'API_CALL_ERROR',
        error: `Could not update property. ${error.message}`,
        showError: true
      })
    ]);
  }
}

export function* watchPropertyUpdate() {
  yield takeLatest(PROPERTY_UPDATE_START, propertyUpdate);
}
