import {
  GET_SITEPAGES_STATED,
  GET_SITEPAGES,
  GET_SITEPAGES_ENDED,
  ADD_SITEPAGE_STATED,
  ADD_SITEPAGE,
  ADD_SITEPAGE_ENDED,
  EDIT_SITEPAGE_STATED,
  EDIT_SITEPAGE,
  EDIT_SITEPAGE_ENDED,
  GET_SITEPAGE_STATED,
  GET_SITEPAGE,
  GET_SITEPAGE_ENDED,
  GET_ALL_SITEPAGES_STATED,
  GET_ALL_SITEPAGES,
  GET_ALL_SITEPAGES_ENDED,
} from "../types/sitepage_type";

const initialState = {
  sitepages_loading: true,
  sitepages: null,
  page: null,
  pages: null,
  total_sitepages: 0,

  sitepage: null,
  sitepage_loading: null,

  loading: true,

  sitepage_message: null,
  all_sitepages: null,
  all_sitepages_loading: null,
  add_sitepage_loading: true,
  edit_sitepage_loading: true,
};

export const sitepage_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SITEPAGES_STATED:
      return {
        ...state,
        sitepages: null,
        pages: null,
        page: null,
        total_sitepages: 0,
        sitepages_loading: true,
      };
    case GET_SITEPAGES:
      return {
        ...state,
        sitepages: payload.pages,
        pages: payload.pages_count,
        page: payload.page,
        total_sitepages: payload.count,
      };
    case GET_SITEPAGES_ENDED:
      return {
        ...state,
        sitepages_loading: false,
      };
    case GET_ALL_SITEPAGES_STATED:
      return {
        ...state,
        all_sitepages_loading: true,
        all_sitepages: null,
      };
    case GET_ALL_SITEPAGES:
      return {
        ...state,
        all_sitepages: payload,
      };
    case GET_ALL_SITEPAGES_ENDED:
      return {
        ...state,
        all_sitepages_loading: false,
      };

    case ADD_SITEPAGE_STATED:
      return {
        ...state,
        sitepage_message: null,
        add_sitepage_loading: true,
      };
    case ADD_SITEPAGE:
      return {
        ...state,
        sitepage_message: payload,
      };
    case ADD_SITEPAGE_ENDED:
      return {
        ...state,
        add_sitepage_loading: false,
      };
    case GET_SITEPAGE_STATED:
      return {
        ...state,
        sitepage: null,
        sitepage_loading: true,
      };
    case GET_SITEPAGE:
      return {
        ...state,
        sitepage: payload,
      };
    case GET_SITEPAGE_ENDED:
      return {
        ...state,
        sitepage_loading: false,
      };
    case EDIT_SITEPAGE_STATED:
      return {
        ...state,
        sitepage_message: null,
        edit_sitepage_loading: true,
      };
    case EDIT_SITEPAGE:
      return {
        ...state,
        sitepage_message: payload,
      };
    case EDIT_SITEPAGE_ENDED:
      return {
        ...state,
        edit_sitepage_loading: false,
      };

    default:
      return state;
  }
};
