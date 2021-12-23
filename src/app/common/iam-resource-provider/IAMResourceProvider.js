import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const IAMResourceProvider = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    const path =
      props.history.location.pathname === `/verification/user`
        ? `/home/dashboard`
        : props.history.location.pathname;

    dispatch({
      type: 'CONTEXT_RESOURCE_START',
      resourceGroup: '',
      tenantCode: user.tenantCode,
      realm: user.realm,
      url: path
    });
    return () => {};
  }, [props.history, dispatch, user]);

  return <></>;
};

export default IAMResourceProvider;
