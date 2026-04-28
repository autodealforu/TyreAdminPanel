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
  GET_ALL_CUSTOMERS_ENDED
} from "../types/customer_type";

const initialState = {
  customers_loading: true,
  customers: null,
  page: null,
  pages: null,
  total_customers: 0,

  customer: null,
  customer_loading: null,

  loading: true,

  customer_message: null,
  all_customers: null,
  all_customers_loading: null,
  add_customer_loading: true,
  edit_customer_loading: true
};

export const customer_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMERS_STATED:
      return {
        ...state,
        customers: null,
        pages: null,
        page: null,
        total_customers: 0,
        customers_loading: true
      };
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: payload.customers,
        pages: payload.pages,
        page: payload.page,
        total_customers: payload.count
      };
    case GET_CUSTOMERS_ENDED:
      return {
        ...state,
        customers_loading: false
      };
    case GET_ALL_CUSTOMERS_STATED:
      return {
        ...state,
        all_customers_loading: true,
        all_customers: null
      };
    case GET_ALL_CUSTOMERS:
      return {
        ...state,
        all_customers: payload
      };
    case GET_ALL_CUSTOMERS_ENDED:
      return {
        ...state,
        all_customers_loading: false
      };

    case ADD_CUSTOMER_STATED:
      return {
        ...state,
        customer_message: null,
        add_customer_loading: true
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        customer_message: payload
      };
    case ADD_CUSTOMER_ENDED:
      return {
        ...state,
        add_customer_loading: false
      };
    case GET_CUSTOMER_STATED:
      return {
        ...state,
        customer: null,
        customer_loading: true
      };
    case GET_CUSTOMER:
      return {
        ...state,
        customer: payload
      };
    case GET_CUSTOMER_ENDED:
      return {
        ...state,
        customer_loading: false
      };
    case EDIT_CUSTOMER_STATED:
      return {
        ...state,
        customer_message: null,
        edit_customer_loading: true
      };
    case EDIT_CUSTOMER:
      return {
        ...state,
        customer_message: payload
      };
    case EDIT_CUSTOMER_ENDED:
      return {
        ...state,
        edit_customer_loading: false
      };

    default:
      return state;
  }
};
