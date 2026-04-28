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
  GET_ALL_ORDERS_ENDED
} from "../types/order_type";

const initialState = {
  orders_loading: true,
  orders: null,
  page: null,
  pages: null,
  total_orders: 0,

  order: null,
  order_loading: null,

  loading: true,

  order_message: null,
  all_orders: null,
  all_orders_loading: null,
  add_order_loading: true,
  edit_order_loading: true
};

export const order_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDERS_STATED:
      return {
        ...state,
        orders: null,
        pages: null,
        page: null,
        total_orders: 0,
        orders_loading: true
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: payload.orders,
        pages: payload.pages,
        page: payload.page,
        total_orders: payload.count
      };
    case GET_ORDERS_ENDED:
      return {
        ...state,
        orders_loading: false
      };
    case GET_ALL_ORDERS_STATED:
      return {
        ...state,
        all_orders_loading: true,
        all_orders: null
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        all_orders: payload
      };
    case GET_ALL_ORDERS_ENDED:
      return {
        ...state,
        all_orders_loading: false
      };

    case ADD_ORDER_STATED:
      return {
        ...state,
        order_message: null,
        add_order_loading: true
      };
    case ADD_ORDER:
      return {
        ...state,
        order_message: payload
      };
    case ADD_ORDER_ENDED:
      return {
        ...state,
        add_order_loading: false
      };
    case GET_ORDER_STATED:
      return {
        ...state,
        order: null,
        order_loading: true
      };
    case GET_ORDER:
      return {
        ...state,
        order: payload
      };
    case GET_ORDER_ENDED:
      return {
        ...state,
        order_loading: false
      };
    case EDIT_ORDER_STATED:
      return {
        ...state,
        order_message: null,
        edit_order_loading: true
      };
    case EDIT_ORDER:
      return {
        ...state,
        order_message: payload
      };
    case EDIT_ORDER_ENDED:
      return {
        ...state,
        edit_order_loading: false
      };

    default:
      return state;
  }
};
