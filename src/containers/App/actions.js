import {
  GET_USERDATA_ACTION,
  GET_USERDATA_SUCCESS,
  GET_USERDATA_FAILED,
  CLEAR_USERDATA,
  CHANGE_LANG,
  SHOW_LOADING,
  SET_PATHNAME,
  SET_NOTI,
} from './constants';

export const clearuserDataAction = () => ({
  type: CLEAR_USERDATA,
});

export const getUserDataAction = () => ({
  type: GET_USERDATA_ACTION,
});

export const getUserDataSuccess = (data) => ({
  type: GET_USERDATA_SUCCESS,
  data,
});

export const getUserDataFailed = (err) => ({
  type: GET_USERDATA_FAILED,
  err,
});

export const changeLangAction = (lang) => ({
  type: CHANGE_LANG,
  lang,
});

export const showLoadingAction = (loading) => ({
  type: SHOW_LOADING,
  loading,
});

export const setPathNameAction = (pathname) => ({
  type: SET_PATHNAME,
  pathname,
});

export const setNoti = (noti) => ({
  type: SET_NOTI,
  noti,
});
