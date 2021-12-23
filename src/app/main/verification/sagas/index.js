import { all } from 'redux-saga/effects';

import verificationWatcher from './verification.saga';
import watchVerificationUser from './verificationUser.saga';

export default function* registrationSaga() {
  yield all([verificationWatcher(), watchVerificationUser()]);
}
