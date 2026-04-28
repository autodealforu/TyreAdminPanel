import api from "../../domain/api";
import {
  GET_COUPONS_STATED,
  GET_COUPONS,
  GET_COUPONS_ENDED,
  ADD_COUPON_STATED,
  ADD_COUPON,
  ADD_COUPON_ENDED,
  EDIT_COUPON_STATED,
  EDIT_COUPON,
  EDIT_COUPON_ENDED,
  GET_COUPON_STATED,
  GET_COUPON,
  GET_COUPON_ENDED,
  GET_ALL_COUPONS_STATED,
  GET_ALL_COUPONS,
  GET_ALL_COUPONS_ENDED,
} from "../types/coupon_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addCoupon = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_COUPON_STATED,
    });
    const { data } = await api.post(`/coupons`, formData);
    dispatch({
      type: ADD_COUPON,
      payload: data,
    });
    dispatch({
      type: ADD_COUPON_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_COUPON_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getCoupons =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_COUPONS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/coupons?&${query}`);

      dispatch({
        type: GET_COUPONS,
        payload: data,
      });
      dispatch({
        type: GET_COUPONS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_COUPONS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getCoupon = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COUPON_STATED,
    });
    const { data } = await api.get(`/coupons/${id}`);

    dispatch({
      type: GET_COUPON,
      payload: data,
    });
    dispatch({
      type: GET_COUPON_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_COUPON_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editCoupon = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_COUPON_STATED,
    });
    const { data } = await api.put(`/coupons/${id}`, formData);
    dispatch({
      type: EDIT_COUPON,
      payload: data,
    });
    dispatch({
      type: EDIT_COUPON_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_COUPON_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/coupons/${id}`);
    dispatch(setAlert("Coupon Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllCoupons =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_COUPONS_STATED,
      });
      const { data } = await api.get(
        `/coupons/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_COUPONS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_COUPONS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_COUPONS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
