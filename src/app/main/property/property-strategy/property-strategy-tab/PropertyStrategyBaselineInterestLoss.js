import React, { useEffect, useState } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  getPropertyStrategyBaselineForm,
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
  },
  flw: {
    '& .baseline_interest_loss__content-wrapper': {
      width: '90% !important',
      marginLeft: '8%'
    }
  }
}));

const PropertyStrategyBaselineInterestLoss = () => {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const caseInstanceId = routeParams.caseInstanceId;
  const [formButton, setformButton] = useState(false);

  const gldResponse = useSelector(
    ({ property }) => property.strategy.gldResponse
  );
  const baseLineForm = useSelector(
    ({ property }) => property.strategy.baseLineForm
  );
  const baseLineAction = useSelector(
    ({ property }) => property.strategy.baseLineAction
  );
  const historyValue = useSelector(
    ({ property }) => property.strategy.historyValue
  );
  const contextResources = useSelector(
    (state) => state.common.IAMResource.contextResources
  );
  useEffect(() => {
    if (
      hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Strategy_Summary_Baseline_API_CALL
      )
    ) {
      dispatch(getPropertyStrategyBaselineForm());
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

  const flowableBindingData = useSelector(
    ({ property }) => property.strategy.flowableBindingData
  );

  return (
    <>
      {/* Baseline interest loss */}
      <div className={clsx('flex flex-1 flex-col min-w-0')}>
        <FuseAnimate animation="transition.slideUpIn" delay={600}>
          <Typography className={clsx('p-16 pb-8 text-12', classes.title)}>
            Baseline Debenture Interest Loss
          </Typography>
        </FuseAnimate>
        <div className="flex flex-col sm:flex sm:flex-row">
          <div className={clsx('widget flex w-full sm:w-1/1', classes.boxing)}>
            <PropertyStrategyTaskWidgets taskType="chart">
              <div className={clsx('flex sm:flex-row', classes.button)}>
                {hasAccess(
                  contextResources,
                  'Property_Details_Tab_Strategy_Summary_Baseline_Debenture_Interest_Save'
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
                {!baseLineAction ? (
                  <FuseLoading />
                ) : (
                  <Form
                    config={baseLineForm}
                    className={classes.flw}
                    payload={flowableBindingData}
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

export default PropertyStrategyBaselineInterestLoss;
