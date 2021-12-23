import * as Actions from './../actionTypes';

export const modelAction = (userAction) => ({
  type: Actions.CLOSE_MODEL,
  userAction
});
