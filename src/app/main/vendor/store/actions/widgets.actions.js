export const GET_WIDGETS = '[VENDOR DASHBOARD APP] GET WIDGETS';

export const getWidgets = (data) => {
  return (dispatch) =>
    dispatch({
      type: GET_WIDGETS,
      payload: data
    });
};
