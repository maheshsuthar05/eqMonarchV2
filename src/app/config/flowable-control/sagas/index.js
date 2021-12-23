import { all } from 'redux-saga/effects';
import { flowableControlLoginWatcher } from './flowable-control.saga';

export default function* flowableControlSaga() {
  yield all([flowableControlLoginWatcher()]);
}
