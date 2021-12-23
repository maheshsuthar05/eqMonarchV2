import React, { useRef, useEffect } from 'react';
import { withRouter } from 'react-router';
import Navigation from './Navigation';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import { userViewStart } from 'app/main/tenant/store/actions';
import { fetchUserContactStart } from 'app/main/vendor/store/actions';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import MonarchTabs from '@monarch/core/MonarchTab/MonarchTabs';
import { MonarchTabPanel } from '@monarch/core/MonarchTab';
import ProfilePage from './profile/ProfilePage';

const AccountPage = ({ content, route, match }, props) => {
  const pageLayout = useRef(null);
  const dispatch = useDispatch();

  const user = useSelector(({ auth }) => auth.user);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dataPayload = {
    id: user.data.userName
  };

  useEffect(() => {
    dispatch(userViewStart(user.tenantCode, dataPayload, 'internal'));
    dispatch(fetchUserContactStart(user.realm, user.data.userName));
  }, [dispatch, user.tenantCode, dataPayload, user.data.userName, user.realm]);

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Account'}
      leftSidebarContent={<></>}
      ref={pageLayout}
      contentToolbar={
        <>
          <MonarchTabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            children={Navigation.children}
          />
          <div className="show-clear-filter">&nbsp;</div>
        </>
      }
      content={
        <>
          {_.map(Navigation.children, (item, i) => {
            return (
              (item.title === 'Profile' && (
                <MonarchTabPanel value={value} index={i}>
                  <ProfilePage />
                </MonarchTabPanel>
              )) ||
              (item.title === 'Services' && (
                <MonarchTabPanel value={value} index={i}>
                  <div>Services</div>
                </MonarchTabPanel>
              )) ||
              (item.title === 'Payment' && (
                <MonarchTabPanel value={value} index={i}>
                  <div>Payment</div>
                </MonarchTabPanel>
              )) ||
              (item.title === 'Statements' && (
                <MonarchTabPanel value={value} index={i}>
                  <div>Statements</div>
                </MonarchTabPanel>
              )) ||
              (item.title === 'Agreement' && (
                <MonarchTabPanel value={value} index={i}>
                  <div>Agreement</div>
                </MonarchTabPanel>
              ))
            );
          })}
        </>
      }
    />
  );
};

export default withRouter(AccountPage);
