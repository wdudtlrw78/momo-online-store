import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS } from '@_reducers/product';
import { PRODUCT_SERVER } from '@config/config';
import {
  STORAGE_PRODUCT_INFO_FAILURE,
  STORAGE_PRODUCT_INFO_REQUEST,
  STORAGE_PRODUCT_INFO_SUCCESS,
} from '../_reducers/product';

function uploadImagesAPI(data, config) {
  return axios.post(`${PRODUCT_SERVER}/image`, data, config);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    console.log(result);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function storageProductInfoAPI(data) {
  return axios.post(`${PRODUCT_SERVER}`, data);
}

function* storageProductInfo(action) {
  try {
    const result = yield call(storageProductInfoAPI, action.data);
    console.log(result);
    yield put({
      type: STORAGE_PRODUCT_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: STORAGE_PRODUCT_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchStorageProductInfo() {
  yield takeLatest(STORAGE_PRODUCT_INFO_REQUEST, storageProductInfo);
}

export default function* productSaga() {
  yield all([fork(watchUploadImages), fork(watchStorageProductInfo)]);
}
