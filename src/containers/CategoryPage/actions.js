import {
  GET_LIST_CATEGORY_ACTION,
  GET_LIST_CATEGORY_FAILED,
  GET_LIST_CATEGORY_SUCCESS,
} from './constants';

export const getListCategoryAction = () => ({
  type: GET_LIST_CATEGORY_ACTION,
});

export const getListCategorySuccess = (data) => ({
  type: GET_LIST_CATEGORY_SUCCESS,
  data,
});

export const getListCategoryFailed = (err) => ({
  type: GET_LIST_CATEGORY_FAILED,
  err,
});
