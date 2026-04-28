import api from "../../domain/api";
import {
  GET_CONTACTS_STATED,
  GET_CONTACTS,
  GET_CONTACTS_ENDED,
  ADD_CONTACT_STATED,
  ADD_CONTACT,
  ADD_CONTACT_ENDED,
  EDIT_CONTACT_STATED,
  EDIT_CONTACT,
  EDIT_CONTACT_ENDED,
  GET_CONTACT_STATED,
  GET_CONTACT,
  GET_CONTACT_ENDED,
  GET_ALL_CONTACTS_STATED,
  GET_ALL_CONTACTS,
  GET_ALL_CONTACTS_ENDED,
} from "../types/contact_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addContact = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_CONTACT_STATED,
    });
    const { data } = await api.post(`/contacts`, formData);
    dispatch({
      type: ADD_CONTACT,
      payload: data,
    });
    dispatch({
      type: ADD_CONTACT_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_CONTACT_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getContacts =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_CONTACTS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/contacts?&${query}`);

      dispatch({
        type: GET_CONTACTS,
        payload: data,
      });
      dispatch({
        type: GET_CONTACTS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_CONTACTS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getContact = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CONTACT_STATED,
    });
    const { data } = await api.get(`/contacts/${id}`);

    dispatch({
      type: GET_CONTACT,
      payload: data,
    });
    dispatch({
      type: GET_CONTACT_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_CONTACT_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editContact = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_CONTACT_STATED,
    });
    const { data } = await api.put(`/contacts/${id}`, formData);
    dispatch({
      type: EDIT_CONTACT,
      payload: data,
    });
    dispatch({
      type: EDIT_CONTACT_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_CONTACT_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteContact = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/contacts/${id}`);
    dispatch(setAlert("Contact Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllContacts =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_CONTACTS_STATED,
      });
      const { data } = await api.get(
        `/contacts/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_CONTACTS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_CONTACTS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_CONTACTS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
