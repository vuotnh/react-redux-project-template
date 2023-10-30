import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProductPageDomain = (state) => state.productPageStates || initialState;

const makeSelectProductPage = () => createSelector(selectProductPageDomain, (substate) => substate);

export default makeSelectProductPage;

export { selectProductPageDomain };
