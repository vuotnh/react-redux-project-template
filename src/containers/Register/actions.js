import { RESET_ACTION, REGISTER_ACTION, REGISTER_SUCCESS, REGISTER_FAILED } from './constants';

export const resetAction = () => ({
  type: RESET_ACTION,
});

export const registerAction = (body) => ({
  type: REGISTER_ACTION,
  body,
});

export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  data,
});

export const registerFailed = (err) => ({
  type: REGISTER_FAILED,
  err,
});
