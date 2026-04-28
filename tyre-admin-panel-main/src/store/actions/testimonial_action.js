import api from "../../domain/api";
import {
  GET_TESTIMONIALS_STATED,
  GET_TESTIMONIALS,
  GET_TESTIMONIALS_ENDED,
  ADD_TESTIMONIAL_STATED,
  ADD_TESTIMONIAL,
  ADD_TESTIMONIAL_ENDED,
  EDIT_TESTIMONIAL_STATED,
  EDIT_TESTIMONIAL,
  EDIT_TESTIMONIAL_ENDED,
  GET_TESTIMONIAL_STATED,
  GET_TESTIMONIAL,
  GET_TESTIMONIAL_ENDED,
  GET_ALL_TESTIMONIALS_STATED,
  GET_ALL_TESTIMONIALS,
  GET_ALL_TESTIMONIALS_ENDED,
} from "../types/testimonial_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addTestimonial = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_TESTIMONIAL_STATED,
    });
    const { data } = await api.post(`/testimonials`, formData);
    dispatch({
      type: ADD_TESTIMONIAL,
      payload: data,
    });
    dispatch({
      type: ADD_TESTIMONIAL_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_TESTIMONIAL_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getTestimonials =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_TESTIMONIALS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/testimonials?&${query}`);

      dispatch({
        type: GET_TESTIMONIALS,
        payload: data,
      });
      dispatch({
        type: GET_TESTIMONIALS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_TESTIMONIALS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getTestimonial = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TESTIMONIAL_STATED,
    });
    const { data } = await api.get(`/testimonials/${id}`);

    dispatch({
      type: GET_TESTIMONIAL,
      payload: data,
    });
    dispatch({
      type: GET_TESTIMONIAL_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_TESTIMONIAL_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editTestimonial = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_TESTIMONIAL_STATED,
    });
    const { data } = await api.put(`/testimonials/${id}`, formData);
    dispatch({
      type: EDIT_TESTIMONIAL,
      payload: data,
    });
    dispatch({
      type: EDIT_TESTIMONIAL_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_TESTIMONIAL_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteTestimonial = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/testimonials/${id}`);
    dispatch(setAlert("Testimonial Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllTestimonials =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_TESTIMONIALS_STATED,
      });
      const { data } = await api.get(
        `/testimonials/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_TESTIMONIALS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_TESTIMONIALS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_TESTIMONIALS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
