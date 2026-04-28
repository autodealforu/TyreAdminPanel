import api from '../../domain/api';
import {
  GET_VENDORS_STATED,
  GET_VENDORS,
  GET_VENDORS_ENDED,
  ADD_VENDOR_STATED,
  ADD_VENDOR,
  ADD_VENDOR_ENDED,
  EDIT_VENDOR_STATED,
  EDIT_VENDOR,
  EDIT_VENDOR_ENDED,
  GET_VENDOR_STATED,
  GET_VENDOR,
  GET_VENDOR_ENDED,
  GET_ALL_VENDORS_STATED,
  GET_ALL_VENDORS,
  GET_ALL_VENDORS_ENDED,
} from '../types/vendor_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addVendor = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_VENDOR_STATED,
    });
    const { data } = await api.post(`/vendors`, formData);
    dispatch({
      type: ADD_VENDOR,
      payload: data,
    });
    dispatch({
      type: ADD_VENDOR_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_VENDOR_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getVendors =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_VENDORS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/vendors?&${query}`);

      dispatch({
        type: GET_VENDORS,
        payload: data,
      });
      dispatch({
        type: GET_VENDORS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_VENDORS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getVendor = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_VENDOR_STATED,
    });
    const { data } = await api.get(`/vendors/${id}`);

    dispatch({
      type: GET_VENDOR,
      payload: data,
    });
    dispatch({
      type: GET_VENDOR_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_VENDOR_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const addPickupAddressVendor = (id) => async (dispatch) => {
  try {
    // dispatch({
    //   type: GET_VENDOR_STATED,
    // });
    const { data } = await api.post(`/vendors/${id}/pickup-address`, {});

    // dispatch({
    //   type: GET_VENDOR,
    //   payload: data,
    // });
    // dispatch({
    //   type: GET_VENDOR_ENDED,
    // });
  } catch (error) {
    dispatch({
      type: GET_VENDOR_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editVendor = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_VENDOR_STATED,
    });
    const { data } = await api.put(`/vendors/${id}`, formData);
    dispatch({
      type: EDIT_VENDOR,
      payload: data,
    });
    dispatch({
      type: EDIT_VENDOR_ENDED,
    });
    dispatch(setAlert('Details Saved Successfully', 'success'));
    // window.location.reload();
  } catch (error) {
    dispatch({
      type: EDIT_VENDOR_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteVendor = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/vendors/${id}`);
    dispatch(setAlert('Vendor Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllVendors =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_VENDORS_STATED,
      });
      const { data } = await api.get(
        `/vendors/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_VENDORS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_VENDORS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_VENDORS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
