import React, { useEffect, useState } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  getPropertyStrategySavingForm,
  getPropertyStrategyClaimForm,
  getGLDFormData,
  addPropertyProjectionsAction
} from 'app/main/property/store/actions';
import PropertyStrategyTaskWidgets from 'app/common/components/widgets/PropertyStartegyTaskWidgets';
import { hasAccess } from 'app/common/helpers/common-helper';
import { resourceKeys } from 'app/main/property/resources/ResourceConfig';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'green',
    fontSize: '40px'
  },
  title: {
    color: theme.palette.secondary.dark,
    fontWeight: 'bold !Important'
  },
  boxing: {
    padding: theme.spacing(1)
  },
  button: {
    justifyContent: 'flex-end'
  }
}));

const PropertyStrategySavingsAndClaims = ({ gldValue, sortVal }) => {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const caseInstanceId = routeParams.caseInstanceId;
  const [formButton, setformButton] = useState(false);

  const gldResponse = useSelector(
    ({ property }) => property.strategy.gldResponse
  );

  const savingForm = useSelector(
    ({ property }) => property.strategy.savingForm
  );

  const stateAction = useSelector(
    ({ property }) => property.strategy.savingAction
  );

  const historyValue = useSelector(
    ({ property }) => property.strategy.historyValue
  );

  const claimForm = useSelector(({ property }) => property.strategy.claimForm);

  const claimAction = useSelector(
    ({ property }) => property.strategy.claimAction
  );

  const property = useSelector((state) => state.property.get.property);

  const contextResources = useSelector(
    (state) => state.common.IAMResource.contextResources
  );

  useEffect(() => {
    if (
      hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Strategy_Summary_Saving_Claims_API_CALL
      )
    ) {
      dispatch(getPropertyStrategySavingForm());
      dispatch(getPropertyStrategyClaimForm());
    }
  }, [dispatch, contextResources]);

  const onFormButtonHandler = () => {
    dispatch(
      addPropertyProjectionsAction(
        { propertyProjectionsResults: gldResponse },
        caseInstanceId
      )
    );
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange' || 'Payload.beforeChange':
        setformButton(api.formValid());
        if (api.formValid()) {
          setformButton(api.formValid());
          dispatch(
            getGLDFormData(api.payload.get().propertyProjectionsResults)
          );
        }

        break;
      default:
        break;
    }
    return true;
  };
  let gldEmptyData = [
    { title: 'CWCOT', price: 0 },
    { title: 'Conveyance', price: 0 },
    { title: 'REOAsIs', price: 0 },
    { title: 'REORepair', price: 0 }
  ];
  let emptyCheck = gldEmptyData.map(
    (obj, inx) => gldValue.find((res, inx) => res.title === obj.title) || obj
  );
  let gldSavingValue = emptyCheck.map((res, inx) => {
    if (res.price === 0) {
      return {
        ...res,
        propertyProjectionsResults: {
          savings_first_recommend: 0,
          savings_gain: 0,
          gain_amount: null
        }
      };
    }
    return {
      ...res,
      propertyProjectionsResults: {
        savings_first_recommend: gldValue[0].price,
        savings_gain: res.price,
        gain_amount: gldValue[0].price - res.price
      }
    };
  });

  const flowableBindingData = useSelector(
    ({ property }) => property.strategy.flowableBindingData
  );
  const upbAsIs =
    flowableBindingData.propertyProjectionsResults.reo_as_is_net_loss_upb;
  const upbRepair =
    flowableBindingData.propertyProjectionsResults.reo_repair_net_loss_upb;
  const escrowAsIs =
    flowableBindingData.propertyProjectionsResults.reo_as_is_net_loss_escrow;
  const escrowRepair =
    flowableBindingData.propertyProjectionsResults.reo_repair_net_loss_escrow;
  const cafmv =
    property?.foreclosure.foreclosureSaleMarketValueAmount === null
      ? 0
      : property?.foreclosure.foreclosureSaleMarketValueAmount;
  const flowableBindingDataModified = {
    propertyProjectionsResults: {
      ...flowableBindingData.propertyProjectionsResults,
      claims_cwcot_upb: upbAsIs,
      claims_conveyance_upb: upbAsIs,
      claims_reo_as_is_upb: upbAsIs,
      claims_reo_repair_upb: upbRepair,
      claims_cwcot_escrow: escrowAsIs,
      claims_conveyance_escrow: escrowAsIs,
      claims_reo_as_is_escrow: escrowAsIs,
      claims_reo_repair_escrow: escrowRepair,
      claims_reo_as_is_cafmv: cafmv,
      claims_reo_repair_cafmv: cafmv
    }
  };
  return (
    <>
      {/* Savings */}
      <div className={clsx('flex flex-1 flex-col min-w-0')}>
        <FuseAnimate animation="transition.slideUpIn" delay={600}>
          <Typography className={clsx('p-16 pb-8 text-12', classes.title)}>
            Savings
          </Typography>
        </FuseAnimate>
        <div className="flex flex-col sm:flex sm:flex-row">
          {sortVal.length === 'null' ? (
            <div
              className={clsx('widget flex w-full sm:w-1/4', classes.boxing)}
            >
              <PropertyStrategyTaskWidgets taskType="chart">
                <FuseAnimate delay={100}>
                  <div className="flex flex-1 items-center justify-center h-256">
                    <Typography color="textSecondary" variant="h5">
                      {'NO_SAVINGS'}
                    </Typography>
                  </div>
                </FuseAnimate>
              </PropertyStrategyTaskWidgets>
            </div>
          ) : (
            <>
              {gldSavingValue.map((res, inx) => {
                return (
                  <div
                    className={clsx(
                      'widget flex w-full sm:w-1/4',
                      classes.boxing
                    )}
                    key={inx}
                  >
                    <PropertyStrategyTaskWidgets
                      key={inx}
                      widget={res}
                      taskType="chart"
                    >
                      <div className="m-12">
                        {res.propertyProjectionsResults.gain_amount === 0 ? (
                          <div className="text-center mt-60">
                            1st Recommend <DoneIcon className={classes.icon} />
                          </div>
                        ) : (
                          <>
                            {!stateAction ? (
                              <FuseLoading />
                            ) : (
                              <Form
                                config={savingForm}
                                payload={{
                                  propertyProjectionsResults:
                                    res.propertyProjectionsResults
                                }}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </PropertyStrategyTaskWidgets>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Claims */}
      <div className={clsx('flex flex-1 flex-col min-w-0')}>
        <FuseAnimate animation="transition.slideUpIn" delay={600}>
          <Typography className={clsx('p-16 pb-8 text-12', classes.title)}>
            Claims
          </Typography>
        </FuseAnimate>
        <div className="flex flex-col sm:flex sm:flex-row">
          <div className={clsx('widget flex w-full sm:w-1/1', classes.boxing)}>
            <PropertyStrategyTaskWidgets taskType="chart">
              <div className={clsx('flex sm:flex-row', classes.button)}>
                {hasAccess(
                  contextResources,
                  'Property_Details_Tab_Strategy_Summary_Claims_Save'
                ) && (
                  <Button
                    className="mr-12"
                    onClick={onFormButtonHandler}
                    color="primary"
                    variant="contained"
                    disabled={
                      Object.keys(historyValue).length === 0
                        ? !formButton
                        : historyValue.updateAction === 'old'
                        ? true
                        : false
                    }
                  >
                    {'Save'}
                  </Button>
                )}
              </div>
              <div className="m-12">
                {!claimAction ? (
                  <FuseLoading />
                ) : (
                  <Form
                    config={claimForm}
                    payload={flowableBindingDataModified}
                    onEvent={onEventHandler}
                  />
                )}
              </div>
            </PropertyStrategyTaskWidgets>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyStrategySavingsAndClaims;
