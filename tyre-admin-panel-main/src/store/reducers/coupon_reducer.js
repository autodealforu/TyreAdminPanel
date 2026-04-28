import {
  GET_COUPONS_STATED,
  GET_COUPONS,
  GET_COUPONS_ENDED,
  ADD_COUPON_STATED,
  ADD_COUPON,
  ADD_COUPON_ENDED,
  EDIT_COUPON_STATED,
  EDIT_COUPON,
  EDIT_COUPON_ENDED,
  GET_COUPON_STATED,
  GET_COUPON,
  GET_COUPON_ENDED,
  GET_ALL_COUPONS_STATED,
  GET_ALL_COUPONS,
  GET_ALL_COUPONS_ENDED
} from "../types/coupon_type";

const initialState = {
  coupons_loading: true,
  coupons: null,
  page: null,
  pages: null,
  total_coupons: 0,

  coupon: null,
  coupon_loading: null,

  loading: true,

  coupon_message: null,
  all_coupons: null,
  all_coupons_loading: null,
  add_coupon_loading: true,
  edit_coupon_loading: true
};

export const coupon_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COUPONS_STATED:
      return {
        ...state,
        coupons: null,
        pages: null,
        page: null,
        total_coupons: 0,
        coupons_loading: true
      };
    case GET_COUPONS:
      return {
        ...state,
        coupons: payload.coupons,
        pages: payload.pages,
        page: payload.page,
        total_coupons: payload.count
      };
    case GET_COUPONS_ENDED:
      return {
        ...state,
        coupons_loading: false
      };
    case GET_ALL_COUPONS_STATED:
      return {
        ...state,
        all_coupons_loading: true,
        all_coupons: null
      };
    case GET_ALL_COUPONS:
      return {
        ...state,
        all_coupons: payload
      };
    case GET_ALL_COUPONS_ENDED:
      return {
        ...state,
        all_coupons_loading: false
      };

    case ADD_COUPON_STATED:
      return {
        ...state,
        coupon_message: null,
        add_coupon_loading: true
      };
    case ADD_COUPON:
      return {
        ...state,
        coupon_message: payload
      };
    case ADD_COUPON_ENDED:
      return {
        ...state,
        add_coupon_loading: false
      };
    case GET_COUPON_STATED:
      return {
        ...state,
        coupon: null,
        coupon_loading: true
      };
    case GET_COUPON:
      return {
        ...state,
        coupon: payload
      };
    case GET_COUPON_ENDED:
      return {
        ...state,
        coupon_loading: false
      };
    case EDIT_COUPON_STATED:
      return {
        ...state,
        coupon_message: null,
        edit_coupon_loading: true
      };
    case EDIT_COUPON:
      return {
        ...state,
        coupon_message: payload
      };
    case EDIT_COUPON_ENDED:
      return {
        ...state,
        edit_coupon_loading: false
      };

    default:
      return state;
  }
};
