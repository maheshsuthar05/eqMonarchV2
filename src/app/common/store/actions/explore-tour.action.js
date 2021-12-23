import {
  EXPLORE_TOUR_START,
  EXPLORE_TOUR_SUCCESS
} from 'app/store/actions/actionTypes';

export const exploreTourStart = () => ({
  type: EXPLORE_TOUR_START
});

export const exploreTourSuccess = (payload) => ({
  type: EXPLORE_TOUR_SUCCESS,
  payload
});
