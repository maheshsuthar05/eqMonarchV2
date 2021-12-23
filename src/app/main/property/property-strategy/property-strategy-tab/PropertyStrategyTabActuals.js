import React, { useEffect, useState } from 'react';
import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import { useParams } from 'react-router-dom';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { hasAccess } from 'app/common/helpers/common-helper';
import {
  getPropertyStrategyActualsForm,
  getProjectionsListAction,
  addPropertyProjectionsAction,
  getGLDFormData
} from 'app/main/property/store/actions';
import { resourceKeys } from 'app/main/property/resources/ResourceConfig';

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    justifyContent: 'flex-end'
  }
}));

const PropertyStrategyTabSnapshot = () => {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const caseInstanceId = routeParams.caseInstanceId;
  const formDef = useSelector(({ property }) => property.strategy.actualForm);
  const [formButton, setformButton] = useState(false);

  const stateAction = useSelector(
    ({ property }) => property.strategy.actualAction
  );
  const gldResponse = useSelector(
    ({ property }) => property.strategy.gldResponse
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
        resourceKeys.Property_Details_Tab_Strategy_Actual_Tab_API_CALL
      )
    ) {
      dispatch(getProjectionsListAction(caseInstanceId));
      dispatch(getPropertyStrategyActualsForm());
    }
  }, [dispatch, caseInstanceId, contextResources]);

  const onFormButtonHandler = () => {
    dispatch(
      addPropertyProjectionsAction(
        { propertyProjectionsResults: gldResponse },
        caseInstanceId
      )
    );
  };

  const onNavButtonHandler = () => {
    document
      .querySelector(
        `a[href='/property/details/${caseInstanceId}/strategy/conveyance']`
      )
      .click();
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
    <div className={clsx('w-full p-12', classes.root)}>
      <div className={clsx('flex sm:flex-row', classes.button)}>
        {hasAccess(
          contextResources,
          'Property_Details_Tab_Strategy_Summary_Actuals_Save'
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
        <Button
          onClick={onNavButtonHandler}
          color="primary"
          variant="contained"
        >
          {'Next'}
        </Button>
      </div>
      <FuseAnimateGroup
        enter={{
          animation: 'transition.slideUpBigIn'
        }}
      >
        {!stateAction ? (
          <FuseLoading />
        ) : (
          <Form
            config={formDef}
            payload={flowableBindingData}
            onEvent={onEventHandler}
          />
        )}
      </FuseAnimateGroup>
    </div>
  );
};

export default PropertyStrategyTabSnapshot;
