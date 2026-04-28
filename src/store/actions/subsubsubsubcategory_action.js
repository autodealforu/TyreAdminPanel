import api from "../../domain/api";
import {
  GET_SUBSUBSUBSUBCATEGORYS_STATED,
  GET_SUBSUBSUBSUBCATEGORYS,
  GET_SUBSUBSUBSUBCATEGORYS_ENDED,
  ADD_SUBSUBSUBSUBCATEGORY_STATED,
  ADD_SUBSUBSUBSUBCATEGORY,
  ADD_SUBSUBSUBSUBCATEGORY_ENDED,
  EDIT_SUBSUBSUBSUBCATEGORY_STATED,
  EDIT_SUBSUBSUBSUBCATEGORY,
  EDIT_SUBSUBSUBSUBCATEGORY_ENDED,
  GET_SUBSUBSUBSUBCATEGORY_STATED,
  GET_SUBSUBSUBSUBCATEGORY,
  GET_SUBSUBSUBSUBCATEGORY_ENDED,
  GET_ALL_SUBSUBSUBSUBCATEGORYS_STATED,
  GET_ALL_SUBSUBSUBSUBCATEGORYS,
  GET_ALL_SUBSUBSUBSUBCATEGORYS_ENDED,
} from "../types/subsubsubsubcategory_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addSubSubSubSubCategory = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SUBSUBSUBSUBCATEGORY_STATED,
    });
    const { data } = await api.post(`/subsubsubsubcategorys/add`, formData);
    dispatch({
      type: ADD_SUBSUBSUBSUBCATEGORY,
      payload: data,
    });
    dispatch({
      type: ADD_SUBSUBSUBSUBCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_SUBSUBSUBSUBCATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getSubSubSubSubCategorys =
  ({ pageNumber = ""}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_SUBSUBSUBSUBCATEGORYS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/subsubsubsubcategorys?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_SUBSUBSUBSUBCATEGORYS,
        payload: data,
      });
      dispatch({
        type: GET_SUBSUBSUBSUBCATEGORYS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_SUBSUBSUBSUBCATEGORYS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getSubSubSubSubCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SUBSUBSUBSUBCATEGORY_STATED,
    });
    const { data } = await api.get(`/subsubsubsubcategorys/${id}`);

    dispatch({
      type: GET_SUBSUBSUBSUBCATEGORY,
      payload: data,
    });
    dispatch({
      type: GET_SUBSUBSUBSUBCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_SUBSUBSUBSUBCATEGORY_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editSubSubSubSubCategory = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SUBSUBSUBSUBCATEGORY_STATED,
    });
    const { data } = await api.put(`/subsubsubsubcategorys/${id}`, formData);
    dispatch({
      type: EDIT_SUBSUBSUBSUBCATEGORY,
      payload: data,
    });
    dispatch({
      type: EDIT_SUBSUBSUBSUBCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_SUBSUBSUBSUBCATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteSubSubSubSubCategory = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/subsubsubsubcategorys/${id}`);
    dispatch(setAlert("SubSubSubSubCategory Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllSubSubSubSubCategorys = ({ term, value }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_SUBSUBSUBSUBCATEGORYS_STATED,
    });
    const { data } = await api.get(`/subsubsubsubcategorys/all?term=${term}&value=${value}`);

    dispatch({
      type: GET_ALL_SUBSUBSUBSUBCATEGORYS,
      payload: data,
    });
    dispatch({
      type: GET_ALL_SUBSUBSUBSUBCATEGORYS_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SUBSUBSUBSUBCATEGORYS_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};

export const handleErrorLocal = () => async (dispatch) => {};
