import * as actions from 'app/main/property/store/actionTypes';
import { API_CALL_ERROR } from 'app/store/actions/actionTypes';

export const fetchPropertyNavigationStart = (
  tenantCode,
  taskInstanceId,
  taskType,
  url,
  history,
  to,
  caseInstanceId
) => ({
  type: actions.PROPERTY_NAVIGATION_START,
  tenantCode: tenantCode,
  taskInstanceId: taskInstanceId,
  taskType: taskType,
  url: url,
  history: history,
  to: to,
  caseInstanceId
});

export const fetchPropertyNavigationSuccess = (response) => ({
  type: actions.PROPERTY_NAVIGATION_SUCCESS,
  response: response
});

export const fetchPropertyNavigationFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_NAVIGATION_FAILURE,
  error: error
});

export const fetchPropertyTaskDetailsStart = (
  tenantCode,
  taskInstanceId,
  taskType,
  caseInstanceId
) => ({
  type: actions.PROPERTY_TASK_DETAILS_FETCH_START,
  tenantCode,
  taskInstanceId,
  taskType,
  caseInstanceId
});

export const fetchPropertyTaskDetailsSuccess = (response) => ({
  type: actions.PROPERTY_TASK_DETAILS_FETCH_SUCCESS,
  response: response
});

export const fetchPropertyTaskDetailsFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_TASK_DETAILS_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyInstanceDetailsStart = (
  tenantCode,
  taskInstanceId
) => ({
  type: actions.PROPERTY_INSTANCE_DETAILS_FETCH_START,
  tenantCode: tenantCode,
  taskInstanceId: taskInstanceId
});

export const fetchPropertyInstanceDetailsSuccess = (response) => ({
  type: actions.PROPERTY_INSTANCE_DETAILS_FETCH_SUCCESS,
  response: response
});

export const fetchPropertyInstanceDetailsFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_INSTANCE_DETAILS_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyInstanceDiagramStart = (
  tenantCode,
  taskInstanceId
) => ({
  type: actions.PROPERTY_INSTANCE_DIAGRAM_FETCH_START,
  tenantCode: tenantCode,
  taskInstanceId: taskInstanceId
});

export const fetchPropertyInstanceDiagramSuccess = (instanceDiagram) => ({
  type: actions.PROPERTY_INSTANCE_DIAGRAM_FETCH_SUCCESS,
  instanceDiagram: instanceDiagram
});

export const fetchPropertyInstanceDiagramFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_INSTANCE_DIAGRAM_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyInstanceDiagramUrlStart = (
  tenantCode,
  processInstanceId
) => ({
  type: actions.PROPERTY_INSTANCE_DIAGRAM_URL_FETCH_START,
  tenantCode: tenantCode,
  processInstanceId: processInstanceId
});

export const fetchPropertyInstanceDiagramUrlSuccess = (instanceDiagramUrl) => ({
  type: actions.PROPERTY_INSTANCE_DIAGRAM_URL_FETCH_SUCCESS,
  instanceDiagramUrl: instanceDiagramUrl
});

export const fetchPropertyInstanceDiagramUrlFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_INSTANCE_DIAGRAM_URL_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyParentInstanceDiagramUrlStart = (
  tenantCode,
  instanceId
) => ({
  type: actions.PROPERTY_PARENT_INSTANCE_DIAGRAM_URL_FETCH_START,
  tenantCode: tenantCode,
  instanceId: instanceId
});

export const fetchPropertyParentInstanceDiagramUrlSuccess = (
  parentDiagramUrl
) => ({
  type: actions.PROPERTY_PARENT_INSTANCE_DIAGRAM_URL_FETCH_SUCCESS,
  parentDiagramUrl: parentDiagramUrl
});

export const fetchPropertyParentInstanceDiagramUrlFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_PARENT_INSTANCE_DIAGRAM_URL_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyTaskOpenFormStart = (tenantCode, taskInstanceId) => ({
  type: actions.PROPERTY_TASK_OPEN_FORM_FETCH_START,
  tenantCode: tenantCode,
  taskInstanceId: taskInstanceId
});

export const fetchPropertyTaskOpenFormSuccess = (taskOpenFormDefinition) => ({
  type: actions.PROPERTY_TASK_OPEN_FORM_FETCH_SUCCESS,
  taskOpenFormDefinition: taskOpenFormDefinition
});

export const fetchPropertyTaskOpenFormFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_TASK_OPEN_FORM_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyTaskCloseFormStart = (
  tenantCode,
  taskInstanceId
) => ({
  type: actions.PROPERTY_TASK_CLOSE_FORM_FETCH_START,
  tenantCode: tenantCode,
  taskInstanceId: taskInstanceId
});

export const fetchPropertyTaskCloseFormSuccess = (taskCloseFormDefinition) => ({
  type: actions.PROPERTY_TASK_CLOSE_FORM_FETCH_SUCCESS,
  taskCloseFormDefinition: taskCloseFormDefinition
});

export const fetchPropertyTaskCloseFormFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_TASK_CLOSE_FORM_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyTaskFormValueStart = (
  tenantCode,
  taskInstanceId
) => ({
  type: actions.PROPERTY_TASK_FORM_VALUE_FETCH_START,
  tenantCode: tenantCode,
  taskInstanceId: taskInstanceId
});

