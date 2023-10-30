import { put, takeLatest, call } from 'redux-saga/effects';
import request from '../../utils/request';
import { getListUserSuccess, getListUserFailed } from './actions';
import { GET_LIST_USER_ACTION } from './constants';
import { showLoadingAction } from '../App/actions';

export function* getListUserAction() {
  yield put(showLoadingAction(true));
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const data = yield call(request, `${apiUrl}/user/listUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (data) {
      yield put(getListUserSuccess(data));
    }
  } catch (err) {
    yield put(getListUserFailed(err));
  }
  yield put(showLoadingAction(false));
}

export default function* UserPageSaga() {
  yield takeLatest(GET_LIST_USER_ACTION, getListUserAction);
}
