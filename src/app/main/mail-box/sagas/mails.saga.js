import { put, takeLatest, call, all } from 'redux-saga/effects';

import * as Actions from '../store/actionTypes';
import { messageApi } from '../services/message.service';

function* fetchMails(routeParams) {
  try {
    const json = yield call(messageApi.get, routeParams);
    yield put({
      type: Actions.GET_MAILS,
      routeParams: routeParams,
      payload: json
    });
    yield put({ type: Actions.FETCH_MAILS_UNREAD_COUNT });
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Failed to fetch messages',
        atAction: Actions.FETCH_MAILS
      }),
      yield put({
        type: Actions.GET_MAILS,
        routeParams: routeParams,
        payload: []
      })
    ]);
  }
}

function* searchMailsByText(search) {
  try {
    if (search.searchText.length > 0) {
      yield searchByText(search);
    } else {
      yield put({ type: Actions.FETCH_MAILS, routeParams: search.routeParams });
    }
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Failed to fetch messages',
        atAction: Actions.SET_SEARCH_TEXT
      }),
      yield put({ type: Actions.FETCH_MAILS })
    ]);
  }
}

function* searchByText(search) {
  const json = yield call(messageApi.getBySearchText, search.searchText);
  yield put({
    type: Actions.GET_MAILS,
    routeParams: search.routeParams,
    payload: json
  });
}

function* fetchUnreadCount() {
  try {
    const json = yield call(messageApi.getUnReadCount);
    yield put({ type: Actions.GET_MAILS_UNREAD_COUNT, count: json });
  } catch (error) {
    // yield put({ type: 'API_CALL_ERROR', error: 'Failed to fetch unread messages count', atAction: Actions.GET_MAILS_UNREAD_COUNT });
  }
}

export function* mailsWatcher() {
  yield takeLatest(Actions.FETCH_MAILS, fetchMails);
}

export function* searchMailsWatcher() {
  yield takeLatest(Actions.SET_SEARCH_TEXT, searchMailsByText);
}

export function* countMailWatcher() {
  yield takeLatest(Actions.FETCH_MAILS_UNREAD_COUNT, fetchUnreadCount);
}
