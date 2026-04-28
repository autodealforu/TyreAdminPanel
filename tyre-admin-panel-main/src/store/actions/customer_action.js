import api from "../../domain/api";
import {
  GET_CUSTOMERS_STATED,
  GET_CUSTOMERS,
  GET_CUSTOMERS_ENDED,
  ADD_CUSTOMER_STATED,
  ADD_CUSTOMER,
  ADD_CUSTOMER_ENDED,
  EDIT_CUSTOMER_STATED,
  EDIT_CUSTOMER,
  EDIT_CUSTOMER_ENDED,
  GET_CUSTOMER_STATED,
  GET_CUSTOMER,
  GET_CUSTOMER_ENDED,
  GET_ALL_CUSTOMERS_STATED,
  GET_ALL_CUSTOMERS,
  GET_ALL_CUSTOMERS_ENDED,
} from "../types/customer_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addCustomer = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_CUSTOMER_STATED,
    });
    const { data } = await api.post(`/customers`, formData);
    dispatch({
      type: ADD_CUSTOMER,
      payload: data,
    });
    dispatch({
      type: ADD_CUSTOMER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_CUSTOMER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getCustomers =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_CUSTOMERS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/customers?&${query}`);

      dispatch({
        type: GET_CUSTOMERS,
        payload: data,
      });
      dispatch({
        type: GET_CUSTOMERS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_CUSTOMERS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getCustomer = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CUSTOMER_STATED,
    });
    const { data } = await api.get(`/customers/${id}`);

    dispatch({
      type: GET_CUSTOMER,
      payload: data,
    });
    dispatch({
      type: GET_CUSTOMER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_CUSTOMER_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editCustomer = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_CUSTOMER_STATED,
    });
    const { data } = await api.put(`/customers/${id}`, formData);
    dispatch({
      type: EDIT_CUSTOMER,
      payload: data,
    });
    dispatch(getCustomer(id));
    dispatch({
      type: EDIT_CUSTOMER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_CUSTOMER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteCustomer = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/customers/${id}`);
    dispatch(setAlert("Customer Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllCustomers =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_CUSTOMERS_STATED,
      });
      const { data } = await api.get(
        `/customers/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_CUSTOMERS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_CUSTOMERS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_CUSTOMERS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
