import { produce } from 'immer';
// action - state management
import {
  GET_LIST_PRODUCT_ACTION,
  GET_LIST_PRODUCT_FAILED,
  GET_LIST_PRODUCT_SUCCESS,
} from './constants';

export const initialState = {
  data: null,
  loading: false,
  error: false,
  success: false,
  language: 'vi',
  errData: null,
};

const productPageReducer = (state = initialState, action = {}) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_LIST_PRODUCT_ACTION:
        draft.loading = true;
        break;
      case GET_LIST_PRODUCT_SUCCESS:
        draft.loading = false;
        draft.success = true;
        draft.data = action.data;
        break;
      case GET_LIST_PRODUCT_FAILED:
        draft.loading = false;
        draft.error = true;
        draft.errData = action.data;
        break;
      default:
        break;
    }
  });

export default productPageReducer;
