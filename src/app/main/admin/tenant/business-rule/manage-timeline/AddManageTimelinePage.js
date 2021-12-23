import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@flowable/forms';
import { updateModal } from 'app/store/actions';
import { DecisionRuleApiConfig, ManageProductVendor } from 'app/config/api';
import FuseLoading from '@fuse/core/FuseLoading';
import { useFormStyles } from '@monarch/Flowable/useStyles';

function AddManageTimelinePage(props) {
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ admin }) => admin.flowable);

  const agentType = useSelector(
    ({ common }) => common.predefinedList.agentType
  );

  const additionalData = {
    additionalData: {
      url: DecisionRuleApiConfig.api.getInvestorGroup,
      agentTypeList: agentType,
      vendorURL: ManageProductVendor.api.getVendorList
    }
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
  };

  return !flowable['Add_Manage_Timelines']?.processed ? (
    <FuseLoading />
  ) : (
    <Form
      config={flowable['Add_Manage_Timelines']?.formDef}
      // className={classes.add_timeline}
      className={flwClasses.form}
      payload={props.data}
      additionalData={additionalData}
      onEvent={onEventHandler}
    />
  );
}

export default AddManageTimelinePage;
