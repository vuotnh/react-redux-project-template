import { RESET_ACTION, LOGIN_ACTION, LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

export const resetAction = () => ({
  type: RESET_ACTION,
});

export const loginAction = (body) => ({
  type: LOGIN_ACTION,
  body,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data,
});

export const loginFailed = (err) => ({
  type: LOGIN_FAILED,
  err,
});
