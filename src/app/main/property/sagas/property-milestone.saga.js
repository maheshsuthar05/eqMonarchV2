import { PROPERTY_MILESTONE_FETCH_START } from 'app/main/property/store/actionTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { milestoneApi } from '../services/milestone.api';
import * as propertyActions from '../store/actions';
import { formatTimeStamp } from 'app/common/helpers/common-helper';

function* fetchPropertyMilestone(action) {
  const { tenantCode, propertyId, loanNumber, caseInstanceId } = action;
  try {
    const response = yield call(
      milestoneApi.getPropertyMilestone,
      tenantCode,
      propertyId,
      loanNumber,
      caseInstanceId
    );

    const ganttChartData = [];
    const tableChartData = [];
    if (
      response &&
      response._embedded &&
      response._embedded.processMilestones &&
      response._embedded.processMilestones.length
    ) {
      ganttChartData.push([
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Resource' },
        { type: 'date', label: 'Start Date' },
        { type: 'date', label: 'End Date' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' }
      ]);

      tableChartData.push([
        { type: 'string', label: 'Milestone' },
        { type: 'string', label: 'Target Start' },
        { type: 'string', label: 'Actual Start' },
        { type: 'string', label: 'Target Complete' },
        { type: 'string', label: 'Actual Complete' },
        { type: 'string', label: 'Target Days' }
      ]);

      response._embedded.processMilestones.map((milestone) => {
        let ganttRow = [];
        ganttRow.push(milestone.processMilestoneId); // 'Task ID'
        ganttRow.push(milestone.milestoneName); // 'Task Name'
        ganttRow.push(milestone.milestoneName); // 'Resource'
        let actualStartDate = new Date(milestone.actualStartDate);
        let actualCompletionDate = new Date(milestone.actualCompletionDate);
        ganttRow.push(actualStartDate); // 'Start Date'
        ganttRow.push(actualCompletionDate); // 'End Date'
        ganttRow.push(milestone.targetDaysCount); // 'Duration'
        let percentage =
          ((new Date().getTime() - actualStartDate) /
            (actualCompletionDate - actualStartDate)) *
          100;
        percentage = percentage.toFixed(2);
        percentage = percentage > 0 ? percentage : 0;
        ganttRow.push(percentage); //  'Percent Complete'
        ganttRow.push(null); // Dependencies
        ganttChartData.push(ganttRow);

        let tableRow = [];
        tableRow.push(milestone.milestoneName); //Milestone
        tableRow.push(formatTimeStamp(milestone.targetStartDate, true)); //'Target Start'
        tableRow.push(formatTimeStamp(milestone.actualStartDate, true)); //'Actual Start'
        tableRow.push(formatTimeStamp(milestone.targetCompletionDate, true)); //'Target Complete'
        tableRow.push(formatTimeStamp(milestone.actualCompletionDate, true)); //'Actual Complete'
        tableRow.push(milestone.targetDaysCount); //'Target Days'
        tableChartData.push(tableRow);
        return true;
      });
    }

    yield put(
      propertyActions.fetchPropertyMilestoneSuccess({
        tableChartData: tableChartData,
        ganttChartData: ganttChartData
      })
    );
  } catch (error) {
    yield put(propertyActions.fetchPropertyMilestonFailure(error.message));
  }
}

export function* watchPropertyMilestone() {
  yield takeLatest(PROPERTY_MILESTONE_FETCH_START, fetchPropertyMilestone);
}
