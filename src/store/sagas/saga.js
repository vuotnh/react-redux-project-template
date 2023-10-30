import { fork } from 'redux-saga/effects';
import AppSaga from '../../containers/App/saga';
import UserPageSaga from '../../containers/UserPage/saga';
import CategoryPageSaga from '../../containers/CategoryPage/saga';
import ProductPageSaga from '../../containers/ProductPage/saga';

function* rootSaga() {
  yield fork(AppSaga);
  yield fork(UserPageSaga);
  yield fork(CategoryPageSaga);
  yield fork(ProductPageSaga);
}

export default rootSaga;
