import { put, call, takeEvery } from 'redux-saga/effects';
import { core } from '../services';
import * as Actions from '../store/actionTypes';
import * as appActions from 'app/store/actions/actionTypes';

function* getFormById(req) {
  try {
    const formDefinition = yield call(core.getFormByCaseId, req.id);
    yield put({
      type: Actions.FLOWABLE_GET_DEFINITION,
      payload: formDefinition,
      formFinalAction: formDefinition
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Fetch Form Definition failed',
      atAction: Actions.FLOWABLE_GET_FORM_BY_CASE_DEFINITION_ID_FAILED
    });
  }
}

export function* getFormByIdWatcher() {
  yield takeEvery(Actions.FLOWABLE_GET_FORM_BY_CASE_DEFINITION_ID, getFormById);
}
