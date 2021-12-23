import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import React, { useRef, useEffect } from 'react';
import Navigation from './Navigation';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import MailList from './mails/MailList';
import MailCompose from './MailCompose';
import { useDispatch } from 'react-redux';
import * as Actions from './store/actions';
import useIsMounted from 'app/common/hooks/useIsMounted';
import * as actions from 'app/main/mail-box/store/actionTypes';
import MonarchTabs from '@monarch/core/MonarchTab/MonarchTabs';
import { MonarchTabPanel } from '@monarch/core/MonarchTab/MonarchTabPanel';

const MailApp = (props) => {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const pageLayout = useRef(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    dispatch({ type: actions.RESET_MAIL });
    setValue(newValue);
  };

  useEffect(() => {
    if (isMounted.current) {
      dispatch(Actions.getFolders());
    }
  }, [isMounted, dispatch]);
  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Messages'}
      leftSidebarContent={<></>}
      contentToolbar={
        <>
          <MonarchTabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            children={Navigation.children}
          />
          <MailCompose />
        </>
      }
      content={
        <>
          <MonarchTabPanel value={value} index={0}>
            <MailList mailType="inbox" />
          </MonarchTabPanel>
          <MonarchTabPanel value={value} index={1}>
            <MailList mailType="sent" />
          </MonarchTabPanel>
        </>
      }
      ref={pageLayout}
    />
  );
};

export default withReducer('mailApp', reducer)(MailApp);
