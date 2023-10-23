import { produce } from 'immer';
// action - state management
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

export const initialState = {
  userData: null,
  loading: false,
  error: false,
  success: false,
  language: 'vi',
  showLoading: false,
  pathname: null,
  resetNoti: false,
};

const appReducer = (state = initialState, action = {}) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_USERDATA_ACTION:
        draft.loading = true;
        break;
      case GET_USERDATA_SUCCESS:
        draft.loading = false;
        draft.success = true;
        draft.userData = action.data;
        break;
      case GET_USERDATA_FAILED:
        draft.loading = false;
        draft.error = true;
        break;
      case CLEAR_USERDATA:
        draft.userData = null;
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        break;
      case CHANGE_LANG:
        draft.language = action.lang;
        break;
      case SHOW_LOADING:
        draft.showLoading = action.loading;
        break;
      case SET_PATHNAME:
        draft.pathname = action.pathname;
        break;
      case SET_NOTI:
        draft.resetNoti = action.noti;
        break;
      default:
        break;
    }
  });

export default appReducer;
