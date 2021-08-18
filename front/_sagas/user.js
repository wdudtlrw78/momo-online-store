import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import backUrl from '../config/config';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../_reducers/user';

function registerAPI(data) {
  return axios.post(`${backUrl}/users/register`, data);
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
  return axios.post(`${backUrl}/users/login`, data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    console.log('saga Login');
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

export default function* userSaga() {
  yield all([fork(watchRegister), fork(watchLogin)]);
}
