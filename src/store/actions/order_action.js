import api from '../../domain/api';
import {
  GET_ORDERS_STATED,
  GET_ORDERS,
  GET_ORDERS_ENDED,
  ADD_ORDER_STATED,
  ADD_ORDER,
  ADD_ORDER_ENDED,
  EDIT_ORDER_STATED,
  EDIT_ORDER,
  EDIT_ORDER_ENDED,
  GET_ORDER_STATED,
  GET_ORDER,
  GET_ORDER_ENDED,
  GET_ALL_ORDERS_STATED,
  GET_ALL_ORDERS,
  GET_ALL_ORDERS_ENDED,
} from '../types/order_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addOrder = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_ORDER_STATED,
    });
    const { data } = await api.post(`/orders`, formData);
    dispatch({
      type: ADD_ORDER,
      payload: data,
    });
    dispatch({
      type: ADD_ORDER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_ORDER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getOrders =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ORDERS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/orders?&${query}`);

      dispatch({
        type: GET_ORDERS,
        payload: data,
      });
      dispatch({
        type: GET_ORDERS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ORDERS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ORDER_STATED,
    });
    const { data } = await api.get(`/orders/${id}`);

    dispatch({
      type: GET_ORDER,
      payload: data.order || data,
    });
    dispatch({
      type: GET_ORDER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editOrder = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_ORDER_STATED,
    });
    const { data } = await api.put(`/orders/${id}`, formData);
    dispatch({
      type: EDIT_ORDER,
      payload: data,
    });
    dispatch({
      type: EDIT_ORDER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_ORDER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};

export const updateOrderStatus = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_ORDER_STATED,
    });
    const { data } = await api.put(`/orders/${id}/status`, formData);
    dispatch({
      type: EDIT_ORDER,
      payload: data,
    });
    dispatch({
      type: EDIT_ORDER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_ORDER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const updatePaymentStatus = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_ORDER_STATED,
    });
    const { data } = await api.put(`/orders/${id}/payment-status`, formData);
    dispatch({
      type: EDIT_ORDER,
      payload: data,
    });
    dispatch({
      type: EDIT_ORDER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_ORDER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const updateDeliveryCharges = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_ORDER_STATED,
    });
    const { data } = await api.put(`/orders/${id}/delivery-charges`, formData);
    dispatch({
      type: EDIT_ORDER,
      payload: data,
    });
    dispatch({
      type: EDIT_ORDER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_ORDER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const updatePayoutStatus = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_ORDER_STATED,
    });
    const { data } = await api.put(`/orders/${id}/payout-status`, formData);
    dispatch({
      type: EDIT_ORDER,
      payload: data,
    });
    dispatch({
      type: EDIT_ORDER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_ORDER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteOrder = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/orders/${id}`);
    dispatch(setAlert('Order Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllOrders =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_ORDERS_STATED,
      });
      const { data } = await api.get(`/orders/all?term=${term}&value=${value}`);

      dispatch({
        type: GET_ALL_ORDERS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_ORDERS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_ORDERS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
