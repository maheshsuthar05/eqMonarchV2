import _ from '@lodash';
import * as Actions from '../actionTypes';

const initialState = {
  entities: [],
  routeParams: {},
  selectedMailIds: [],
  searchText: '',
  processing: true,
  rowData: {
    flag: false,
    rowData: {}
  }
};

const mailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.MAIL_TABLE_ROW_SELECT: {
      return {
        ...state,
        rowData: action.payload
      };
    }
    case Actions.FETCH_MAILS: {
      return {
        ...state,
        processing: true
      };
    }
    case Actions.GET_MAILS: {
      return {
        ...state,
        processing: false,
        entities: _.keyBy(action.payload, 'MESSAGE_ID'),
        // searchText: '',
        routeParams: action.routeParams
      };
    }
    case Actions.GET_MAIL_BY_ID: {
      return {
        ...state,
        processing: false,
        entities: _.keyBy(action.payload, 'messageId'),
        searchText: '',
        routeParams: action.routeParams
      };
    }
    case Actions.UPDATE_MAILS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'MESSAGE_ID')
      };
    }
    case Actions.SELECT_ALL_MAILS: {
      const arr = Object.keys(state.entities).map((k) => state.entities[k]);

      const selectedMailIds = arr.map((mail) => mail.MESSAGE_ID);

      return {
        ...state,
        selectedMailIds
      };
    }
    case Actions.DESELECT_ALL_MAILS: {
      return {
        ...state,
        selectedMailIds: []
      };
    }
    case Actions.SELECT_MAILS_BY_PARAMETER: {
      const filter = action.payload;
      const arr = Object.keys(state.entities).map((k) => state.entities[k]);
      const selectedMailIds = arr
        .filter((mail) => mail[filter.parameter] === filter.value)
        .map((mail) => mail.MESSAGE_ID);
      return {
        ...state,
        selectedMailIds
      };
    }
    case Actions.TOGGLE_IN_SELECTED_MAILS: {
      const { mailId } = action;

      let selectedMailIds = [...state.selectedMailIds];

      if (selectedMailIds.find((id) => id === mailId) !== undefined) {
        selectedMailIds = selectedMailIds.filter((id) => id !== mailId);
      } else {
        selectedMailIds = [...selectedMailIds, mailId];
      }

      return {
        ...state,
        selectedMailIds
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
        routeParams: action.routeParams
      };
    }
    default:
      return state;
  }
};

export default mailsReducer;
