import * as Actions from '../actionTypes';

export const getUnreadMailCount = (count) => ({
  type: Actions.GET_MAILS_UNREAD_COUNT,
  count: count
});

export const fetchUnreadMailCount = () => ({
  type: Actions.FETCH_MAILS_UNREAD_COUNT
});
