import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '@_reducers/user';
import { USER_SERVER } from '@config/config';
import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  SUCCESS_BUY_FAILURE,
  SUCCESS_BUY_REQUEST,
  SUCCESS_BUY_SUCCESS,
} from '../_reducers/user';

function authAPI() {
  return axios.get(`${USER_SERVER}/auth`);
}

function* auth() {
  try {
    const result = yield call(authAPI);
    yield put({
      type: AUTH_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.err(err);
    yield put({
      type: AUTH_FAILURE,
      error: err.response.data,
    });
  }
}

function registerAPI(data) {
  return axios.post(`${USER_SERVER}/register`, data);
}

function* register(action) {
  try {
    const result = yield call(registerAPI, action.data);
    console.log(result);
    yield put({
      type: REGISTER_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REGISTER_FAILURE,
      error: err.response.data,
    });
  }
}

function loginAPI(data) {
  return axios.post(`${USER_SERVER}/login`, data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
    // localStorage.setItem('CURRENT_USER', JSON.stringify(result.data));
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logoutAPI() {
  return axios.get(`${USER_SERVER}/logout`);
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });

    // localStorage.removeItem('CURRENT_USER');
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function addToCartAPI(data) {
  return axios.post(`${USER_SERVER}/addToCart`, data);
}

function* addToCart(action) {
  try {
    const result = yield call(addToCartAPI, action.data);

    yield put({
      type: ADD_TO_CART_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_TO_CART_FAILURE,
      error: err.response.data,
    });
  }
}

function successBuyAPI(data) {
  return axios.post(`${USER_SERVER}/successBuy`, data);
}

function* successBuy(action) {
  try {
    const result = yield call(successBuyAPI, action.data);

    yield put({
      type: SUCCESS_BUY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SUCCESS_BUY_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAuth() {
  yield takeLatest(AUTH_REQUEST, auth);
}

function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchAddToCart() {
  yield takeLatest(ADD_TO_CART_REQUEST, addToCart);
}

function* watchSuccessBuy() {
  yield takeLatest(SUCCESS_BUY_REQUEST, successBuy);
}

export default function* userSaga() {
  yield all([
    fork(watchAuth),
    fork(watchRegister),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchAddToCart),
    fork(watchSuccessBuy),
  ]);
}
