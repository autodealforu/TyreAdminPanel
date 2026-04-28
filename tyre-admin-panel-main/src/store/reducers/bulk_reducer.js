import {
  GET_BULKS_STATED,
  GET_BULKS,
  GET_BULKS_ENDED,
  ADD_BULK_STATED,
  ADD_BULK,
  ADD_BULK_ENDED,
  EDIT_BULK_STATED,
  EDIT_BULK,
  EDIT_BULK_ENDED,
  GET_BULK_STATED,
  GET_BULK,
  GET_BULK_ENDED,
  GET_ALL_BULKS_STATED,
  GET_ALL_BULKS,
  GET_ALL_BULKS_ENDED
} from "../types/bulk_type";

const initialState = {
  bulks_loading: true,
  bulks: null,
  page: null,
  pages: null,
  total_bulks: 0,

  bulk: null,
  bulk_loading: null,

  loading: true,

  bulk_message: null,
  all_bulks: null,
  all_bulks_loading: null,
  add_bulk_loading: true,
  edit_bulk_loading: true
};

export const bulk_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BULKS_STATED:
      return {
        ...state,
        bulks: null,
        pages: null,
        page: null,
        total_bulks: 0,
        bulks_loading: true
      };
    case GET_BULKS:
      return {
        ...state,
        bulks: payload.bulks,
        pages: payload.pages,
        page: payload.page,
        total_bulks: payload.total_bulks
      };
    case GET_BULKS_ENDED:
      return {
        ...state,
        bulks_loading: false
      };
    case GET_ALL_BULKS_STATED:
      return {
        ...state,
        all_bulks_loading: true,
        all_bulks: null
      };
    case GET_ALL_BULKS:
      return {
        ...state,
        all_bulks: payload
      };
    case GET_ALL_BULKS_ENDED:
      return {
        ...state,
        all_bulks_loading: false
      };

    case ADD_BULK_STATED:
      return {
        ...state,
        bulk_message: null,
        add_bulk_loading: true
      };
    case ADD_BULK:
      return {
        ...state,
        bulk_message: payload
      };
    case ADD_BULK_ENDED:
      return {
        ...state,
        add_bulk_loading: false
      };
    case GET_BULK_STATED:
      return {
        ...state,
        bulk: null,
        bulk_loading: true
      };
    case GET_BULK:
      return {
        ...state,
        bulk: payload
      };
    case GET_BULK_ENDED:
      return {
        ...state,
        bulk_loading: false
      };
    case EDIT_BULK_STATED:
      return {
        ...state,
        bulk_message: null,
        edit_bulk_loading: true
      };
    case EDIT_BULK:
      return {
        ...state,
        bulk_message: payload
      };
    case EDIT_BULK_ENDED:
      return {
        ...state,
        edit_bulk_loading: false
      };

    default:
      return state;
  }
};
