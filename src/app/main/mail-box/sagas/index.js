import { all } from 'redux-saga/effects';

import composeWatcher from './compose.saga';
import messageWatcher from './message.saga';
import { mailsWatcher, searchMailsWatcher, countMailWatcher } from './mails.saga';
import { mailByIdWatcher, updateMailById } from './mail.saga';

export default function* mailComposeSaga() {
    yield all([
        composeWatcher(),
        messageWatcher(),
        mailsWatcher(),
        mailByIdWatcher(),
        updateMailById(),
        searchMailsWatcher(),
        countMailWatcher()
    ]);
}