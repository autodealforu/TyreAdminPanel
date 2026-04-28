import api from "../../domain/api";
import {
  GET_PRODUCTCATEGORYS_STATED,
  GET_PRODUCTCATEGORYS,
  GET_PRODUCTCATEGORYS_ENDED,
  ADD_PRODUCTCATEGORY_STATED,
  ADD_PRODUCTCATEGORY,
  ADD_PRODUCTCATEGORY_ENDED,
  EDIT_PRODUCTCATEGORY_STATED,
  EDIT_PRODUCTCATEGORY,
  EDIT_PRODUCTCATEGORY_ENDED,
  GET_PRODUCTCATEGORY_STATED,
  GET_PRODUCTCATEGORY,
  GET_PRODUCTCATEGORY_ENDED,
  GET_ALL_PRODUCTCATEGORYS_STATED,
  GET_ALL_PRODUCTCATEGORYS,
  GET_ALL_PRODUCTCATEGORYS_ENDED,
} from "../types/productcategory_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addProductcategory = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_PRODUCTCATEGORY_STATED,
    });
    const { data } = await api.post(`/productcategorys`, formData);
    dispatch({
      type: ADD_PRODUCTCATEGORY,
      payload: data,
    });
    dispatch({
      type: ADD_PRODUCTCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCTCATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getProductcategorys =
  ({}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_PRODUCTCATEGORYS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/productcategorys?&${query}`);

      dispatch({
        type: GET_PRODUCTCATEGORYS,
        payload: data,
      });
      dispatch({
        type: GET_PRODUCTCATEGORYS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTCATEGORYS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getProductcategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTCATEGORY_STATED,
    });
    const { data } = await api.get(`/productcategorys/${id}`);

    dispatch({
      type: GET_PRODUCTCATEGORY,
      payload: data,
    });
    dispatch({
      type: GET_PRODUCTCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTCATEGORY_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editProductcategory = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_PRODUCTCATEGORY_STATED,
    });
    const { data } = await api.put(`/productcategorys/${id}`, formData);
    dispatch({
      type: EDIT_PRODUCTCATEGORY,
      payload: data,
    });
    dispatch({
      type: EDIT_PRODUCTCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCTCATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteProductcategory = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/productcategorys/${id}`);
    dispatch(setAlert("Productcategory Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllProductcategorys =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_PRODUCTCATEGORYS_STATED,
      });
      const { data } = await api.get(
        `/productcategorys/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_PRODUCTCATEGORYS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_PRODUCTCATEGORYS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCTCATEGORYS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
