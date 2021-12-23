import watchNavigation from 'app/common/sagas/navigation.saga';
import iamResource from 'app/common/sagas/iam-resource-provider.saga';
import {
  watchGetStateUS,
  watchGetDeliverableMatrix,
  watchGetEvictionType,
  watchGetPropertyType,
  watchGetTaskData,
  watchGetAgentType
} from './predefined-list.saga';
import watchExploreTour from './explore-tour.saga';
import { all, call } from 'redux-saga/effects';
import {
  watchDownloadFile,
  watchCheckTemplate,
  watchGenerateFile,
  watchSetFileUrl
} from './file-utility.saga';
import { watchDocumentDelete, watchGetDocumentsList } from './documents.saga';
import { watchGetChangelogRequestPayload } from './changelog.saga';

export default function* commonSaga() {
  yield all([
    call(watchNavigation),
    call(iamResource.contextResourceWatcher),
    call(iamResource.navigationResourceWatcher),
    call(watchGetStateUS),
    call(watchGetEvictionType),
    call(watchGetDeliverableMatrix),
    call(watchGetPropertyType),
    call(watchGetTaskData),
    call(watchGetAgentType),
    call(watchExploreTour),
    call(watchDownloadFile),
    call(watchCheckTemplate),
    call(watchGenerateFile),
    call(watchSetFileUrl),
    call(watchDocumentDelete),
    call(watchGetDocumentsList),
    call(watchGetChangelogRequestPayload)
  ]);
}
