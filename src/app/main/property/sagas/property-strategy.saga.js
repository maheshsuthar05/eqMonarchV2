import * as actions from 'app/main/property/store/actionTypes';
import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { strategyApi } from '../services/strategy.service';
import * as propertyActions from '../store/actions';
import moment from 'moment';

export function* getPropertyStrategySnapshot() {
  try {
    const savingForm = yield call(strategyApi.propertyStartegySavingForm);
    yield put(
      propertyActions.fetchPropertyStartegySavingsFormSuccess(savingForm)
    );
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch snapshot details',
      atAction: actions.PROPERTY_STRATEGY_SAVINGS_FORM_START
    });
  }
}

export function* getPropertyStrategyClaims() {
  try {
    const claimForm = yield call(strategyApi.propertyStartegyClaimForm);
    yield put(propertyActions.fetchPropertyStartegyClaimFormSuccess(claimForm));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch property strategy claim form',
      atAction: actions.PROPERTY_STRATEGY_CLAIMS_FORM_START
    });
  }
}

export function* getPropertyStrategyActuals() {
  try {
    const formdefinition = yield call(strategyApi.propertyStartegyActualForm);
    yield put(
      propertyActions.fetchPropertyStartegyActualsFormSuccess(formdefinition)
    );
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch property strategy actuals form',
      atAction: actions.PROPERTY_STRATEGY_ACTUALS_FORM_START
    });
  }
}

export function* getPropertyStrategyConveyance() {
  try {
    const formdefinition = yield call(
      strategyApi.propertyStartegyConveyanceForm
    );
    yield put(
      propertyActions.fetchPropertyStartegyConveyanceFormSuccess(formdefinition)
    );
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch property strategy conveyance form',
      atAction: actions.PROPERTY_STRATEGY_CONVEYANCE_FORM_START
    });
  }
}

export function* getPropertyStrategyCWCOT() {
  try {
    const formdefinition = yield call(strategyApi.propertyStartegyCWCOTForm);
    yield put(
      propertyActions.fetchPropertyStartegyCWCOTFormSuccess(formdefinition)
    );
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch property strategy CWCOT form',
      atAction: actions.PROPERTY_STRATEGY_CWCOT_FORM_START
    });
  }
}

export function* getPropertyStrategyReoAsIs() {
  try {
    const formdefinition = yield call(strategyApi.propertyStartegyREOAsIsForm);
    yield put(
      propertyActions.fetchPropertyStartegyReoAsIsFormSuccess(formdefinition)
    );
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch property strategy REO As Is form',
      atAction: actions.PROPERTY_STRATEGY_REO_ASIS_FORM_START
    });
  }
}

export function* getPropertyStrategyReoRepair() {
  try {
    const formdefinition = yield call(
      strategyApi.propertyStartegyREORepairForm
    );
    yield put(
      propertyActions.fetchPropertyStartegyReoRepairFormSuccess(formdefinition)
    );
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch property strategy REO Repair form',
      atAction: actions.PROPERTY_STRATEGY_REO_REPAIR_FORM_SUCCESS
    });
  }
}

export function* getPropertyProjections(action) {
  const { propertyId, projectionId, flag } = action;
  try {
    const projectionsData = yield call(
      strategyApi.propertyProjectionGet,
      propertyId,
      projectionId,
      flag
    );
    let flowableBindingData = {
      propertyProjectionsResults: {}
    };

    if (projectionsData.propertyProjectionsResults !== undefined) {
      if (projectionsData.hasOwnProperty('propertyProjectionsResults')) {
        projectionsData.propertyProjectionsResults.map((res, inx) => {
          if (moment(res.resultValueDate).isValid()) {
            flowableBindingData.propertyProjectionsResults[res.resultType] =
              res.resultValueDate;
          } else {
            flowableBindingData.propertyProjectionsResults[res.resultType] =
              res.resultValueAmount;
          }
          return false;
        });
      }
    }
    yield put({
      type: actions.PROPERTY_PROJECTIONS_FLW_BINDING_DATA,
      payload: flowableBindingData
    });
    yield put({
      type: actions.PROPERTY_PROJECTIONS_GET_SUCCESS,
      payload: projectionsData
    });
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: e.message,
      atAction: actions.PROPERTY_PROJECTIONS_GET_START
    });
  }
}

export function* getProjectionsList(action) {
  const { propertyId } = action;
  try {
    const projectionList = yield call(
      strategyApi.propertyProjectionsList,
      propertyId
    );
    yield put({
      type: actions.PROPERTY_PROJECTIONS_LIST_GET_SUCCESS,
      payload: projectionList._embedded.propertyProjections
    });
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: e.message,
      atAction: actions.PROPERTY_PROJECTIONS_LIST_GET_START
    });
  }
}

const dateField = [
  'baseline_debenture_interest_next_due_date_actual',
  'baseline_debenture_interest_conveyance_actual',
  'baseline_debenture_interest_conveyance_deadline',
  'baseline_debenture_interest_default_date_actual',
  'baseline_debenture_interest_default_date_deadline',
  'baseline_debenture_interest_fc_diligence_actual',
  'baseline_debenture_interest_fc_diligence_deadline',
  'baseline_debenture_interest_first_legal_date_actual',
  'baseline_debenture_interest_first_legal_deadline'
];

