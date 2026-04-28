import api from "../../domain/api";
import {
  GET_SUBSUBSUBCATEGORYS_STATED,
  GET_SUBSUBSUBCATEGORYS,
  GET_SUBSUBSUBCATEGORYS_ENDED,
  ADD_SUBSUBSUBCATEGORY_STATED,
  ADD_SUBSUBSUBCATEGORY,
  ADD_SUBSUBSUBCATEGORY_ENDED,
  EDIT_SUBSUBSUBCATEGORY_STATED,
  EDIT_SUBSUBSUBCATEGORY,
  EDIT_SUBSUBSUBCATEGORY_ENDED,
  GET_SUBSUBSUBCATEGORY_STATED,
  GET_SUBSUBSUBCATEGORY,
  GET_SUBSUBSUBCATEGORY_ENDED,
  GET_ALL_SUBSUBSUBCATEGORYS_STATED,
  GET_ALL_SUBSUBSUBCATEGORYS,
  GET_ALL_SUBSUBSUBCATEGORYS_ENDED,
} from "../types/subsubsubcategory_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addSubSubSubCategory = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SUBSUBSUBCATEGORY_STATED,
    });
    const { data } = await api.post(`/subsubsubcategorys/add`, formData);
    dispatch({
      type: ADD_SUBSUBSUBCATEGORY,
      payload: data,
    });
    dispatch({
      type: ADD_SUBSUBSUBCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_SUBSUBSUBCATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getSubSubSubCategorys =
  ({ pageNumber = ""}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_SUBSUBSUBCATEGORYS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/subsubsubcategorys?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_SUBSUBSUBCATEGORYS,
        payload: data,
      });
      dispatch({
        type: GET_SUBSUBSUBCATEGORYS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_SUBSUBSUBCATEGORYS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getSubSubSubCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SUBSUBSUBCATEGORY_STATED,
    });
    const { data } = await api.get(`/subsubsubcategorys/${id}`);

    dispatch({
      type: GET_SUBSUBSUBCATEGORY,
      payload: data,
    });
    dispatch({
      type: GET_SUBSUBSUBCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_SUBSUBSUBCATEGORY_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editSubSubSubCategory = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SUBSUBSUBCATEGORY_STATED,
    });
    const { data } = await api.put(`/subsubsubcategorys/${id}`, formData);
    dispatch({
      type: EDIT_SUBSUBSUBCATEGORY,
      payload: data,
    });
    dispatch({
      type: EDIT_SUBSUBSUBCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_SUBSUBSUBCATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteSubSubSubCategory = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/subsubsubcategorys/${id}`);
    dispatch(setAlert("SubSubSubCategory Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllSubSubSubCategorys = ({ term, value }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_SUBSUBSUBCATEGORYS_STATED,
    });
    const { data } = await api.get(`/subsubsubcategorys/all?term=${term}&value=${value}`);

    dispatch({
      type: GET_ALL_SUBSUBSUBCATEGORYS,
      payload: data,
    });
    dispatch({
      type: GET_ALL_SUBSUBSUBCATEGORYS_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SUBSUBSUBCATEGORYS_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};

export const handleErrorLocal = () => async (dispatch) => {};
