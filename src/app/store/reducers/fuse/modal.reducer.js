import * as Actions from 'app/store/actions/fuse';

const initialState = {
  state: false,
  options: {
    buttonstate: '',
    children: '',
    title: '',
    buttons: ''
  },
  payload: {
    processed: false,
    data: {}
  }
};

const dialog = (state = initialState, action) => {
  switch (action.type) {
    case Actions.OPEN_MODAL: {
      return {
        ...state,
        state: true,
        options: {
          ...state.options,
          ...action.options
        },
        payload: {
          processed: false,
          data: {}
        }
      };
    }
    case Actions.CLOSE_MODAL: {
      return {
        ...state,
        state: false
      };
    }
    case Actions.RESET_MODAL: {
      return {
        ...initialState
      };
    }
    case Actions.UPDATE_MODAL: {
      return {
        ...state,
        options: {
          ...state.options,
          buttons: {
            ...state.options.buttons,
            props: {
              ...state.options.buttons.props,
              children: {
                ...state.options.buttons.props.children,
                props: {
                  ...state.options.buttons.props.children.props,
                  disabled: !action.buttonState
                }
              }
            }
          }
        },
        payload: {
          ...state.payload,
          processed: action.processed,
          data: action.data
        }
      };
    }
    case Actions.FETCH_MODAL_DATA: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
};

export default dialog;
