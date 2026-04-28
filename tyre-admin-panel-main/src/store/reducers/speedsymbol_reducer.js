import {
  GET_SPEEDSYMBOLS_STATED,
  GET_SPEEDSYMBOLS,
  GET_SPEEDSYMBOLS_ENDED,
  ADD_SPEEDSYMBOL_STATED,
  ADD_SPEEDSYMBOL,
  ADD_SPEEDSYMBOL_ENDED,
  EDIT_SPEEDSYMBOL_STATED,
  EDIT_SPEEDSYMBOL,
  EDIT_SPEEDSYMBOL_ENDED,
  GET_SPEEDSYMBOL_STATED,
  GET_SPEEDSYMBOL,
  GET_SPEEDSYMBOL_ENDED,
  GET_ALL_SPEEDSYMBOLS_STATED,
  GET_ALL_SPEEDSYMBOLS,
  GET_ALL_SPEEDSYMBOLS_ENDED,
} from '../types/speedsymbol_type';

const initialState = {
  speedsymbols_loading: true,
  speedsymbols: null,
  page: null,
  pages: null,
  total_speedsymbols: 0,

  speedsymbol: null,
  speedsymbol_loading: null,

  loading: true,

  speedsymbol_message: null,
  all_speedsymbols: null,
  all_speedsymbols_loading: null,
  add_speedsymbol_loading: true,
  edit_speedsymbol_loading: true,
};

export const speedsymbol_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SPEEDSYMBOLS_STATED:
      return {
        ...state,
        speedsymbols: null,
        pages: null,
        page: null,
        total_speedsymbols: 0,
        speedsymbols_loading: true,
      };
    case GET_SPEEDSYMBOLS:
      return {
        ...state,
        speedsymbols: payload.speedSymbols,
        pages: payload.pages,
        page: payload.page,
        total_speedsymbols: payload.count,
      };
    case GET_SPEEDSYMBOLS_ENDED:
      return {
        ...state,
        speedsymbols_loading: false,
      };
    case GET_ALL_SPEEDSYMBOLS_STATED:
      return {
        ...state,
        all_speedsymbols_loading: true,
        all_speedsymbols: null,
      };
    case GET_ALL_SPEEDSYMBOLS:
      return {
        ...state,
        all_speedsymbols: payload,
      };
    case GET_ALL_SPEEDSYMBOLS_ENDED:
      return {
        ...state,
        all_speedsymbols_loading: false,
      };

    case ADD_SPEEDSYMBOL_STATED:
      return {
        ...state,
        speedsymbol_message: null,
        add_speedsymbol_loading: true,
      };
    case ADD_SPEEDSYMBOL:
      return {
        ...state,
        speedsymbol_message: payload,
      };
    case ADD_SPEEDSYMBOL_ENDED:
      return {
        ...state,
        add_speedsymbol_loading: false,
      };
    case GET_SPEEDSYMBOL_STATED:
      return {
        ...state,
        speedsymbol: null,
        speedsymbol_loading: true,
      };
    case GET_SPEEDSYMBOL:
      return {
        ...state,
        speedsymbol: payload,
      };
    case GET_SPEEDSYMBOL_ENDED:
      return {
        ...state,
        speedsymbol_loading: false,
      };
    case EDIT_SPEEDSYMBOL_STATED:
      return {
        ...state,
        speedsymbol_message: null,
        edit_speedsymbol_loading: true,
      };
    case EDIT_SPEEDSYMBOL:
      return {
        ...state,
        speedsymbol_message: payload,
      };
    case EDIT_SPEEDSYMBOL_ENDED:
      return {
        ...state,
        edit_speedsymbol_loading: false,
      };

    default:
      return state;
  }
};
