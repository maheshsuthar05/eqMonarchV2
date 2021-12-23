import { makeStyles } from '@material-ui/core/styles';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { TaskApiConfig } from 'app/config/api';
import { fetchPropertyTaskListingFormStart } from 'app/main/property/store/actions';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  content: {
    backgroundColor: theme.palette.background.paper
  }
}));

const TenantTaskListPage = (props) => {
  const classes = useStyles();
  const isMounted = useIsMounted();
  const dispatch = useDispatch();

  let taskType = 'open';
  let newProps = { ...props };
  newProps.type = 'tenant';

  useEffect(() => {
    if (isMounted.current) {
      dispatch(fetchPropertyTaskListingFormStart(taskType));
    }
  }, [dispatch, isMounted, taskType]);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('authorization', TaskApiConfig.headers.authorization);

  return (
    <MonarchPageSimple
      classes={{
        content: classes.content
      }}
      innerScroll
      content={<></>}
    />
  );
};

export default TenantTaskListPage;
