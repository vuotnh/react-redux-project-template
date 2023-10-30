import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCategoryPageDomain = (state) => state.categoryPageStates || initialState;

const makeSelectCategoryList = () =>
  createSelector(selectCategoryPageDomain, (substate) => substate);

export default makeSelectCategoryList;

export { selectCategoryPageDomain };
