import { combineReducers } from 'redux';
import appReducer from '../../containers/App/reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  // globalData: appReducer,
  appStates: appReducer,
});

// export default reducer;
const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === 'DESTROY_SESSION') state = undefined;
  return reducer(state, action);
};
export default rootReducer;
