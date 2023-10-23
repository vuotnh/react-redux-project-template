import { put, takeLatest, call } from 'redux-saga/effects';
import { getUserDataSuccess, getUserDataFailed } from './actions';
import { GET_USERDATA_ACTION } from './constants';
// import request from '../../utils/request';
// import { USERDATA_URL } from '../../urlConfig';

// export function* userDataAction() {
//   try {
//     const data = yield call(request, `${USERDATA_URL}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     });
//     if (data) {
//       // localStorage.setItem('userData', JSON.stringify(data));
//       yield put(getUserDataSuccess(data));
//     }
//   } catch (error) {
//     yield put(getUserDataFailed(error));
//   }
// }

export default function* AppSaga() {
  // yield takeLatest(GET_USERDATA_ACTION, userDataAction);
  // yield takeLatest(userData_ACTION, userDataAction);
}
