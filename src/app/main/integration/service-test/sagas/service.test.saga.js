import {put,takeLatest,call,select} from 'redux-saga/effects';
import {apiServices} from '../services/serviceTest';
import * as actionType from '../store/actionTypes';
import * as actions from '../store/actions';

function* getApiServiceRequest(){
  const testApiData=yield select(({integration}) => integration.operation.rowData);
  const bodyValue=yield select(({serviceTestReducers}) =>serviceTestReducers.serviceTest.bodyValue)
  yield put({type:actionType.GET_API_SERVICES_LOADING})
  try{
   const data= yield call(apiServices.getAllServices,testApiData,bodyValue)
    yield put(actions.getApiServicesSuccess(data))
  }catch(e){
    yield put({type:'API_CALL_ERROR',error:e.message,atAction:actionType.GET_API_SERVICES_START})
  }
}

export function* WatchGetApiServices(){
    yield takeLatest(actionType.GET_API_SERVICES_START,getApiServiceRequest)
}

function* getIntegrationOperationData(){
  const {method,url,input,output}=yield select(({integration}) => integration.operation.rowData);
  try{
    let combineData=[...input,...output];
    let headerValue=combineData.filter(res=>res.type==="Header");
    let paramsValue=combineData.filter(res=>res.type!=="Header")
     const payload={method,url,headerValue,paramsValue}  
     yield put(actions.getIntegrationDataSuccess(payload))
  }catch(e){
    yield put({type:'API_CALL_ERROR',error:e.message,atAction:actionType.GET_DATA_INTEGRATION_DATA_START})
  }
}

export function* WatchGetInitialData(){
  yield takeLatest(actionType.GET_DATA_INTEGRATION_DATA_START,getIntegrationOperationData)
}



