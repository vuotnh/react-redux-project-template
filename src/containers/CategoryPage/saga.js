import { put, takeLatest, call } from 'redux-saga/effects';
import request from '../../utils/request';
import { getListCategoryFailed, getListCategorySuccess } from './actions';
import { GET_LIST_CATEGORY_ACTION } from './constants';
import { showLoadingAction } from '../App/actions';

export function* getListCategoryAction() {
  try {
    yield put(showLoadingAction(true));
    const apiUrl = import.meta.env.VITE_API_URL;
    const data = yield call(request, `${apiUrl}/category/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (data) {
      yield put(getListCategorySuccess(data));
    }
  } catch (err) {
    yield put(getListCategoryFailed(err));
  }
  yield put(showLoadingAction(false));
}

export default function* CategoryPageSaga() {
  yield takeLatest(GET_LIST_CATEGORY_ACTION, getListCategoryAction);
}
