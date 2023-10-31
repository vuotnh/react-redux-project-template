/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = (state) => state.appStates || initialState;

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

const makeSelectUserData = () =>
  createSelector(selectGlobal, (globalState) => globalState.userData);

const makeSelectPathName = () =>
  createSelector(selectGlobal, (globalState) => globalState.pathname);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectSnackbar,
  makeSelectUserData,
  makeSelectPathName,
  makeSelectResetNoti,
};
