import produce from 'immer';
// project imports
import config from '../../config';

// action - state management
import * as actionTypes from '../actions/customizationAction';

export const initialState = {
  isOpen: [], // for active default menu
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true,
  drawerToggle: !!localStorage.getItem('drawerToggle'),
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action = {}) =>
  produce(state, (draft) => {
    let id;
    switch (action.type) {
      case actionTypes.MENU_OPEN:
        id = action.id;
        draft.isOpen = [id];
        break;
      case actionTypes.SET_MENU:
        draft.opened = action.opened;
        break;
      case actionTypes.SET_FONT_FAMILY:
        draft.fontFamily = action.fontFamily;
        break;
      case actionTypes.SET_BORDER_RADIUS:
        draft.borderRadius = action.borderRadius;
        break;
      case actionTypes.DRAWER_TOGGLE:
        draft.drawerToggle = action.data;
        break;
      default:
        break;
    }
  });

export default customizationReducer;
