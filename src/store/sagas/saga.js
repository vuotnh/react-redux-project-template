import { fork } from 'redux-saga/effects';
import AppSaga from '../../containers/App/saga';
import UserPageSaga from '../../containers/UserPage/saga';

function* rootSaga() {
  yield fork(AppSaga);
  yield fork(UserPageSaga);
}

export default rootSaga;
