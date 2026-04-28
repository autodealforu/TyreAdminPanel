import api from "../../domain/api";
import {
  GET_MOBILEBANNERS_STATED,
  GET_MOBILEBANNERS,
  GET_MOBILEBANNERS_ENDED,
  ADD_MOBILEBANNER_STATED,
  ADD_MOBILEBANNER,
  ADD_MOBILEBANNER_ENDED,
  EDIT_MOBILEBANNER_STATED,
  EDIT_MOBILEBANNER,
  EDIT_MOBILEBANNER_ENDED,
  GET_MOBILEBANNER_STATED,
  GET_MOBILEBANNER,
  GET_MOBILEBANNER_ENDED,
  GET_ALL_MOBILEBANNERS_STATED,
  GET_ALL_MOBILEBANNERS,
  GET_ALL_MOBILEBANNERS_ENDED,
} from "../types/mobilebanner_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addMobilebanner = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_MOBILEBANNER_STATED,
    });
    const { data } = await api.post(`/mobilebanners`, formData);
    dispatch({
      type: ADD_MOBILEBANNER,
      payload: data,
    });
    dispatch({
      type: ADD_MOBILEBANNER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_MOBILEBANNER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getMobilebanners =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_MOBILEBANNERS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/mobilebanners?&${query}`);

      dispatch({
        type: GET_MOBILEBANNERS,
        payload: data,
      });
      dispatch({
        type: GET_MOBILEBANNERS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_MOBILEBANNERS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getMobilebanner = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MOBILEBANNER_STATED,
    });
    const { data } = await api.get(`/mobilebanners/${id}`);

    dispatch({
      type: GET_MOBILEBANNER,
      payload: data,
    });
    dispatch({
      type: GET_MOBILEBANNER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_MOBILEBANNER_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editMobilebanner = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_MOBILEBANNER_STATED,
    });
    const { data } = await api.put(`/mobilebanners/${id}`, formData);
    dispatch({
      type: EDIT_MOBILEBANNER,
      payload: data,
    });
    dispatch({
      type: EDIT_MOBILEBANNER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_MOBILEBANNER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteMobilebanner = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/mobilebanners/${id}`);
    dispatch(setAlert("Mobilebanner Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllMobilebanners =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_MOBILEBANNERS_STATED,
      });
      const { data } = await api.get(
        `/mobilebanners/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_MOBILEBANNERS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_MOBILEBANNERS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_MOBILEBANNERS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
