import {
  GET_TYREWIDTHS_STATED,
  GET_TYREWIDTHS,
  GET_TYREWIDTHS_ENDED,
  ADD_TYREWIDTH_STATED,
  ADD_TYREWIDTH,
  ADD_TYREWIDTH_ENDED,
  EDIT_TYREWIDTH_STATED,
  EDIT_TYREWIDTH,
  EDIT_TYREWIDTH_ENDED,
  GET_TYREWIDTH_STATED,
  GET_TYREWIDTH,
  GET_TYREWIDTH_ENDED,
  GET_ALL_TYREWIDTHS_STATED,
  GET_ALL_TYREWIDTHS,
  GET_ALL_TYREWIDTHS_ENDED,
} from '../types/tyrewidth_type';

const initialState = {
  tyrewidths_loading: true,
  tyrewidths: null,
  page: null,
  pages: null,
  total_tyrewidths: 0,

  tyrewidth: null,
  tyrewidth_loading: null,

  loading: true,

  tyrewidth_message: null,
  all_tyrewidths: null,
  all_tyrewidths_loading: null,
  add_tyrewidth_loading: true,
  edit_tyrewidth_loading: true,
};

export const tyrewidth_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TYREWIDTHS_STATED:
      return {
        ...state,
        tyrewidths: null,
        pages: null,
        page: null,
        total_tyrewidths: 0,
        tyrewidths_loading: true,
      };
    case GET_TYREWIDTHS:
      return {
        ...state,
        tyrewidths: payload.tyreWidths,
        pages: payload.pages,
        page: payload.page,
        total_tyrewidths: payload.count,
      };
    case GET_TYREWIDTHS_ENDED:
      return {
        ...state,
        tyrewidths_loading: false,
      };
    case GET_ALL_TYREWIDTHS_STATED:
      return {
        ...state,
        all_tyrewidths_loading: true,
        all_tyrewidths: null,
      };
    case GET_ALL_TYREWIDTHS:
      return {
        ...state,
        all_tyrewidths: payload,
      };
    case GET_ALL_TYREWIDTHS_ENDED:
      return {
        ...state,
        all_tyrewidths_loading: false,
      };

    case ADD_TYREWIDTH_STATED:
      return {
        ...state,
        tyrewidth_message: null,
        add_tyrewidth_loading: true,
      };
    case ADD_TYREWIDTH:
      return {
        ...state,
        tyrewidth_message: payload,
      };
    case ADD_TYREWIDTH_ENDED:
      return {
        ...state,
        add_tyrewidth_loading: false,
      };
    case GET_TYREWIDTH_STATED:
      return {
        ...state,
        tyrewidth: null,
        tyrewidth_loading: true,
      };
    case GET_TYREWIDTH:
      return {
        ...state,
        tyrewidth: payload,
      };
    case GET_TYREWIDTH_ENDED:
      return {
        ...state,
        tyrewidth_loading: false,
      };
    case EDIT_TYREWIDTH_STATED:
      return {
        ...state,
        tyrewidth_message: null,
        edit_tyrewidth_loading: true,
      };
    case EDIT_TYREWIDTH:
      return {
        ...state,
        tyrewidth_message: payload,
      };
    case EDIT_TYREWIDTH_ENDED:
      return {
        ...state,
        edit_tyrewidth_loading: false,
      };

    default:
      return state;
  }
};
