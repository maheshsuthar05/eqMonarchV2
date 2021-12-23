import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { makeStyles } from '@material-ui/core/styles';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { navigationStart } from 'app/common/store/actions';
import { OfferApiConfig } from 'app/config/api';
import { fetchOfferListingFormStart } from 'app/main/offer/store/actions';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded/MonarchPageCarded';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import MonarchTitle from '@monarch/core/MonarchTitle/MonarchTitle';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  content: {
    padding: '12px',
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    padding: 8,
    minHeight: 100,
    minWidth: 100,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 0,
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    border: '1px solid rgba(39, 79, 129, .8)',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(39, 79, 129, 0.07)'
    }
  }
}));

const DEFAULT_SEARCH_CRITERIA = {
  sortFieldName: 'CREATED_DATE',
  sortOrder: 'DESC'
};

const OfferListPage = ({ history }) => {
  const classes = useStyles();
  const pageLayout = useRef(null);
  const currentPortalKey = 'servicer';
  const isMounted = useIsMounted();
  const dispatch = useDispatch();

  const stateAction = useSelector(
    ({ offer }) => offer.offerListing.stateAction
  );
  const formDefinition = useSelector(
    ({ offer }) => offer.offerListing.formDefinition
  );

  const DEFAULT_PORTFOLIO_LIST = [
    {
      text: 'BEAN, ASHLEY ',
      value: 1
    },
    {
      text: 'BEAVEN, KIMBERLY ',
      value: 2
    },
    {
      text: 'BELNAVIS, PAUL',
      value: 3
    }
  ];

  const DEFAULT_STATE = [
    {
      text: 'Alabama',
      value: 1
    },
    {
      text: 'Alaska',
      value: 2
    },
    {
      text: 'California',
      value: 3
    },
    {
      text: 'Texas',
      value: 4
    },
    {
      text: 'Micronesia',
      value: 5
    }
  ];

  const DEFAULT_DIVISION = [
    {
      text: 'CLMS',
      value: 1
    },
    {
      text: 'HBUS',
      value: 2
    },
    {
      text: 'HSS',
      value: 3
    }
  ];

  const user = useSelector(({ auth }) => auth.user);
  const additionalData = {
    additionalData: {
      url: OfferApiConfig.api.offer_listing,
      MODAL_MORE_ID: 'modal_search_more'
    }
  };

  let payload = {
    searchCriteria: DEFAULT_SEARCH_CRITERIA,
    uiVariable: {
      portfolio: DEFAULT_PORTFOLIO_LIST,
      state: DEFAULT_STATE,
      division: DEFAULT_DIVISION,
      filterModalProgress: true
    },
    userId: null,
    userType: null,
    role: null
  };

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('tenantCode', user.tenantCode);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(fetchOfferListingFormStart());
    }
  }, [isMounted, dispatch]);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        // On row select navigate
        if (state && state.selectedProperty) {
          if (currentPortalKey === 'servicer') {
            const url = `/property/details/${state.selectedProperty.CASE_INSTANCE_ID}/offers`;
            dispatch(navigationStart(history, url));
          }
        }
        break;
      case 'Button.click':
        if (config.id === 'button-clear-filter') {
          api.payload.set('searchCriteria', DEFAULT_SEARCH_CRITERIA);
        }
        break;
      case 'Link.click':
        if (config.id === 'button-clear-filter') {
          api.payload.set('searchCriteria', DEFAULT_SEARCH_CRITERIA);
        }
        break;
      default:
        break;
    }

    return true;
  };

  return !stateAction ? (
    <FuseLoading />
  ) : (
    <MonarchPageCarded
      classes={{
        toolbar: 'p-0',
        content: classes.content
      }}
      contentToolbar={<MonarchTitle title="Offer Search" />}
      leftSidebarContent={<></>}
      content={
        <Form
          config={formDefinition}
          payload={payload}
          additionalData={additionalData}
          onEvent={onEventHandler}
        />
      }
      innerScroll
      ref={pageLayout}
    />
  );
};

export default withReducer('offer', reducer)(OfferListPage);
