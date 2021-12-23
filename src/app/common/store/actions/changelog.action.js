import { REQUEST_CHANGE_LOG_PAYLOAD_START } from 'app/common/store/actionTypes';

export const changelogRequestPayload = (payload) => ({
  type: REQUEST_CHANGE_LOG_PAYLOAD_START,
  payload
});
