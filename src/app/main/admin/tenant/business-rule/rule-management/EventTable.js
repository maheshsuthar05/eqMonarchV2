import React, { useEffect, useState } from 'react';
import { Form } from '@flowable/forms';
import Container from '@material-ui/core/Container';
import FuseLoading from '@fuse/core/FuseLoading';
import MaterialTable from 'material-table';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/main/admin/store/actions/decision-rule.actions';
import RuleListing from './RuleListing';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTableCell-root': {
      fontSize: '0.875rem',
      fontWeight: '500',
      padding: '0 0 0 5px',
      background: theme.palette.background.iconbg,
      color: theme.palette.primary.contrastDark
    },
    '& .MuiIcon-root': {
      fontSize: '1.4rem',
      color: theme.palette.primary.main
    },
    [theme.breakpoints.up('lg')]: {
      '& .MuiContainer-maxWidthLg': {
        maxWidth: '100%',
        padding: '0 5px 0 10px'
      }
    }
  }
}));

const EventTable = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isMounted = useIsMounted();

  const decisionTables = useSelector(
    (state) => state.admin.rule.decisionTables
  );

  const flowable = useSelector(({ flowable }) => flowable.formDefinition);

  const previouslyInvesGroup = useSelector(
    (state) => state.admin.rule.investorGroup
  );

  const previouslyTaskGroup = useSelector(
    (state) => state.admin.rule.taskGroup
  );

  const investorGroups = useSelector(
    (state) => state.admin.rule.investorGroups
  );

  const user = useSelector(({ auth }) => auth.user);

  const [state] = useState({
    columns: [
      {
        title: 'Decisions',
        field: 'name'
      }
    ]
  });

  let formPlayload = {
    investorGroupKey: previouslyInvesGroup,
    taskGroup: previouslyTaskGroup,
    investorGroupList: investorGroups,
    taskGroupList: [
      {
        text: 'Complete ATS Form',
        value: 'CompleteATSForm'
      }
    ]
  };

  useEffect(() => {
    if (isMounted.current) {
      dispatch(Actions.fetchRuleManagementSearchHeader(user.tenantCode));
      dispatch(Actions.fetchInvestorGroup());
    }
  }, [isMounted, dispatch, user.tenantCode]);

  const loading = useSelector((state) => state.admin.rule.loading);

  const handleChange = (event) => {
    if (
      previouslyInvesGroup !== event.investorGroupKey ||
      previouslyTaskGroup !== event.taskGroup
    )
      dispatch(
        Actions.fetchDecisionTable(
          user.tenantCode,
          event.investorGroupKey,
          event.taskGroup
        )
      );
  };

  const handleOnEvent = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Form.ready':
        let item = api.payload.get('investorGroupKey');
        let list = api.payload.get('investorGroupList');
        if (!item && list && list.length > 0)
          api.payload.set('investorGroupKey', list[0].investorGroupKey);

        let taskG = api.payload.get('taskGroup');
        let taskGroupList = api.payload.get('taskGroupList');
        if (!taskG && taskGroupList && taskGroupList.length > 0)
          api.payload.set('taskGroup', taskGroupList[0].value);
        break;
      default:
        break;
    }
    return true;
  };

  return !flowable['ruleManagementHeader']?.processed ? (
    <FuseLoading />
  ) : (
    <>
      <div className={classes.root}>
        <MaterialTable
          title=""
          isLoading={loading}
          columns={state.columns}
          data={decisionTables}
          detailPanel={(rowData) => {
            return (
              <Container>
                <RuleListing parentData={rowData} />
              </Container>
            );
          }}
          options={{
            search: false,
            paging: false,
            searchFieldVariant: 'outlined'
          }}
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,
            Toolbar: (props) => (
              <div>
                <div className="p-12 rulesManagement">
                  <Form
                    config={flowable['ruleManagementHeader']?.formDef}
                    onChange={handleChange}
                    payload={formPlayload}
                    onEvent={handleOnEvent}
                  />
                </div>
              </div>
            )
          }}
        />
      </div>
    </>
  );
};

export default withRouter(EventTable);