export const fetchPropertyTaskFormValueSuccess = (taskFormValue) => ({
  type: actions.PROPERTY_TASK_FORM_VALUE_FETCH_SUCCESS,
  taskFormValue: taskFormValue
});

export const fetchPropertyTaskFormValueFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_TASK_FORM_VALUE_FETCH_SUCCESS,
  error: error
});

export const propertyTaskUpdateStart = (
  tenantCode,
  taskInstanceId,
  payload,
  toaster,
  url,
  history
) => ({
  type: actions.PROPERTY_TASK_UPDATE_START,
  tenantCode: tenantCode,
  taskInstanceId: taskInstanceId,
  payload: payload,
  toaster: toaster,
  url: url,
  history: history
});

export const propertyTaskUpdateSuccess = (response) => ({
  type: actions.PROPERTY_TASK_UPDATE_SUCCESS,
  response: response
});

export const propertyTaskUpdateFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_TASK_UPDATE_SUCCESS,
  error: error
});

export const fetchPropertyTaskOpenInstanceDiagramStart = (
  tenantCode,
  taskInstanceId
) => ({
  type: actions.PROPERTY_TASK_OPEN_INSTANCE_DIAGRAM_FETCH_START,
  tenantCode: tenantCode,
  taskInstanceId: taskInstanceId
});

export const fetchPropertyTaskOpenInstanceDiagramSuccess = (
  openInstanceDiagram
) => ({
  type: actions.PROPERTY_TASK_OPEN_INSTANCE_DIAGRAM_FETCH_SUCCESS,
  openInstanceDiagram: openInstanceDiagram
});

export const fetchPropertyTaskOpenInstanceDiagramFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_TASK_OPEN_INSTANCE_DIAGRAM_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyTaskCloseInstanceDiagramStart = (
  tenantCode,
  taskInstanceId
) => ({
  type: actions.PROPERTY_TASK_CLOSE_INSTANCE_DIAGRAM_FETCH_START,
  tenantCode: tenantCode,
  taskInstanceId: taskInstanceId
});

export const fetchPropertyTaskCloseInstanceDiagramSuccess = (
  closeInstanceDiagram
) => ({
  type: actions.PROPERTY_TASK_CLOSE_INSTANCE_DIAGRAM_FETCH_SUCCESS,
  closeInstanceDiagram: closeInstanceDiagram
});

export const fetchPropertyTaskCloseInstanceDiagramFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_TASK_CLOSE_INSTANCE_DIAGRAM_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyTaskInstanceDiagramUrlStart = (
  tenantCode,
  processInstanceId
) => ({
  type: actions.PROPERTY_TASK_INSTANCE_DIAGRAM_URL_FETCH_START,
  tenantCode: tenantCode,
  processInstanceId: processInstanceId
});

export const fetchPropertyTaskInstanceDiagramUrlSuccess = (
  instanceDiagramImageUrl
) => ({
  type: actions.PROPERTY_TASK_INSTANCE_DIAGRAM_URL_FETCH_SUCCESS,
  instanceDiagramImageUrl: instanceDiagramImageUrl
});

export const fetchPropertyTaskInstanceDiagramUrlFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_TASK_INSTANCE_DIAGRAM_URL_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyTaskParentInstanceDiagramStart = (
  tenantCode,
  processInstanceId
) => ({
  type: actions.PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_FETCH_START,
  tenantCode: tenantCode,
  processInstanceId: processInstanceId
});

export const fetchPropertyTaskParentInstanceDiagramSuccess = (
  parentInstanceDiagram
) => ({
  type: actions.PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_FETCH_SUCCESS,
  parentInstanceDiagram: parentInstanceDiagram
});

export const fetchPropertyTaskParentInstanceDiagramFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyTaskParentInstanceDiagramUrlStart = (
  tenantCode,
  parentProcessInstanceId
) => ({
  type: actions.PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_URL_FETCH_START,
  tenantCode: tenantCode,
  parentProcessInstanceId: parentProcessInstanceId
});

export const fetchPropertyTaskParentInstanceDiagramUrlSuccess = (
  parentInstanceDiagramImageUrl
) => ({
  type: actions.PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_URL_FETCH_SUCCESS,
  parentInstanceDiagramImageUrl: parentInstanceDiagramImageUrl
});

export const fetchPropertyTaskParentInstanceDiagramUrlFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_URL_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyTaskRootParentInstanceStart = (
  tenantCode,
  processInstanceId
) => ({
  type: actions.PROPERTY_TASK_ROOT_PARENT_INSTANCE_FETCH_START,
  tenantCode: tenantCode,
  processInstanceId: processInstanceId
});

export const fetchPropertyTaskRootParentInstanceSuccess = (
  parentRootInstance
) => ({
  type: actions.PROPERTY_TASK_ROOT_PARENT_INSTANCE_FETCH_SUCCESS,
  parentRootInstance: parentRootInstance
});

export const fetchPropertyTaskRootParentInstanceFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_TASK_ROOT_PARENT_INSTANCE_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyCustomTaskOpenLogicSuccess = (
  customData,
  variables
) => ({
  type: actions.PROPERTY_CUSTOM_TASK_OPEN_LOGIC_SUCCESS,
  customData: customData,
  variables
});
