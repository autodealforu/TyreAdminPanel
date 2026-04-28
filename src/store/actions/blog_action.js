import api from "../../domain/api";
import {
  GET_BLOGS_STATED,
  GET_BLOGS,
  GET_BLOGS_ENDED,
  ADD_BLOG_STATED,
  ADD_BLOG,
  ADD_BLOG_ENDED,
  EDIT_BLOG_STATED,
  EDIT_BLOG,
  EDIT_BLOG_ENDED,
  GET_BLOG_STATED,
  GET_BLOG,
  GET_BLOG_ENDED,
  GET_ALL_BLOGS_STATED,
  GET_ALL_BLOGS,
  GET_ALL_BLOGS_ENDED,
} from "../types/blog_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addBlog = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_BLOG_STATED,
    });
    const { data } = await api.post(`/blogs`, formData);
    dispatch({
      type: ADD_BLOG,
      payload: data,
    });
    dispatch({
      type: ADD_BLOG_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_BLOG_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getBlogs =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_BLOGS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/blogs?&${query}`);

      dispatch({
        type: GET_BLOGS,
        payload: data,
      });
      dispatch({
        type: GET_BLOGS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_BLOGS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BLOG_STATED,
    });
    const { data } = await api.get(`/blogs/${id}`);

    dispatch({
      type: GET_BLOG,
      payload: data,
    });
    dispatch({
      type: GET_BLOG_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_BLOG_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editBlog = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_BLOG_STATED,
    });
    const { data } = await api.put(`/blogs/${id}`, formData);
    dispatch({
      type: EDIT_BLOG,
      payload: data,
    });
    dispatch({
      type: EDIT_BLOG_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_BLOG_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteBlog = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/blogs/${id}`);
    dispatch(setAlert("Blog Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllBlogs =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_BLOGS_STATED,
      });
      const { data } = await api.get(`/blogs/all?term=${term}&value=${value}`);

      dispatch({
        type: GET_ALL_BLOGS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_BLOGS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_BLOGS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
