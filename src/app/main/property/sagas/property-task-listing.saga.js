import { taskApi } from 'app/main/property/services/task.api';
import * as propertyActions from 'app/main/property/store/actions';
import { PROPERTY_TASK_LISTING_FORM_FETCH_START } from 'app/main/property/store/actionTypes';
import { call, put, takeLatest } from 'redux-saga/effects';

function* getPropertyTaskListingForm(state) {
  const { taskType } = state;
  try {
    let formDefinition = null;
    if (taskType === 'open') {
      formDefinition = yield call(
        taskApi.getPropertyTaskListOpenFormDefinition
      );
    } else {
      formDefinition = yield call(
        taskApi.getPropertyTaskListCloseFormDefinition
      );
    }
    yield put(
      propertyActions.fetchPropertyTaskListingFormSuccess(formDefinition)
    );
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyTaskListingFormFailure(error.message)
    );
  }
}

function* watchGetPropertyTaskListingForm() {
  yield takeLatest(
    PROPERTY_TASK_LISTING_FORM_FETCH_START,
    getPropertyTaskListingForm
  );
}

export default watchGetPropertyTaskListingForm;
