import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserPageDomain = (state) => state.userPageStates || initialState;

const makeSelectUserList = () => createSelector(selectUserPageDomain, (substate) => substate);

export default makeSelectUserList;

export { selectUserPageDomain };
