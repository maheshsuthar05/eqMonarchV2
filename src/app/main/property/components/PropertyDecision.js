import useIsMounted from 'app/common/hooks/useIsMounted';
import RulesTable from 'app/main/property/components/RulesTable';
import {
  fetchPropertyDecisionResultsStart,
  fetchPropertyDecisionsStart
} from 'app/main/property/store/actions';
import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { openModal } from 'app/store/actions';
import * as Actions from 'app/main/property/store/actionTypes';
import _ from 'lodash';

const PropertyDecision = (props) => {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const routeParams = useParams();
  const flowable = useSelector(({ property }) => property.flowable);
  const user = useSelector(({ auth }) => auth.user);
  const openInstanceDiagram = useSelector(
    ({ property }) => property.task.openInstanceDiagram
  );
  const closeInstanceDiagram = useSelector(
    ({ property }) => property.task.closeInstanceDiagram
  );
  const decisions = useSelector(({ property }) => property.decision.decisions);

  useEffect(() => {
    if (isMounted.current && routeParams.caseInstanceId) {
      let processInstanceId = null;
      let instanceId = null;
      if (props.taskType === 'open' && openInstanceDiagram) {
        processInstanceId = openInstanceDiagram.processInstanceId;
      } else if (props.taskType === 'close' && closeInstanceDiagram) {
        processInstanceId = closeInstanceDiagram.processInstanceId;
      }
      if (processInstanceId) {
        instanceId = processInstanceId;
      } else {
        instanceId = routeParams.caseInstanceId;
      }
      const includeChildren = processInstanceId === null;
      dispatch(
        fetchPropertyDecisionsStart(
          user.tenantCode,
          instanceId,
          includeChildren
        )
      );
    }
  }, [
    routeParams.caseInstanceId,
    closeInstanceDiagram,
    dispatch,
    isMounted,
    openInstanceDiagram,
    props.taskType,
    user.tenantCode
  ]);

  useEffect(() => {
    dispatch({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'property',
      fileNames: ['Property_Rules_List'],
      formAction: Actions.PROPERTY_FLOWABLE_FORMDEF
    });
  }, [dispatch]);

  const onExpandHandler = (row) => {
    if (row) {
      dispatch(
        fetchPropertyDecisionResultsStart(
          user.tenantCode,
          row.id,
          row.decisionDefinitionId
        )
      );
    }
  };

  const handleOpenDialog = () => {
    dispatch(
      openModal({
        children: <RulesTable />,
        title: 'View Rules'
      })
    );
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        if (api.formValid()) {
          if (_.has(api.payload.get(), 'propertyRules')) {
            onExpandHandler(api.payload.get().propertyRules);
            handleOpenDialog();
          }
        }
        break;
      default:
        break;
    }

    return true;
  };

  return (
    <div>
      {!flowable['Property_Rules_List']?.processed || !decisions ? (
        <FuseLoading />
      ) : (
        <Form
          config={flowable['Property_Rules_List'].formDef}
          payload={{ rulesDataList: decisions.data }}
          onEvent={onEventHandler}
        />
      )}
    </div>
  );
};

export default PropertyDecision;
