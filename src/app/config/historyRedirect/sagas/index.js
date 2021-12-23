import { all } from 'redux-saga/effects';
import historyRedirectWatcher from './historyRedirect.saga';

export default function* historyRedirectSaga() {
  yield all([historyRedirectWatcher()]);
}
