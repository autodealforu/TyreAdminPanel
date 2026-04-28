import {
  GET_TYRES_STATED,
  GET_TYRES,
  GET_TYRES_ENDED,
  ADD_TYRE_STATED,
  ADD_TYRE,
  ADD_TYRE_ENDED,
  EDIT_TYRE_STATED,
  EDIT_TYRE,
  EDIT_TYRE_ENDED,
  GET_TYRE_STATED,
  GET_TYRE,
  GET_TYRE_ENDED,
  GET_ALL_TYRES_STATED,
  GET_ALL_TYRES,
  GET_ALL_TYRES_ENDED,
} from '../types/tyre_type';

const initialState = {
  tyres_loading: true,
  tyres: null,
  page: null,
  pages: null,
  total_tyres: 0,

  tyre: null,
  tyre_loading: null,

  loading: true,

  tyre_message: null,
  all_tyres: null,
  all_tyres_loading: null,
  add_tyre_loading: true,
  edit_tyre_loading: true,
};

export const tyre_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TYRES_STATED:
      return {
        ...state,
        tyres: null,
        pages: null,
        page: null,
        total_tyres: 0,
        tyres_loading: true,
      };
    case GET_TYRES:
      return {
        ...state,
        tyres: payload.tyres,
        pages: payload.pages,
        page: payload.page,
        total_tyres: payload.count,
      };
    case GET_TYRES_ENDED:
      return {
        ...state,
        tyres_loading: false,
      };
    case GET_ALL_TYRES_STATED:
      return {
        ...state,
        all_tyres_loading: true,
        all_tyres: null,
      };
    case GET_ALL_TYRES:
      return {
        ...state,
        all_tyres: payload,
      };
    case GET_ALL_TYRES_ENDED:
      return {
        ...state,
        all_tyres_loading: false,
      };

    case ADD_TYRE_STATED:
      return {
        ...state,
        tyre_message: null,
        add_tyre_loading: true,
      };
    case ADD_TYRE:
      return {
        ...state,
        tyre_message: payload,
      };
    case ADD_TYRE_ENDED:
      return {
        ...state,
        add_tyre_loading: false,
      };
    case GET_TYRE_STATED:
      return {
        ...state,
        tyre: null,
        tyre_loading: true,
      };
    case GET_TYRE:
      return {
        ...state,
        tyre: payload,
      };
    case GET_TYRE_ENDED:
      return {
        ...state,
        tyre_loading: false,
      };
    case EDIT_TYRE_STATED:
      return {
        ...state,
        tyre_message: null,
        edit_tyre_loading: true,
      };
    case EDIT_TYRE:
      return {
        ...state,
        tyre_message: payload,
      };
    case EDIT_TYRE_ENDED:
      return {
        ...state,
        edit_tyre_loading: false,
      };

    default:
      return state;
  }
};
