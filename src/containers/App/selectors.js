/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = (state) => state.globalData || initialState;

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, (globalState) => globalState.currentUser);

const makeSelectLoading = () => createSelector(selectGlobal, (globalState) => globalState.loading);

const makeSelectResetNoti = () =>
  createSelector(selectGlobal, (globalState) => globalState.resetNoti);

const makeSelectSnackbar = () =>
  createSelector(selectGlobal, (globalState) => ({
    showSnackbar: globalState.showSnackbar,
    snackbarMSG: globalState.snackbarMSG,
    variant: globalState.variant,
  }));
const makeSelectLoadingApp = () =>
  createSelector(selectGlobal, (globalState) => globalState.showLoading);
const makeSelectUserData = () =>
  createSelector(selectGlobal, (globalState) => globalState.userData);

const makeSelectPathName = () =>
  createSelector(selectGlobal, (globalState) => globalState.pathname);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectLoadingApp,
  makeSelectSnackbar,
  makeSelectUserData,
  makeSelectPathName,
  makeSelectResetNoti,
};
