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
  GET_ALL_VENDORS_ENDED
} from "../types/vendor_type";

const initialState = {
  vendors_loading: true,
  vendors: null,
  page: null,
  pages: null,
  total_vendors: 0,

  vendor: null,
  vendor_loading: null,

  loading: true,

  vendor_message: null,
  all_vendors: null,
  all_vendors_loading: null,
  add_vendor_loading: true,
  edit_vendor_loading: true
};

export const vendor_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_VENDORS_STATED:
      return {
        ...state,
        vendors: null,
        pages: null,
        page: null,
        total_vendors: 0,
        vendors_loading: true
      };
    case GET_VENDORS:
      return {
        ...state,
        vendors: payload.vendors,
        pages: payload.pages,
        page: payload.page,
        total_vendors: payload.count
      };
    case GET_VENDORS_ENDED:
      return {
        ...state,
        vendors_loading: false
      };
    case GET_ALL_VENDORS_STATED:
      return {
        ...state,
        all_vendors_loading: true,
        all_vendors: null
      };
    case GET_ALL_VENDORS:
      return {
        ...state,
        all_vendors: payload
      };
    case GET_ALL_VENDORS_ENDED:
      return {
        ...state,
        all_vendors_loading: false
      };

    case ADD_VENDOR_STATED:
      return {
        ...state,
        vendor_message: null,
        add_vendor_loading: true
      };
    case ADD_VENDOR:
      return {
        ...state,
        vendor_message: payload
      };
    case ADD_VENDOR_ENDED:
      return {
        ...state,
        add_vendor_loading: false
      };
    case GET_VENDOR_STATED:
      return {
        ...state,
        vendor: null,
        vendor_loading: true
      };
    case GET_VENDOR:
      return {
        ...state,
        vendor: payload
      };
    case GET_VENDOR_ENDED:
      return {
        ...state,
        vendor_loading: false
      };
    case EDIT_VENDOR_STATED:
      return {
        ...state,
        vendor_message: null,
        edit_vendor_loading: true
      };
    case EDIT_VENDOR:
      return {
        ...state,
        vendor_message: payload,
        vendor: payload
      };
    case EDIT_VENDOR_ENDED:
      return {
        ...state,
        edit_vendor_loading: false
      };

    default:
      return state;
  }
};
