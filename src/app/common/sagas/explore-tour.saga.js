import { EXPLORE_TOUR_START } from 'app/store/actions/actionTypes';
import { put, takeLatest, call } from 'redux-saga/effects';
import * as actions from '../store/actions';
import { exploreTourService } from '../services/explore-tour.service';

function* exploreTour() {
  try {
    const data = yield call(exploreTourService.getFileData);
    yield put(actions.exploreTourSuccess(data));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch file data',
      atAction: EXPLORE_TOUR_START
    });
  }
}

function* watchExploreTour() {
  yield takeLatest(EXPLORE_TOUR_START, exploreTour);
}

export default watchExploreTour;
