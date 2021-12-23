import React, { useEffect, useRef } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InvestorGroupCRUD from './InvestorGroupCRUD';
import * as Actions from 'app/main/admin/store/actions/investor.actions';
import { InvestorApiConfig } from 'app/config/api';
import { Form } from '@flowable/forms';
import { closeModal, openModal } from 'app/store/actions';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import _ from '@lodash';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';
import { REFRESH } from 'app/main/admin/store/actions';

const InvestorGroupPage = (props) => {
  const pageLayout = useRef(null);
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const user = useSelector(({ auth }) => auth.user);
  const flowable = useSelector(({ admin }) => admin.flowable);
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  const investorForInvestorGroup = useSelector(
    ({ admin }) => admin.investor.investorForInvestorGroup
  );

  const refresh = useSelector(
    ({ admin }) => admin.refresh.INVESTOR_GROUP
  );

  const [refreshForm, setRefreshForm] = React.useState(false);

  useEffect(() => {
    if (refresh) {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
        dispatch({
          type: REFRESH.ACCESS_MANAGMENT.INVESTOR_GROUP,
          refresh: false
        });
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['Manage_Investor_Group_List', 'Investor_Group_Creation'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
  }, [dispatch]);

  const selectedInvestors =
    investorForInvestorGroup && investorForInvestorGroup._embedded
      ? _.cloneDeep(investorForInvestorGroup._embedded.investors)
      : [];

  const fn = {
    fetchPayload: () => ({ refreshForm }),
    onFormSubmitHandler: (modificationMode, data) => {
      if (modificationMode) {
        const updatePayload = [];
        let removedInvestors = _.cloneDeep(selectedInvestors);

        if (
          formPayloadRef.current.investorIds &&
          Array.isArray(formPayloadRef.current.investorIds)
        ) {
          formPayloadRef.current.investorIds.map((item) => {
            updatePayload.push({
              investorId: item,
              investorGroup: formPayloadRef.current.investorGroup
            });
            const foundObject = _.filter(removedInvestors, {
              investorId: item
            });
            if (
              foundObject &&
              Array.isArray(foundObject) &&
              foundObject.length > 0
            ) {
              _.pull(removedInvestors, foundObject[0]);
            }
            return false;
          });
        }

        if (removedInvestors) {
          removedInvestors.map((item) => {
            updatePayload.push({
              investorId: item.investorId,
              investorGroup: null
            });
            return item;
          });
        }

        fn.update(updatePayload);
      } else {
        fn.save(formPayloadRef.current);
      }
      dispatch(closeModal());
    },
    update: (payload) => {
      dispatch(Actions.updateInvestorGroup(payload, REFRESH.ACCESS_MANAGMENT.INVESTOR_GROUP));
    },
    save: (payload) => {
      dispatch(Actions.createInvestorGroup(payload, REFRESH.ACCESS_MANAGMENT.INVESTOR_GROUP));
    },
    handleCreateNewIGClick: (data, modification) => {
      if (data) {
        data.INVESTOR_GROUP = data.investorGroup;
      }
      dispatch(
        openModal({
          children: (
            <InvestorGroupCRUD data={data} modificationMode={modification} />
          ),
          title: modification ? 'Edit Investor Group' : 'New Investor Group',
          buttons: (
            <>
              <MonarchButton
                onClick={() => fn.onFormSubmitHandler(modification, data)}
                color="primary"
                variant="contained"
                size="small"
                disabled
              >
                {'Save'}
              </MonarchButton>
            </>
          )
        })
      );
    },
    getAdditionalData: () => ({
      additionalData: {
        url: InvestorApiConfig.api.searchInvestorGroup,
        tenantCode: user.tenantCode
      }
    }),
    createRuleById: (id) => {
      if (id) {
        dispatch(Actions.createRuleById(id));
      }
    },
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Button.click':
          switch (config.id) {
            case 'action.edit.click':
              fn.handleCreateNewIGClick(config.data, true);
              break;
            case 'action.delete.click':
              fn.deleteInvestorGroupClick(config.data);
              break;
            case 'action.clone.rule.click':
              fn.createRuleById(config.data.investorGroupId);
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Investor Group'}
      contentToolbar={
        <>
          <Tooltip title="Add Investor Group">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => fn.handleCreateNewIGClick({}, false)}
              size="small"
            >
              <IoAddCircleOutline />
            </IconButton>
          </Tooltip>
          <div className="show-clear-filter">&nbsp;</div>
        </>
      }
      content={
        <>
          {!flowable['Manage_Investor_Group_List']?.processed ? (
            <FuseLoading />
          ) : (
            <>
              <Form
                config={flowable['Manage_Investor_Group_List']?.formDef}
                additionalData={fn.getAdditionalData()}
                onEvent={fn.onEventHandler}
                className={clsx(flwClasses.form)}
                payload={fn.fetchPayload()}
              />
            </>
          )}
        </>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
};

export default withRouter(InvestorGroupPage);
