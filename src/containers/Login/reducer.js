import { produce } from 'immer';
// action - state management
import { RESET_ACTION, LOGIN_ACTION, LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

export const initialState = {
  data: null,
  loading: false,
  error: false,
  success: false,
};

const loginReducer = (state = initialState, action = {}) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RESET_ACTION:
        draft.data = null;
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        break;
      case LOGIN_ACTION:
        draft.loading = true;
        break;
      case LOGIN_SUCCESS:
        draft.loading = false;
        draft.success = true;
        draft.data = action.data;
        break;
      case LOGIN_FAILED:
        draft.loading = false;
        draft.error = true;
        draft.data = action.err.data;
        break;
      default:
        break;
    }
  });

export default loginReducer;
