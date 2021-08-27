import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS } from '@_reducers/product';
import { PRODUCT_SERVER } from '@config/config';
import {
  STORAGE_PRODUCT_REQUEST,
  STORAGE_PRODUCT_SUCCESS,
  STORAGE_PRODUCT_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from '../_reducers/product';

function uploadImagesAPI(data, config) {
  return axios.post(`${PRODUCT_SERVER}/image`, data, config);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);

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

function StorageProductAPI(data) {
  return axios.post(`${PRODUCT_SERVER}`, data);
}

function* StorageProduct(action) {
  try {
    const result = yield call(StorageProductAPI, action.data);

    yield put({
      type: STORAGE_PRODUCT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: STORAGE_PRODUCT_FAILURE,
      error: err.response.data,
    });
  }
}

function GetProductsAPI(data) {
  return axios.get(`${PRODUCT_SERVER}/${data}`);
}

function* getProducts(action) {
  try {
    const result = yield call(GetProductsAPI, action.data);
    yield put({
      type: GET_PRODUCTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_PRODUCTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchStorageProduct() {
  yield takeLatest(STORAGE_PRODUCT_REQUEST, StorageProduct);
}

function* watchGetProducts() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProducts);
}

export default function* productSaga() {
  yield all([fork(watchUploadImages), fork(watchStorageProduct), fork(watchGetProducts)]);
}
