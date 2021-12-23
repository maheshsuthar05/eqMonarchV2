import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import * as FlowableActions from 'app/config/flowable-core/store/actions/flowable-core.actions';
import {
  getPauseUnPasueUIConfiguration as getUIConfig,
  getAdditionalData
} from 'app/main/task-management/store/actions';
import * as Actions from '../store/actionTypes';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';

const PauseTask = (props) => {
  const dispatch = useDispatch();
  const taskVariables = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.details.variables
  );
  const propertyId = useSelector(
    ({ property }) => property.get.property?.property?.propertyId
  );
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formButton, setformButton] = useState(false);
  const [config, setConfig] = useState({});
  const [formPayload, setFormPayload] = useState({});
  const formPayloadRef = useRef({});
  formPayloadRef.current = formPayload;
  const flowable = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp.flowable
  );
  const [additionalData, setAdditionalData] = useState({});
  useEffect(() => {
    if (taskVariables && !isLoaded) {
      const taskDefinitionKey = props.taskDetails.taskDefinitionKey;
      const isPauseStatus = taskVariables.hasOwnProperty(
        `isPauseStatus${taskDefinitionKey}`
      )
        ? taskVariables[`isPauseStatus${taskDefinitionKey}`]
        : false;
      if (!isPauseStatus && props.taskDetails) {
        dispatch(
          FlowableActions.flowableCorePauseUnPauseInitialCall(props.taskDetails)
        );
      }
      const uiConfig = getUIConfig(isPauseStatus, props.taskDetails);
      setConfig(uiConfig);
      setIsPaused(isPauseStatus);
      const data = getAdditionalData(taskVariables, isPauseStatus);
      setAdditionalData(data);
      dispatch({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'tasks/pause-task',
        fileNames: [uiConfig.fileName],
        formAction: Actions.TASKMANAGMENT_FORMDEFIINITION
      });
      setIsLoaded(true);
    }
  }, [dispatch, config.fileName, taskVariables, props.taskDetails, isLoaded]);

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        setformButton(api.formValid());
        if (api.formValid()) {
          setFormPayload(api.payload.get());
        }
        break;
      default:
        break;
    }
  };

  const onSaveClick = () => {
    const argumentsData = {
      payload: formPayloadRef.current,
      frmDef: flowable[config.fileName]?.formDef,
      taskDetails: props.taskDetails,
      taskVariables: taskVariables,
      isPaused: isPaused,
      propertyId
    };

    isPaused
      ? dispatch(FlowableActions.flowableCoreUnPauseTask(argumentsData))
      : dispatch(FlowableActions.flowableCorePauseTask(argumentsData));
  };

  return (
    <>
      {!flowable[config.fileName]?.processed ? (
        <FuseLoading />
      ) : (
        <div className="w-2/4 justify-center m-auto">
          <Form
            config={flowable[config.fileName]?.formDef}
            onEvent={onEventHandler}
            additionalData={additionalData}
          />
          <div className="flex justify-center">
            <MonarchButton
              autoFocus
              onClick={onSaveClick}
              color="primary"
              variant="contained"
              disabled={!formButton}
              className="mr-12"
            >
              {config.buttonLabel}
            </MonarchButton>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(PauseTask);
