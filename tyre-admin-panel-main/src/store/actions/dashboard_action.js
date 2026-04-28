import api from "../../domain/api";
import {
  GET_DASHBOARDS_STATED,
  GET_DASHBOARDS,
  GET_DASHBOARDS_ENDED,
  ADD_DASHBOARD_STATED,
  ADD_DASHBOARD,
  ADD_DASHBOARD_ENDED,
  EDIT_DASHBOARD_STATED,
  EDIT_DASHBOARD,
  EDIT_DASHBOARD_ENDED,
  GET_DASHBOARD_STATED,
  GET_DASHBOARD,
  GET_DASHBOARD_ENDED,
  GET_ALL_DASHBOARDS_STATED,
  GET_ALL_DASHBOARDS,
  GET_ALL_DASHBOARDS_ENDED,
} from "../types/dashboard_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addDashboard = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_DASHBOARD_STATED,
    });
    const { data } = await api.post(`/dashboards`, formData);
    dispatch({
      type: ADD_DASHBOARD,
      payload: data,
    });
    dispatch({
      type: ADD_DASHBOARD_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_DASHBOARD_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getDashboards = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DASHBOARDS_STATED,
    });
    const queryParams = qs.parse(window.location.search.replace("?", ""));
    const query = qs.stringify(queryParams, {
      encodeValuesOnly: true, // prettify url
    });

    const { data } = await api.get(`/dashboards?&${query}`);
    console.log("data mai kya hai -", data);

    dispatch({
      type: GET_DASHBOARDS,
      payload: data,
    });
    dispatch({
      type: GET_DASHBOARDS_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_DASHBOARDS_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getDashboard = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DASHBOARD_STATED,
    });
    const { data } = await api.get(`/dashboards/${id}`);

    dispatch({
      type: GET_DASHBOARD,
      payload: data,
    });
    dispatch({
      type: GET_DASHBOARD_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_DASHBOARD_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editDashboard = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_DASHBOARD_STATED,
    });
    const { data } = await api.put(`/dashboards/${id}`, formData);
    dispatch({
      type: EDIT_DASHBOARD,
      payload: data,
    });
    dispatch({
      type: EDIT_DASHBOARD_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_DASHBOARD_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteDashboard = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/dashboards/${id}`);
    dispatch(setAlert("Dashboard Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllDashboards =
  ({ term, value }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: GET_ALL_DASHBOARDS_STATED,
        });
        const { data } = await api.get(
          `/dashboards/all?term=${term}&value=${value}`
        );

        dispatch({
          type: GET_ALL_DASHBOARDS,
          payload: data,
        });
        dispatch({
          type: GET_ALL_DASHBOARDS_ENDED,
        });
      } catch (error) {
        dispatch({
          type: GET_ALL_DASHBOARDS_ENDED,
        });
        dispatch(handleErrorLocal(error));
        dispatch(handleError(error));
      }
    };

export const handleErrorLocal = () => async (dispatch) => { };
