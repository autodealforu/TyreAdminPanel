import api from "../../domain/api";
import {
  GET_NOTIFICATIONS_STATED,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_ENDED,
  ADD_NOTIFICATION_STATED,
  ADD_NOTIFICATION,
  ADD_NOTIFICATION_ENDED,
  EDIT_NOTIFICATION_STATED,
  EDIT_NOTIFICATION,
  EDIT_NOTIFICATION_ENDED,
  GET_NOTIFICATION_STATED,
  GET_NOTIFICATION,
  GET_NOTIFICATION_ENDED,
  GET_ALL_NOTIFICATIONS_STATED,
  GET_ALL_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS_ENDED,
} from "../types/notification_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addNotification = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_NOTIFICATION_STATED,
    });
    const { data } = await api.post(`/notifications`, formData);
    dispatch({
      type: ADD_NOTIFICATION,
      payload: data,
    });
    dispatch({
      type: ADD_NOTIFICATION_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_NOTIFICATION_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getNotifications =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_NOTIFICATIONS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/notifications?&${query}`);

      dispatch({
        type: GET_NOTIFICATIONS,
        payload: data,
      });
      dispatch({
        type: GET_NOTIFICATIONS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_NOTIFICATIONS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getNotification = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NOTIFICATION_STATED,
    });
    const { data } = await api.get(`/notifications/${id}`);

    dispatch({
      type: GET_NOTIFICATION,
      payload: data,
    });
    dispatch({
      type: GET_NOTIFICATION_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_NOTIFICATION_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editNotification = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_NOTIFICATION_STATED,
    });
    const { data } = await api.put(`/notifications/${id}`, formData);
    dispatch({
      type: EDIT_NOTIFICATION,
      payload: data,
    });
    dispatch({
      type: EDIT_NOTIFICATION_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_NOTIFICATION_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteNotification = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/notifications/${id}`);
    dispatch(setAlert("Notification Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllNotifications =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_NOTIFICATIONS_STATED,
      });
      const { data } = await api.get(
        `/notifications/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_NOTIFICATIONS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_NOTIFICATIONS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_NOTIFICATIONS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
