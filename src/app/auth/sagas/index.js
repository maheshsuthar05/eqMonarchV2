import { all } from 'redux-saga/effects';
import login from './login.saga';
import resources from './auth.saga';
import logoutWatcher, { clearUserCookieWatcher } from './logout.saga';

export default function* loginWatcherSaga() {
  yield all([
    login.loginWatcher(),
    login.sessionWatcher(),
    logoutWatcher(),
    resources.dashboardCurrentTenantWatcher(),
    resources.dashboardSelectedResourceWatcher(),
    resources.datastudioRedirectWatcher(),
    clearUserCookieWatcher()
  ]);
}
