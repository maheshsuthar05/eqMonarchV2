import * as Actions from '../actionTypes';

const initialState = {
  offers: null,
  offerStatus: [],
  filterBy: 'all',
  viewType: 'tileview',
  offerLoaded: false,
  offersWithVersions: null,
  offerWithVersionsLoaded: false,
  offerWorkSheetData: null,
  offerWorkSheetDataLoaded: false,
  offerCount: {
    new: 0,
    accepted: 0,
    held: 0,
    negotiating: 0,
    rejected: 0
  },
  offerMailPayload: {
    loaded: false
  },
  offerMailAdditionalData: {},
  offerSendWorkSheetPopup: {
    show: false,
    offerData: null
  }
};

const offerListReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_PROPERTY_OFFER_LIST: {
      return {
        ...state,
        offers: action.payload,
        offerLoaded: true
      };
    }
    case Actions.GET_PROPERTY_OFFER_LIST_START: {
      return {
        ...state,
        offers: null,
        offerLoaded: false
      };
    }

    case Actions.GET_OFFER_STATUS: {
      return {
        ...state,
        offerStatus: action.payload
      };
    }
    case Actions.FILTER_PROPERTY_OFFER_LIST_SUCCESS: {
      return {
        ...state,
        filterBy: action.filterBy
      };
    }
    case Actions.PROPERTY_OFFER_LIST_VIEW_TYPE_SUCCESS: {
      return {
        ...state,
        viewType: action.viewType
      };
    }
    case Actions.GET_PROPERTY_OFFER_LIST_WITH_VERSION_SUCCESS: {
      return {
        ...state,
        offersWithVersions: action.offersWithVersions,
        offerWithVersionsLoaded: true
      };
    }
    case Actions.GET_PROPERTY_OFFER_LIST_WITH_VERSION_START: {
      return {
        ...state,
        offersWithVersions: null,
        offerWithVersionsLoaded: false
      };
    }
    case Actions.GET_OFFER_WORKSHEET_DATA_START: {
      return {
        ...state,
        offerWorkSheetData: null,
        offerWorkSheetDataLoaded: false
      };
    }
    case Actions.GET_OFFER_WORKSHEET_DATA_SUCCESS: {
      return {
        ...state,
        offerWorkSheetData: action.offerWorkSheetData,
        offerWorkSheetDataLoaded: true
      };
    }
    case Actions.GET_OFFER_WORKSHEET_DATA_FAILURE: {
      return {
        ...state,
        offerWorkSheetData: null,
        offerWorkSheetDataLoaded: false
      };
    }
    case Actions.GET_OFFER_COUNT_SUCCESS: {
      return {
        ...state,
        offerCount: {
          new: action.new,
          accepted: action.accepted,
          held: action.held,
          negotiating: action.negotiating,
          rejected: action.rejected
        }
      };
    }
    case Actions.GET_OFFER_COUNT_START: {
      return {
        ...state,
        offerCount: {
          new: 0,
          accepted: 0,
          held: 0,
          negotiating: 0,
          rejected: 0
        }
      };
    }
    case Actions.GET_OFFER_MAIL_PAYLOAD_RESET: {
      return {
        ...state,
        offerMailPayload: {
          loaded: false
        },
        offerMailAdditionalData: {}
      };
    }
    case Actions.GET_OFFER_MAIL_PAYLOAD_START: {
      return {
        ...state,
        offerMailPayload: {
          loaded: false
        },
        offerMailAdditionalData: {}
      };
    }
    case Actions.GET_OFFER_MAIL_PAYLOAD_SUCCESS: {
      return {
        ...state,
        offerMailPayload: { ...action.payload, loaded: true },
        offerMailAdditionalData: { ...action.additionalData }
      };
    }
    case Actions.SHOW_SEND_WORK_SHEET_POPUP: {
      return {
        ...state,
        offerSendWorkSheetPopup: {
          show: true,
          offerData: action.offerData
        }
      };
    }
    case Actions.HIDE_SEND_WORK_SHEET_POPUP: {
      return {
        ...state,
        offerSendWorkSheetPopup: {
          show: false,
          offerData: null
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default offerListReducer;
