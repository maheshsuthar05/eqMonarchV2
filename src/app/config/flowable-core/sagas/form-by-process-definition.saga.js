import { put, takeLatest, call } from 'redux-saga/effects';
import { core } from '../services';
import * as Actions from '../store/actionTypes';
import * as appActions from 'app/store/actions/actionTypes';

function* getFormByProcessDefinition(args) {
  try {
    const processDefinition = yield call(core.getProcessDefinition, args);
    const formDefinition = yield call(
      core.getFormByProcessDefinition,
      encodeURIComponent(processDefinition.data[0].id)
    );
    yield put({
      type: Actions.FLOWABLE_GET_DEFINITION,
      payload: formDefinition,
      formFinalAction: formDefinition,
      formAction: args.formAction
    });
  } catch (e) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Fetch Form Definition failed',
      atAction: Actions.FLOWABLE_GET_FORM_BY_PROCESS_DEFINITION_FAILED
    });
  }
}

function* getFormByProcessDefinitionFromLocalByFileName(req) {
  try {
    const formDefinition = yield call(
      core.getLocalFormByFileName,
      req.fileNamePath
    );
    yield put({
      type: Actions.FLOWABLE_GET_DEFINITION,
      formFinalAction: formDefinition
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Fetch Form Definition failed',
      atAction: Actions.FLOWABLE_GET_FORM_BY_PROCESS_DEFINITION_LOCAL_FAILED
    });
  }
}

export function* getFormByProcessDefinitionWatcher() {
  yield takeLatest(
    Actions.FLOWABLE_GET_FORM_BY_PROCESS_DEFINITION,
    getFormByProcessDefinition
  );
}

export function* getFormByProcessDefinitionFromLocalByFileNameWatcher() {
  yield takeLatest(
    Actions.FLOWABLE_GET_FORM_BY_PROCESS_DEFINITION_LOCAL,
    getFormByProcessDefinitionFromLocalByFileName
  );
}