export function* addPropertyProjections(action) {
  const { payload, propertyId } = action;
  const getProjectionData = yield select(
    ({ property }) => property.strategy.getProjectionsResponse
  );
  try {
    let propertyProjectionsResults = [];
    Object.entries(payload.propertyProjectionsResults).map((res) => {
      if (dateField.includes(res[0])) {
        propertyProjectionsResults.push({
          resultType: res[0],
          resultValueDate: res[1]
        });
      } else {
        propertyProjectionsResults.push({
          resultType: res[0],
          resultValueAmount: res[1]
        });
      }
      return res;
    });
    const postPayload = {
      modelRunSequence:
        Object.keys(getProjectionData).length === 0
          ? 1
          : getProjectionData.modelRunSequence + 1,
      propertyId: propertyId,
      propertyProjectionsResults
    };
    const projectionsData = yield call(
      strategyApi.propertyProjectionAdd,
      postPayload
    );

    yield all([
      put({
        type: actions.PROPERTY_PROJECTIONS_ADD_SUCCESS,
        payload: projectionsData
      }),
      put({
        type: 'API_CALL_SUCCESS',
        message: `Property Projection created succesfully`
      }),
      put(propertyActions.getProjectionsListAction(propertyId)),
      put(propertyActions.getPropertyProjections(propertyId))
    ]);
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: e.message,
      atAction: actions.PROPERTY_PROJECTIONS_ADD_START
    });
  }
}
export function* updatePropertyProjections(action) {
  const { payload } = action;
  const getProjectionData = yield select(
    ({ property }) => property.strategy.getProjectionsResponse
  );
  try {
    let propertyProjectionsResults = [];
    Object.entries(payload.propertyProjectionsResults).map((res) => {
      propertyProjectionsResults.push({
        resultType: res[0],
        resultValueAmount: res[1]
      });
      return res;
    });
    let propertyProjectionsResultsUpdated = getProjectionData.propertyProjectionsResults.map(
      (res, inx) => {
        if (res.resultType === propertyProjectionsResults[inx].resultType) {
          res.resultValueAmount =
            propertyProjectionsResults[inx].resultValueAmount;
          return res;
        }
        return false;
      }
    );

    const updatedPayload = {
      propertyId: getProjectionData.propertyId,
      propertyProjectionsId: getProjectionData.propertyProjectionsId,
      propertyProjectionsResults: propertyProjectionsResultsUpdated
    };

    const projectionsData = yield call(
      strategyApi.propertyProjectionUpdate,
      updatedPayload.propertyProjectionsId,
      updatedPayload
    );
    yield put({
      type: actions.PROPERTY_PROJECTIONS_UPDATE_SUCCESS,
      payload: projectionsData
    });
    yield put({
      type: 'API_CALL_SUCCESS',
      message: `Property Projection Updated succesfully`
    });
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: e.message,
      atAction: actions.PROPERTY_PROJECTIONS_UPDATE_START
    });
  }
}

export function* getPropertyStrategyBaselineForm() {
  try {
    const formdefinition = yield call(strategyApi.propertyStartegyBaselineForm);
    yield put(
      propertyActions.fetchPropertyStartegyBaselineFormSuccess(formdefinition)
    );
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch property strategy baseline form',
      atAction: actions.PROPERTY_STRATEGY_BASELINE_FORM_START
    });
  }
}

export function* watchGetPropertyStrategySnapshot() {
  yield takeLatest(
    actions.PROPERTY_STRATEGY_SAVINGS_FORM_START,
    getPropertyStrategySnapshot
  );
}

export function* watchGetPropertyStrategyClaimForm() {
  yield takeLatest(
    actions.PROPERTY_STRATEGY_CLAIMS_FORM_START,
    getPropertyStrategyClaims
  );
}

export function* watchGetPropertyStrategyActualsForm() {
  yield takeLatest(
    actions.PROPERTY_STRATEGY_ACTUALS_FORM_START,
    getPropertyStrategyActuals
  );
}

export function* watchGetPropertyStrategyConveyanceForm() {
  yield takeLatest(
    actions.PROPERTY_STRATEGY_CONVEYANCE_FORM_START,
    getPropertyStrategyConveyance
  );
}

export function* watchGetPropertyStrategyCWCOTForm() {
  yield takeLatest(
    actions.PROPERTY_STRATEGY_CWCOT_FORM_START,
    getPropertyStrategyCWCOT
  );
}

export function* watchGetPropertyStrategyREOAsIsForm() {
  yield takeLatest(
    actions.PROPERTY_STRATEGY_REO_ASIS_FORM_START,
    getPropertyStrategyReoAsIs
  );
}

export function* watchGetPropertyStrategyREORepairForm() {
  yield takeLatest(
    actions.PROPERTY_STRATEGY_REO_REPAIR_FORM_START,
    getPropertyStrategyReoRepair
  );
}

export function* watchGetPropertyProjectionsGet() {
  yield takeLatest(
    actions.PROPERTY_PROJECTIONS_GET_START,
    getPropertyProjections
  );
}

export function* watchGetPropertyProjectionsList() {
  yield takeLatest(
    actions.PROPERTY_PROJECTIONS_LIST_GET_START,
    getProjectionsList
  );
}

export function* watchGetPropertyProjectionsAdd() {
  yield takeLatest(
    actions.PROPERTY_PROJECTIONS_ADD_START,
    addPropertyProjections
  );
}

export function* watchGetPropertyProjectionsUpdate() {
  yield takeLatest(
    actions.PROPERTY_PROJECTIONS_UPDATE_START,
    updatePropertyProjections
  );
}

export function* watchGetPropertyStrategyBaselineForm() {
  yield takeLatest(
    actions.PROPERTY_STRATEGY_BASELINE_FORM_START,
    getPropertyStrategyBaselineForm
  );
}
