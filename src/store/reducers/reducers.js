import { combineReducers } from 'redux';
import appReducer from '../../containers/App/reducer';
import userPageReducer from '../../containers/UserPage/reducer';
import categoryPageReducer from '../../containers/CategoryPage/reducer';
import productPageReducer from '../../containers/ProductPage/reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  // globalData: appReducer,
  appStates: appReducer,
  userPageStates: userPageReducer,
  categoryPageStates: categoryPageReducer,
  productPageStates: productPageReducer,
});

// export default reducer;
const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === 'DESTROY_SESSION') state = undefined;
  return reducer(state, action);
};
export default rootReducer;
