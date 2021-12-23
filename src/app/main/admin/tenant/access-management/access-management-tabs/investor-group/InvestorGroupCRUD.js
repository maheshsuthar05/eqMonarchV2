import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@flowable/forms';
import { party } from 'app/config/api';
import * as Actions from 'app/main/admin/store/actions/investor.actions';
import _ from '@lodash';
import FuseLoading from '@fuse/core/FuseLoading';
import { updateModal } from 'app/store/actions';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';

export default function InvestorGroupCRUD(props) {
  const { modificationMode, data } = props;

  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ admin }) => admin.flowable);

  const investorForInvestorGroup = useSelector(
    (state) => state.admin.investor.investorForInvestorGroup
  );

  const unassignedInvestors = useSelector(
    (state) => state.admin.investor.unassignedInvestors
  );

  const availableInvestors =
    unassignedInvestors && unassignedInvestors._embedded
      ? _.cloneDeep(unassignedInvestors._embedded.investors)
      : [];

  const selectedInvestors =
    investorForInvestorGroup && investorForInvestorGroup._embedded
      ? _.cloneDeep(investorForInvestorGroup._embedded.investors)
      : [];
  const defaultSelections = [];

  if (
    modificationMode &&
    selectedInvestors &&
    Array.isArray(selectedInvestors)
  ) {
    selectedInvestors.map((item) => {
      availableInvestors.push(item);
      defaultSelections.push(item.investorId);
      return item;
    });
  }

  useEffect(() => {
    dispatch(Actions.getUnassignedInvestor());
    if (data && data.INVESTOR_GROUP) {
      dispatch(Actions.findInvestorByInvestorGroup(data.INVESTOR_GROUP));
    }
  }, [dispatch, data]);

  let payload = {
    investorGroup: data.INVESTOR_GROUP
  };

  const user = useSelector(({ auth }) => auth.user);

  const additionalData = {
    additionalData: {
      url: party.api.investor.unassignedInvestor,
      tenantCode: user.tenantCode
    },
    availableInvestors: availableInvestors,
    modificationMode: modificationMode,
    defaultSelections: defaultSelections
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        if (api.formValid()) {
          dispatch(updateModal(api.formValid()));
          const payload = api.payload.get();
          dispatch({
            type: 'GET_FLOWABLE_FORM_DATA_START',
            payload: payload
          });
        }
        break;
      default:
        break;
    }

    return true;
  };

  return !flowable['Investor_Group_Creation']?.processed ? (
    <FuseLoading />
  ) : (
    <Form
      config={flowable['Investor_Group_Creation']?.formDef}
      payload={payload}
      additionalData={additionalData}
      onEvent={onEventHandler}
      className={clsx(flwClasses.form)}
    />
  );
}
