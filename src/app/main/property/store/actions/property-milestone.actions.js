import * as actions from 'app/main/property/store/actionTypes';
import { API_CALL_ERROR } from 'app/store/actions/actionTypes';

export const fetchPropertyMilestoneStart = (
  propertyId,
  loanNumber,
  tenantCode,
  caseInstanceId
) => ({
  type: actions.PROPERTY_MILESTONE_FETCH_START,
  propertyId: propertyId,
  loanNumber: loanNumber,
  tenantCode: tenantCode,
  caseInstanceId: caseInstanceId
});

export const fetchPropertyMilestoneSuccess = (propertyMilestone) => ({
  type: actions.PROPERTY_MILESTONE_FETCH_SUCCESS,
  milestoneData: propertyMilestone
});

export const fetchPropertyMilestonFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_MILESTONE_FETCH_SUCCESS,
  error: error
});
