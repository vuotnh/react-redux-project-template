import {
  GET_LIST_PRODUCT_ACTION,
  GET_LIST_PRODUCT_FAILED,
  GET_LIST_PRODUCT_SUCCESS,
} from './constants';

export const getListProductAction = () => ({
  type: GET_LIST_PRODUCT_ACTION,
});

export const getListProductSuccess = (data) => ({
  type: GET_LIST_PRODUCT_SUCCESS,
  data,
});

export const getListProductFailed = (err) => ({
  type: GET_LIST_PRODUCT_FAILED,
  err,
});
