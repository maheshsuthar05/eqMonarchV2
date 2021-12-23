import * as Actions from '../actionTypes';

export const claimsTaskOpenPayload = (caseInstanceId) => ({
  type: Actions.REQUEST_OPEN_CLAIM_TASK_PAYLOAD,
  caseInstanceId
});

export const claimsTaskClosePayload = (caseInstanceId) => ({
  type: Actions.REQUEST_CLOSE_CLAIM_TASK_PAYLOAD,
  caseInstanceId
});

export const customFetch = (url, payload, tenantCode) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('tenantCode', tenantCode);
  const customFetch = (input, init): Promise<any> => {
    return window.fetch(url, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(payload)
    });
  };
  return customFetch;
};
