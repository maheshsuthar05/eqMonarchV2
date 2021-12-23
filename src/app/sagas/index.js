import integrationSaga from 'app/main/integration/sagas';
import authSaga from 'app/auth/sagas';
import commonSaga from 'app/common/sagas';
import propertySaga from 'app/main/property/sagas';
import taskManagementAppSaga from 'app/main/task-management/sagas';
import tenantSaga from 'app/main/tenant/sagas';
import mailComposeSaga from 'app/main/mail-box/sagas';
import fileUploadSaga from './file-upload.saga';
import { all } from 'redux-saga/effects';
import serviceTestSaga from 'app/main/integration/service-test/sagas';
import flowableCoreSaga from 'app/config/flowable-core/sagas';
import adminSaga from 'app/main/admin/sagas';
import verificationSaga from 'app/main/verification/sagas';
import offerSaga from 'app/main/offer/sagas';
import vendorSaga from 'app/main/vendor/sagas';
import historyRedirectSaga from 'app/config/historyRedirect/sagas';
import monarchModalWatcher from './model.saga';
import flowableControlSaga from 'app/config/flowable-control/sagas';
import flowableFormRefreshWatcher from './flowable-form-refresh.saga';
// import { famGetWatcher } from './fam/fam.saga';

export default function* rootSaga() {
  yield all([
    integrationSaga(),
    commonSaga(),
    authSaga(),
    propertySaga(),
    tenantSaga(),
    mailComposeSaga(),
    fileUploadSaga(),
    taskManagementAppSaga(),
    serviceTestSaga(),
    flowableCoreSaga(),
    adminSaga(),
    verificationSaga(),
    offerSaga(),
    vendorSaga(),
    historyRedirectSaga(),
    monarchModalWatcher(),
    flowableControlSaga(),
    flowableFormRefreshWatcher()
    // famGetWatcher()
  ]);
}
