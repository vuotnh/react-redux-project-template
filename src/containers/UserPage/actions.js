import { GET_LIST_USER_ACTION, GET_LIST_USER_FAILED, GET_LIST_USER_SUCCESS } from './constants';

export const getUserListAction = () => ({
  type: GET_LIST_USER_ACTION,
});

export const getListUserSuccess = (data) => ({
  type: GET_LIST_USER_SUCCESS,
  data,
});

export const getListUserFailed = (err) => ({
  type: GET_LIST_USER_FAILED,
  err,
});
