import React, { useEffect, useRef } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InvestorGroup from './InvestorGroup';
import * as Actions from 'app/main/admin/store/actions/investor.actions';
import { InvestorApiConfig } from 'app/config/api';
import { Form } from '@flowable/forms';
import { closeModal, openModal } from 'app/store/actions';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { IconButton, Tooltip } from '@material-ui/core';
import { IoAddCircleOutline } from 'react-icons/io5';
import clsx from 'clsx';
import _ from '@lodash';
import { useFormStyles } from '@monarch/Flowable/useStyles';
import { REFRESH } from 'app/main/admin/store/actions';

const InvestorPage = (props) => {
  const pageLayout = useRef(null);
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const user = useSelector(({ auth }) => auth.user);
  const formData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  const flowable = useSelector(({ admin }) => admin.flowable);
  const refresh = useSelector(({ admin }) => admin.refresh.INVESTOR);

  const [refreshForm, setRefreshForm] = React.useState(false);

  useEffect(() => {
    if (refresh) {
      setRefreshForm(true);
      setTimeout(() => {
        setRefreshForm(false);
        dispatch({ type: REFRESH.ACCESS_MANAGMENT.INVESTOR, refresh: false });
      }, 2000);
    }
  }, [dispatch, refreshForm, refresh]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['Manage_Investor', 'Add_Investor_to_Group'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
  }, [dispatch]);

  const fn = {
    fetchPayload: () => ({ refreshForm }),
    getAdditionaldata: () => ({
      additionalData: {
        url: InvestorApiConfig.api.searchInvestor,
        tenantCode: user.tenantCode
      }
    }),
    saveInvestorToGroup: (mode) => {
      let generatedPayload = {
        party: {
          operation: mode ? 'UPDATE' : 'INSERT',
          legalEntityFullName: formPayloadRef.current.INVESTOR_NAME,
          roles: [
            {
              partyRoleType: 'INVESTOR',
              partyRoleTypeAdditionalDescription: 'INVESTOR',
              investors: [
                {
                  investorCode: formPayloadRef.current.INVESTOR_CODE,
                  investorName: formPayloadRef.current.INVESTOR_NAME,
                  investorGroup: formPayloadRef.current.INVESTOR_GROUP
                }
              ]
            }
          ]
        }
      };
      dispatch(
        Actions.saveInvestorToGroup(
          generatedPayload,
          REFRESH.ACCESS_MANAGMENT.INVESTOR
        )
      );
      dispatch(closeModal());
    },
    handleCreateNewInvestorClick: (data, mode) => {
      dispatch(
        openModal({
          children: <InvestorGroup data={data} modificationMode={mode} />,
          title: `${mode ? `Edit` : `New`} Investor`,
          buttons: (
            <>
              <MonarchButton
                onClick={() => fn.saveInvestorToGroup(mode)}
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
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Payload.afterChange':
          if (_.has(api.payload.get(), 'manageInvestorListing')) {
            if (api.payload.get().manageInvestorListing.key === 'Edit') {
              fn.handleCreateNewInvestorClick(
                api.payload.get().manageInvestorListing.DATA,
                true
              );
            }
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
      contentTitle={'Investor'}
      contentToolbar={
        <>
          <Tooltip title="Add Investor">
            <IconButton
              color="primary"
              aria-label="maximize"
              component="span"
              onClick={() => fn.handleCreateNewInvestorClick({}, false)}
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
          {!flowable['Manage_Investor']?.processed ? (
            <FuseLoading />
          ) : (
            <>
              <Form
                config={flowable['Manage_Investor']?.formDef}
                additionalData={fn.getAdditionaldata()}
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

export default withRouter(InvestorPage);
