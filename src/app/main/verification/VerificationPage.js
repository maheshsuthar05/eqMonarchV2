import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import history from '@history';
import { isPublicPage } from 'app/common/helpers/common-helper';
import * as Actions from './store/actions';
import { _cookies } from 'app/store/actions';

const Verification = (props) => {
  const dispatch = useDispatch();
  const route = useSelector(({ verification }) => verification.route);

  useEffect(() => {
    dispatch(_cookies.fetchCookies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(Actions.verification(props.history.location.pathname));
  }, [dispatch, props.history.location.pathname]);

  if (route.verified && !isPublicPage(props.history.location.pathname)) {
    history.push({
      pathname: route.location.pathName,
      state: { userType: route.location.userType }
    });
  }

  return <></>;
};

export default Verification;
