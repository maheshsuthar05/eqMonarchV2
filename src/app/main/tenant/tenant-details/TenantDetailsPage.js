import { Form } from '@flowable/forms';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tenantEditStart, tenantGetStart } from 'app/main/tenant/store/actions';
import FuseLoading from '@fuse/core/FuseLoading';
import { withRouter } from 'react-router';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import _ from '@lodash';
import { openModal, updateModal } from 'app/store/actions';
import clsx from 'clsx';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import { FiEdit } from 'react-icons/fi';
import { useTheme } from '@material-ui/core/styles';
import * as Actions from 'app/main/tenant/store/actionTypes';
import { useFormStyles } from '@monarch/Flowable/useStyles';

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
  }
}));

const TenantDetails = (props) => {
  const classes = useStyles();
  const flwClasses = useFormStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [formData, setFormData] = useState(null);
  const user = useSelector(({ auth }) => auth.user);
  const flowable = useSelector(({ tenant }) => tenant.flowable);
  const updateStateAction = useSelector(({ tenant }) => tenant.tenantAdd);
  const fetchedTenant = useSelector(({ tenant }) => tenant.list.tenant);
  const [tenantDetails, setTenantDetails] = React.useState({});
  const updatedTenant = useSelector(
    ({ tenant }) => tenant.tenantGet.tenantDetails
  );

  const formPayloadRef = useRef({});
  formPayloadRef.current = formData;

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-IAM',
      fileNames: ['tenant_details_update'],
      formAction: Actions.TENANT_FORMDEFIINITION
    });
  }, [dispatch]);

  useEffect(() => {
    if (updateStateAction.stateAction) {
      dispatch(tenantGetStart());
    }
  }, [dispatch, updateStateAction]);

  useEffect(() => {
    const details =
      _.has(fetchedTenant, 'tenant') && _.has(fetchedTenant.tenant, 'tenants')
        ? _.find(fetchedTenant.tenant.tenants, { tenantCode: user.tenantCode })
        : {};
    setTenantDetails(details);
  }, [fetchedTenant, user]);

  useEffect(() => {
    if (updateStateAction.stateAction) {
      const details =
        _.has(updatedTenant, 'tenant') && _.has(updatedTenant.tenant, 'tenants')
          ? _.find(updatedTenant.tenant.tenants, {
              tenantCode: user.tenantCode
            })
          : {};
      setTenantDetails(details);
    }
  }, [updatedTenant, user, updateStateAction]);

  const fn = {
    fetchPayload: () => ({ ...tenantDetails }),
    onFormButtonHandler: () => {
      dispatch(tenantEditStart(user.tenantCode, formPayloadRef.current));
    },
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Form.ready':
          if (api.formValid()) {
            setFormData(api.payload.get());
            dispatch(updateModal(api.formValid(), api.payload.get(), true));
          }
          break;
        case 'Payload.afterChange' || 'Payload.beforeChange':
          if (api.formValid()) {
            setFormData(api.payload.get());
            dispatch(updateModal(api.formValid(), api.payload.get(), true));
          }
          break;
        default:
          break;
      }
      return true;
    },
    handleEditTenantDetailsModal: (isEdit, payload) => {
      dispatch(
        openModal({
          children: (
            <>
              {!flowable['tenant_details_update']?.processed ? (
                <FuseLoading />
              ) : (
                <Form
                  className={clsx(flwClasses.form)}
                  config={flowable['tenant_details_update']?.formDef}
                  payload={fn.fetchPayload()}
                  onEvent={fn.onEventHandler}
                  debug={false}
                />
              )}
            </>
          ),
          title: 'Edit Tenant Details',
          buttons: (
            <>
              <MonarchButton
                onClick={fn.onFormButtonHandler}
                color="primary"
                variant="contained"
                size="small"
                disabled
              >
                Save
              </MonarchButton>
            </>
          )
        })
      );
    }
  };

  return (
    <>
      <MonarchPageCarded
        {...props}
        contentTitle={'Details'}
        contentToolbar={
          <>
            <Tooltip title="Edit Details">
              <IconButton
                color="primary"
                aria-label="maximize"
                component="span"
                size="small"
                onClick={() => fn.handleEditTenantDetailsModal()}
              >
                <FiEdit className={theme.icons.fontSize} />
              </IconButton>
            </Tooltip>
          </>
        }
        content={
          <>
            {_.isEmpty(tenantDetails) ? (
              <FuseLoading />
            ) : (
              <div className="flex mt-4 ml-8">
                <div className="w-2/4 p-4 border-r-1">
                  <div className="flex w-full">
                    <h5 className="font-semibold pb-8">Tenant</h5>
                  </div>
                  <div className="flex w-full">
                    <div className="w-3/6">
                      <li className="flex flex-col mb-8">
                        <span className={classes.labelText}>Tenant Code</span>
                        <span className="deatils-Value">
                          {tenantDetails.tenantCode}
                        </span>
                      </li>
                      <li className="flex flex-col mb-8">
                        <span className={classes.labelText}>Tenant Name</span>
                        <span className="deatils-Value">
                          {tenantDetails.tenantName}
                        </span>
                      </li>
                      <li className="flex flex-col mb-8">
                        <span className={classes.labelText}>Website URL</span>
                        <span className="deatils-Value">
                          {tenantDetails.websiteUrl}
                        </span>
                      </li>
                    </div>
                    <div className="w-3/6">
                      <li className="flex flex-col mb-8">
                        <span className={classes.labelText}>Description</span>
                        <span className="deatils-Value">
                          {tenantDetails.description}
                        </span>
                      </li>
                      <li className="flex flex-col mb-8">
                        <span className={classes.labelText}>Phone Number</span>
                        <span className="deatils-Value">
                          {
                            tenantDetails.tenantTelephones[0]
                              .tenantTelephoneValue
                          }
                        </span>
                      </li>
                      <li className="flex flex-col mb-8">
                        <span className={classes.labelText}>E Mail</span>
                        <span className="deatils-Value">
                          {tenantDetails.tenantEmails[0].tenantEmailValue}
                        </span>
                      </li>
                    </div>
                  </div>
                </div>
                <div className="w-2/4 p-4 pl-8">
                  <div className="flex w-full">
                    <h5 className="font-semibold pb-8">Address</h5>
                  </div>
                  <div className="flex w-full">
                    <div className="w-9/12">
                      <li className="flex flex-col mb-8">
                        <span className={classes.labelText}>Address 1</span>
                        <span className="deatils-Value">
                          {tenantDetails.tenantAddresses[0].addressLineText}
                        </span>
                      </li>
                      <li className="flex flex-col mb-8">
                        <span className={classes.labelText}>Address 2</span>
                        <span className="deatils-Value">
                          {
                            tenantDetails.tenantAddresses[0]
                              .addressAdditionalLineText
                          }
                        </span>
                      </li>
                      <li className="flex flex-col mb-8">
                        <span className={classes.labelText}>City</span>
                        <span className="deatils-Value">
                          {tenantDetails.tenantAddresses[0].cityName}
                        </span>
                      </li>
                    </div>
                    <div className="w-3/6">
                      <li className="flex flex-col mb-8">
                        <span className={classes.labelText}>State</span>
                        <span className="deatils-Value">
                          {tenantDetails.tenantAddresses[0].stateName}
                        </span>
                      </li>
                      <li className="flex flex-col mb-8">
                        <span className={classes.labelText}>Zip Code</span>
                        <span className="deatils-Value">
                          {tenantDetails.tenantAddresses[0].postalCode}
                        </span>
                      </li>
                      <li className="flex flex-col mb-8">
                        <span className={classes.labelText}>Country</span>
                        <span className="deatils-Value">
                          {tenantDetails.tenantAddresses[0].countryName}
                        </span>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        }
        leftSidebarContent={<></>}
      />
    </>
  );
};

export default withRouter(TenantDetails);
