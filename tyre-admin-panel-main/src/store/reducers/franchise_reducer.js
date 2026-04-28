import {
  GET_FRANCHISES_STATED,
  GET_FRANCHISES,
  GET_FRANCHISES_ENDED,
  ADD_FRANCHISE_STATED,
  ADD_FRANCHISE,
  ADD_FRANCHISE_ENDED,
  EDIT_FRANCHISE_STATED,
  EDIT_FRANCHISE,
  EDIT_FRANCHISE_ENDED,
  GET_FRANCHISE_STATED,
  GET_FRANCHISE,
  GET_FRANCHISE_ENDED,
  GET_ALL_FRANCHISES_STATED,
  GET_ALL_FRANCHISES,
  GET_ALL_FRANCHISES_ENDED
} from "../types/franchise_type";

const initialState = {
  franchises_loading: true,
  franchises: null,
  page: null,
  pages: null,
  total_franchises: 0,

  franchise: null,
  franchise_loading: null,

  loading: true,

  franchise_message: null,
  all_franchises: null,
  all_franchises_loading: null,
  add_franchise_loading: true,
  edit_franchise_loading: true
};

export const franchise_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FRANCHISES_STATED:
      return {
        ...state,
        franchises: null,
        pages: null,
        page: null,
        total_franchises: 0,
        franchises_loading: true
      };
    case GET_FRANCHISES:
      return {
        ...state,
        franchises: payload.franchises,
        pages: payload.pages,
        page: payload.page,
        total_franchises: payload.total_franchises
      };
    case GET_FRANCHISES_ENDED:
      return {
        ...state,
        franchises_loading: false
      };
    case GET_ALL_FRANCHISES_STATED:
      return {
        ...state,
        all_franchises_loading: true,
        all_franchises: null
      };
    case GET_ALL_FRANCHISES:
      return {
        ...state,
        all_franchises: payload
      };
    case GET_ALL_FRANCHISES_ENDED:
      return {
        ...state,
        all_franchises_loading: false
      };

    case ADD_FRANCHISE_STATED:
      return {
        ...state,
        franchise_message: null,
        add_franchise_loading: true
      };
    case ADD_FRANCHISE:
      return {
        ...state,
        franchise_message: payload
      };
    case ADD_FRANCHISE_ENDED:
      return {
        ...state,
        add_franchise_loading: false
      };
    case GET_FRANCHISE_STATED:
      return {
        ...state,
        franchise: null,
        franchise_loading: true
      };
    case GET_FRANCHISE:
      return {
        ...state,
        franchise: payload
      };
    case GET_FRANCHISE_ENDED:
      return {
        ...state,
        franchise_loading: false
      };
    case EDIT_FRANCHISE_STATED:
      return {
        ...state,
        franchise_message: null,
        edit_franchise_loading: true
      };
    case EDIT_FRANCHISE:
      return {
        ...state,
        franchise_message: payload
      };
    case EDIT_FRANCHISE_ENDED:
      return {
        ...state,
        edit_franchise_loading: false
      };

    default:
      return state;
  }
};
