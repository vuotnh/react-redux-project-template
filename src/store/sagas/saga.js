import { fork } from 'redux-saga/effects';
import AppSaga from '../../containers/App/saga';

function* rootSaga() {
  yield fork(AppSaga);
}

export default rootSaga;
