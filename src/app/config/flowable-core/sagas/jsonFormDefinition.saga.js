import _ from '@lodash';
import { put, takeEvery, call, all } from 'redux-saga/effects';
import { jsonDefinitionApi } from '../services';
import * as Actions from '../store/actionTypes';

function* jsonFormDefinition(arg) {
  try {
    yield processAllFiles(arg.path, arg.fileNames, arg.formAction);
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Fetch Form Definition failed',
      atAction: arg.formAction
    });
  }
}
function* fetchApi(arg, formAction) {
  try {
    const response = yield call(jsonDefinitionApi.get, arg);
    arg.json = response;
    yield put({
      type: formAction,
      fileName: arg.fileName,
      json: arg,
      formDef: response,
      completed: true
    });
  } catch (e) {
    return e;
  }
}
function* processAllFiles(path, _fileNames, formAction) {
  try {
    yield all(
      _.map(_fileNames, (fileName) => {
        const data = {
          path,
          fileName
        };

        return call(fetchApi, data, formAction);
      })
    );
  } catch (e) {
    return e;
  }
}

export function* jsonFormDefinitionWatcher() {
  yield takeEvery(
    Actions.FLOWABLE_PROCESS_DEFINITION_BY_JSON,
    jsonFormDefinition
  );
}
