export const OPEN_MODAL = '[MODAL] OPEN';
export const CLOSE_MODAL = '[MODAL] CLOSE';
export const UPDATE_MODAL = '[MODAL] UPDATE';
export const FETCH_MODAL_DATA = '[MODAL] FETCH';
export const RESET_MODAL = '[MODAL] RESET';

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}

export function openModal(options) {
  return {
    type: OPEN_MODAL,
    options
  };
}

export const updateModal = (buttonState, data, processed) => {
  return {
    type: UPDATE_MODAL,
    buttonState,
    data,
    processed
  };
};

export const fetchModelData = () => {
  return {
    type: FETCH_MODAL_DATA
  };
};
