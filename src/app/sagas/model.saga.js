import { put, takeLatest } from 'redux-saga/effects';
import * as Actions from 'app/store/actions/fuse';

function* closeModel() {
  try {
    yield put({ type: Actions.RESET_MODAL });
  } catch (error) {}
}

function* monarchModalWatcher() {
  yield takeLatest(Actions.CLOSE_MODAL, closeModel);
}

export default monarchModalWatcher;
