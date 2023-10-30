import { put, takeLatest, call } from 'redux-saga/effects';
import request from '../../utils/request';
import { getListProductFailed, getListProductSuccess } from './actions';
import { GET_LIST_PRODUCT_ACTION } from './constants';
import { showLoadingAction } from '../App/actions';

export function* getListProduct() {
  yield put(showLoadingAction(true));
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const data = yield call(request, `${apiUrl}/product/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (data) {
      yield put(getListProductSuccess(data));
    }
  } catch (err) {
    yield put(getListProductFailed(err));
  }
  yield put(showLoadingAction(false));
}

export default function* ProductPageSaga() {
  yield takeLatest(GET_LIST_PRODUCT_ACTION, getListProduct);
}
