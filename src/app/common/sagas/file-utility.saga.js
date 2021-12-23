import _ from '@lodash';
import { getBlobDataAsFileUpload } from 'app/common/helpers/common-helper';
import * as actions from 'app/common/store/actionTypes';
import { fileUploadApi } from 'app/services/fileUploadService';
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { fileUtils } from '../services/file-utility.service';
import { fileCategoryType, operationType } from 'app/common/constants';

function* downloadFile(action) {
  const { fileUrl } = action;
  try {
    yield call(fileUtils.downloadFile, fileUrl);
    yield put({
      type: 'API_CALL_SUCCESS',
      message: `File downloaded successfully`
    });
    yield put({ type: actions.DOWNLOAD_FILE_SUCCESS });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. [Download Failed] Please contact system Admin.',
      atAction: actions.DOWNLOAD_FILE_START
    });
  }
}

export function* watchDownloadFile() {
  yield takeLatest(actions.DOWNLOAD_FILE_START, downloadFile);
}

function* checkTemplate(action) {
  try {
    const templateDetails = yield call(fileUtils.checkTemplate, action);
    const templateDetailsIndex = _.findIndex(templateDetails, {
      templateKey: action.templateDetails.templateKey.toUpperCase()
    });
    if (templateDetailsIndex >= 0) {
      yield put({
        type: actions.CHECK_TEMPLATE_SUCCESS,
        templateDetails: templateDetails[templateDetailsIndex]
      });
    }
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. [Could not find template] Please contact system Admin.',
      atAction: actions.CHECK_TEMPLATE_START
    });
  }
}

export function* watchCheckTemplate() {
  yield takeLatest(actions.CHECK_TEMPLATE_START, checkTemplate);
}

function* generateFile(action) {
  try {
    const templateDetails = yield select(
      ({ common }) => common.downloadFile?.templateDetails
    );
    const tenantCode = yield select(({ auth }) => auth.user?.tenantCode);
    const fileDetails = yield call(
      fileUtils.generateFile,
      action,
      tenantCode,
      templateDetails
    );
    if (action?.data?.options?.uploadFile) {
      const propertyId = yield select(
        ({ property }) => property.get.property?.property?.propertyId
      );
      const attachment = getBlobDataAsFileUpload(fileDetails[0]?.blob);

      const data = {
        investorId: propertyId,
        fileCategoryType: action?.data?.options?.fileCategoryType
          ? action?.data?.options?.fileCategoryType
          : fileCategoryType.MESSAGE,
        tenantId: {
          tenantID: tenantCode
        },
        parentId: propertyId
      };
      const json = yield call(
        fileUploadApi.upload,
        attachment,
        data,
        operationType.MESSAGE_ATTACHMENTS
      );
      fileDetails[0].operationType = json?.operationType;
      fileDetails[0].fileName = json?.fileName;
      fileDetails[0].fileS3Url = json?.fileS3Url;
      fileDetails[0].createdBy = json?.createdBy;
    }
    delete fileDetails[0].blob;
    yield all([
      yield delay(5000),
      yield put({
        type: actions.GENERATE_FILE_SUCCESS,
        fileUrl: fileDetails[0]?.fileUrl,
        fileDetails: fileDetails
      })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. [While generating file] Please contact system Admin.',
      atAction: actions.GENERATE_FILE_START
    });
  }
}

export function* watchGenerateFile() {
  yield takeLatest(actions.GENERATE_FILE_START, generateFile);
}

function* setFileUrl(action) {
  try {
    yield all([
      yield delay(5000),
      yield put({ type: actions.SET_FILE_URL_SUCCESS, fileUrl: action.fileUrl })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. [While generating file] Please contact system Admin.',
      atAction: actions.SET_FILE_URL_START
    });
  }
}

export function* watchSetFileUrl() {
  yield takeLatest(actions.SET_FILE_URL_START, setFileUrl);
}
