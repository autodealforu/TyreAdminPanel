import api from "../../domain/api";
import {
  GET_BLOGCATEGORYS_STATED,
  GET_BLOGCATEGORYS,
  GET_BLOGCATEGORYS_ENDED,
  ADD_BLOGCATEGORY_STATED,
  ADD_BLOGCATEGORY,
  ADD_BLOGCATEGORY_ENDED,
  EDIT_BLOGCATEGORY_STATED,
  EDIT_BLOGCATEGORY,
  EDIT_BLOGCATEGORY_ENDED,
  GET_BLOGCATEGORY_STATED,
  GET_BLOGCATEGORY,
  GET_BLOGCATEGORY_ENDED,
  GET_ALL_BLOGCATEGORYS_STATED,
  GET_ALL_BLOGCATEGORYS,
  GET_ALL_BLOGCATEGORYS_ENDED,
} from "../types/blogcategory_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addBlogcategory = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_BLOGCATEGORY_STATED,
    });
    const { data } = await api.post(`/blogcategorys`, formData);
    dispatch({
      type: ADD_BLOGCATEGORY,
      payload: data,
    });
    dispatch({
      type: ADD_BLOGCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_BLOGCATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getBlogcategorys =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_BLOGCATEGORYS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/blogcategorys?&${query}`);

      dispatch({
        type: GET_BLOGCATEGORYS,
        payload: data,
      });
      dispatch({
        type: GET_BLOGCATEGORYS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_BLOGCATEGORYS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getBlogcategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BLOGCATEGORY_STATED,
    });
    const { data } = await api.get(`/blogcategorys/${id}`);

    dispatch({
      type: GET_BLOGCATEGORY,
      payload: data,
    });
    dispatch({
      type: GET_BLOGCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_BLOGCATEGORY_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editBlogcategory = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_BLOGCATEGORY_STATED,
    });
    const { data } = await api.put(`/blogcategorys/${id}`, formData);
    dispatch({
      type: EDIT_BLOGCATEGORY,
      payload: data,
    });
    dispatch({
      type: EDIT_BLOGCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_BLOGCATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteBlogcategory = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/blogcategorys/${id}`);
    dispatch(setAlert("Blogcategory Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllBlogcategorys =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_BLOGCATEGORYS_STATED,
      });
      const { data } = await api.get(
        `/blogcategorys/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_BLOGCATEGORYS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_BLOGCATEGORYS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_BLOGCATEGORYS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
