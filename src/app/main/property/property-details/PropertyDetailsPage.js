import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import {
  updateInvestorGroupByInvestorId,
  propertyUpdateStart
} from 'app/main/property/store/actions';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { openModal, updateModal } from 'app/store/actions';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { useTheme } from '@material-ui/core/styles';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import { FiEdit } from 'react-icons/fi';
import * as actions from 'app/main/property/store/actions/property-get.actions';
import clsx from 'clsx';
import * as Actions from 'app/main/property/store/actionTypes';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const PropertyDetailsPage = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const flwClasses = useFormStyles();
  const [formPayload, setFormPayload] = useState({});
  const formPayloadRef = useRef({});
  formPayloadRef.current = formPayload;
  const user = useSelector(({ auth }) => auth.user);
  const investorList = useSelector(({ admin }) => admin.investor.investorList);
  const property = useSelector(({ property }) => property.get.property);
  const flowable = useSelector(({ property }) => property.flowable);

  const fileName = 'property_update_form_def';

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'property',
      fileNames: [fileName],
      formAction: Actions.PROPERTY_FLOWABLE_FORMDEF
    });
  }, [dispatch]);

  const fn = {
    fetchPayload: () => ({
      ...property,
      propertyTitles: [
        {
          ...property.propertyTitles[0],
          foreclosureDilRecordedIndicator:
          property?.propertyTitles[0]?.foreclosureDilRecordedIndicator === 2 ? '-':
          (property?.propertyTitles[0]?.foreclosureDilRecordedIndicator === 1
            ? 'Yes'
            : 'No')
        }
      ],
      marketingPlan: {
        ...property.marketingPlan,
        strategyType:
          property?.marketingPlan?.strategyType === null
            ? 'TBD'
            : property?.marketingPlan?.strategyType
      },
      loan: {
        ...property.loan,
        miCoverageExistsIndicator:
          property?.loan?.miCoverageExistsIndicator === '1' ? 'Yes' : 'No'
      },
      propertyValuationsData: actions.getPropertyValuationData(
        property.propertyValuations
      ),
      property:{
        ...property.property,
        verifiedLegalEntityIndicator:
        property?.property.verifiedLegalEntityIndicator ===true ? 'Verified' : 'Non-Verified'
      }
    }),
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Payload.afterChange':
          dispatch(updateModal(api.formValid()));
          if (api.formValid()) {
            setFormPayload(api.payload.get());
          }
          break;
        default:
          break;
      }
      return true;
    },
    handleOpenDialog: () => {
      dispatch(
        openModal({
          children: (
            <>
              {!flowable[fileName]?.processed ? (
                <FuseLoading />
              ) : (
                <div className="p-12 propertyPageContent">
                  <Form
                    className={clsx(flwClasses.form)}
                    config={flowable[fileName]?.formDef}
                    payload={fn.fetchPayload()}
                    onEvent={fn.onEventHandler}
                    debug ={false}
                  />
                </div>
              )}
            </>
          ),
          title: 'Edit Property Details',
          maxwidth: 'lg',
          buttons: (
            <>
              <MonarchButton
                onClick={fn.onFormButtonHandler}
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
    onFormButtonHandler: () => {
      const payload = formPayloadRef.current;
      delete payload['$temp'];
      delete payload['status'];
      delete payload['propertyHeaderAdditionalData'];
      let payloadModified = {
        ...payload,
        propertyValuations: actions.updatePropertyValuationsField(
          payload,
          payload.propertyValuations
        ),
        propertyTitles: [
          {
            ...payload.propertyTitles[0],
            foreclosureDilRecordedIndicator:
              payload.propertyTitles[0].foreclosureDilRecordedIndicator ===
              'Yes'
                ? 1
                : 0
          }
        ],
        propertyAddresses: [
          {
            ...payload.propertyAddresses[0]
          }
        ],
        loan: {
          ...payload.loan,
          miCoverageExistsIndicator:
            payload.loan.miCoverageExistsIndicator === 'Yes' ? 1 : 0
        },
        investorLoanInformations: updateInvestorGroupByInvestorId(
          investorList,
          payload.investorLoanInformations[0]
        ),
        property:{
          ...payload.property,
          verifiedLegalEntityIndicator:
          payload.property.verifiedLegalEntityIndicator === 'Verified' ? true : false
        }
      };
      dispatch(propertyUpdateStart(user.tenantCode, payloadModified));
    }
  };

  return (
    <Tooltip title="Edit Property">
      <IconButton
        color="primary"
        aria-label="maximize"
        component="span"
        onClick={(ev) => fn.handleOpenDialog(ev)}
        size="small"
      >
        <FiEdit className={theme.icons.fontSize} />
      </IconButton>
    </Tooltip>
  );
};

export default withRouter(PropertyDetailsPage);
