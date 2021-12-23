import { all } from 'redux-saga/effects';

import {WatchGetApiServices,WatchGetInitialData} from './service.test.saga';

export default function* serviceTestSaga() {
    yield all([
        WatchGetApiServices(),
        WatchGetInitialData()
    ]);
}