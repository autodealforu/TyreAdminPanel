import api from "../../domain/api";
import {
  GET_BANNERS_STATED,
  GET_BANNERS,
  GET_BANNERS_ENDED,
  ADD_BANNER_STATED,
  ADD_BANNER,
  ADD_BANNER_ENDED,
  EDIT_BANNER_STATED,
  EDIT_BANNER,
  EDIT_BANNER_ENDED,
  GET_BANNER_STATED,
  GET_BANNER,
  GET_BANNER_ENDED,
  GET_ALL_BANNERS_STATED,
  GET_ALL_BANNERS,
  GET_ALL_BANNERS_ENDED,
} from "../types/banner_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addBanner = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_BANNER_STATED,
    });
    const { data } = await api.post(`/banners`, formData);
    dispatch({
      type: ADD_BANNER,
      payload: data,
    });
    dispatch({
      type: ADD_BANNER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_BANNER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getBanners =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_BANNERS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/banners?&${query}`);

      dispatch({
        type: GET_BANNERS,
        payload: data,
      });
      dispatch({
        type: GET_BANNERS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_BANNERS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getBanner = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BANNER_STATED,
    });
    const { data } = await api.get(`/banners/${id}`);

    dispatch({
      type: GET_BANNER,
      payload: data,
    });
    dispatch({
      type: GET_BANNER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_BANNER_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editBanner = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_BANNER_STATED,
    });
    const { data } = await api.put(`/banners/${id}`, formData);
    dispatch({
      type: EDIT_BANNER,
      payload: data,
    });
    dispatch({
      type: EDIT_BANNER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_BANNER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteBanner = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/banners/${id}`);
    dispatch(setAlert("Banner Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllBanners =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_BANNERS_STATED,
      });
      const { data } = await api.get(
        `/banners/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_BANNERS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_BANNERS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_BANNERS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
