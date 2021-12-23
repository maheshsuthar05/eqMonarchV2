import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/main/admin/store/actions/tenant-admin.actions';
import useIsMounted from 'app/common/hooks/useIsMounted';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import _ from 'lodash';
import AddWorkstationConfig from './AddWorkstationConfig';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    textTransform: 'none'
  },
  content: {
    padding: '2px 15px 2px 2px',
    backgroundColor: theme.palette.background.paper
  },
  labelText: {
    color: theme.palette.primary.labelTextColor
  },
  selectItem: {
    position: 'absolute',
    top: '50%',
    left: '0',
    transform: 'translate(0%, -50%)',
    color: theme.palette.primary.contrastDark
  }
}));

function WorkstationConfigurationPage(props) {
  const pageLayout = useRef(null);
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const classes = useStyles();
  const FLOWABLE_CASE_KEY = 'adminManageCompleteATSFormSettings';
  const FLOWABLE_PROCESS_KEY =
    'adminManageCompleteATSFormSettingsEventProducer';
  const [dataPayload, setDataPayload] = useState({});
  const user = useSelector(({ auth }) => auth.user);

  const caseDef = useSelector(({ admin }) => admin.tenant_forms);
  const caseDatas = useSelector(({ admin }) => admin.tenant_forms.caseDatas);
  const tableRefresh = useSelector(({ admin }) => admin.propertyAdmin);

  useEffect(() => {
    dispatch(Actions.getCaseData(user.tanentCode, FLOWABLE_CASE_KEY));
  }, [dispatch, user.tanentCode, tableRefresh, FLOWABLE_CASE_KEY]);

  useEffect(() => {
    if (
      !_.isNull(caseDatas) &&
      caseDatas.hasOwnProperty(FLOWABLE_CASE_KEY) &&
      caseDatas[FLOWABLE_CASE_KEY]?.caseData?.data.length > 0
    ) {
      setDataPayload(
        Actions.payloadToEditScreen(
          caseDatas[FLOWABLE_CASE_KEY]?.caseData?.data[0]
        )
      );
    }
  }, [caseDatas, FLOWABLE_CASE_KEY, user.tanentCode]);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(Actions.getCaseId(FLOWABLE_CASE_KEY));
      dispatch(Actions.getProcessId(FLOWABLE_PROCESS_KEY));
    }
  }, [dispatch, isMounted]);

  const caseId = caseDef[FLOWABLE_CASE_KEY]?.caseId;

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Workstation Configurations'}
      contentToolbar={
        <>
          <AddWorkstationConfig
            caseId={caseId}
            caseData={dataPayload}
            FLOWABLE_CASE_KEY={FLOWABLE_CASE_KEY}
          />
        </>
      }
      content={
        <>
          {!_.isNull(caseDatas) && caseDatas[FLOWABLE_CASE_KEY]?.caseAction ? (
            <div className="flex mt-4 ml-8">
              <div className="p-4">
                <div class="flex w-full">
                  <h5 className="font-semibold pb-8">
                    Manage Complete ATS Form Settings
                  </h5>
                </div>
                <div class="flex w-full">
                  <div>
                    <li className="flex flex-col mb-8">
                      <span className={classes.labelText}>
                        Preliminary HUD Field Status
                      </span>
                      <span className="deatils-Value">
                        {dataPayload.preliminaryHUDFieldStatus}
                      </span>
                    </li>
                    <li className="flex flex-col mb-8">
                      <span className={classes.labelText}>Investor Group</span>
                      <span className="deatils-Value">
                        {dataPayload?.investorGroupATS?.toString()}
                      </span>
                    </li>
                    <li className="flex flex-col mb-8">
                      <span className={classes.labelText}>
                        Last Modified By
                      </span>
                      <span className="deatils-Value">
                        {dataPayload.userEmail}
                      </span>
                    </li>
                    <li className="flex flex-col mb-8">
                      <span className={classes.labelText}>
                        Last Modified Date
                      </span>
                      <span className="deatils-Value">
                        {dataPayload.lastUpdatedOn}
                      </span>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={clsx('flex w-full flex-wrap', classes.selectItem)}>
              <div className="flex w-full justify-center">No data</div>
            </div>
          )}
        </>
      }
      leftSidebarContent={<></>}
      ref={pageLayout}
    />
  );
}

export default WorkstationConfigurationPage;
