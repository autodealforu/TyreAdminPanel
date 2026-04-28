import api from "../../domain/api";
import {
  GET_REVIEWS_STATED,
  GET_REVIEWS,
  GET_REVIEWS_ENDED,
  ADD_REVIEW_STATED,
  ADD_REVIEW,
  ADD_REVIEW_ENDED,
  EDIT_REVIEW_STATED,
  EDIT_REVIEW,
  EDIT_REVIEW_ENDED,
  GET_REVIEW_STATED,
  GET_REVIEW,
  GET_REVIEW_ENDED,
  GET_ALL_REVIEWS_STATED,
  GET_ALL_REVIEWS,
  GET_ALL_REVIEWS_ENDED,
} from "../types/review_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addReview = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_REVIEW_STATED,
    });
    const { data } = await api.post(`/reviews`, formData);
    dispatch({
      type: ADD_REVIEW,
      payload: data,
    });
    dispatch({
      type: ADD_REVIEW_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_REVIEW_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getReviews =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_REVIEWS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/reviews?&${query}`);

      dispatch({
        type: GET_REVIEWS,
        payload: data,
      });
      dispatch({
        type: GET_REVIEWS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_REVIEWS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getReview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_REVIEW_STATED,
    });
    const { data } = await api.get(`/reviews/${id}`);

    dispatch({
      type: GET_REVIEW,
      payload: data,
    });
    dispatch({
      type: GET_REVIEW_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEW_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editReview = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_REVIEW_STATED,
    });
    const { data } = await api.put(`/reviews/${id}`, formData);
    dispatch({
      type: EDIT_REVIEW,
      payload: data,
    });
    dispatch({
      type: EDIT_REVIEW_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_REVIEW_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteReview = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/reviews/${id}`);
    dispatch(setAlert("Review Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllReviews =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_REVIEWS_STATED,
      });
      const { data } = await api.get(
        `/reviews/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_REVIEWS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_REVIEWS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_REVIEWS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
