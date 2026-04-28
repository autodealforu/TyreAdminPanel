import {
  GET_ASPECTRATIOS_STATED,
  GET_ASPECTRATIOS,
  GET_ASPECTRATIOS_ENDED,
  ADD_ASPECTRATIO_STATED,
  ADD_ASPECTRATIO,
  ADD_ASPECTRATIO_ENDED,
  EDIT_ASPECTRATIO_STATED,
  EDIT_ASPECTRATIO,
  EDIT_ASPECTRATIO_ENDED,
  GET_ASPECTRATIO_STATED,
  GET_ASPECTRATIO,
  GET_ASPECTRATIO_ENDED,
  GET_ALL_ASPECTRATIOS_STATED,
  GET_ALL_ASPECTRATIOS,
  GET_ALL_ASPECTRATIOS_ENDED,
} from '../types/aspectratio_type';

const initialState = {
  aspectratios_loading: true,
  aspectratios: null,
  page: null,
  pages: null,
  total_aspectratios: 0,

  aspectratio: null,
  aspectratio_loading: null,

  loading: true,

  aspectratio_message: null,
  all_aspectratios: null,
  all_aspectratios_loading: null,
  add_aspectratio_loading: true,
  edit_aspectratio_loading: true,
};

export const aspectratio_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ASPECTRATIOS_STATED:
      return {
        ...state,
        aspectratios: null,
        pages: null,
        page: null,
        total_aspectratios: 0,
        aspectratios_loading: true,
      };
    case GET_ASPECTRATIOS:
      return {
        ...state,
        aspectratios: payload.aspectRatios,
        pages: payload.pages,
        page: payload.page,
        total_aspectratios: payload.count,
      };
    case GET_ASPECTRATIOS_ENDED:
      return {
        ...state,
        aspectratios_loading: false,
      };
    case GET_ALL_ASPECTRATIOS_STATED:
      return {
        ...state,
        all_aspectratios_loading: true,
        all_aspectratios: null,
      };
    case GET_ALL_ASPECTRATIOS:
      return {
        ...state,
        all_aspectratios: payload,
      };
    case GET_ALL_ASPECTRATIOS_ENDED:
      return {
        ...state,
        all_aspectratios_loading: false,
      };

    case ADD_ASPECTRATIO_STATED:
      return {
        ...state,
        aspectratio_message: null,
        add_aspectratio_loading: true,
      };
    case ADD_ASPECTRATIO:
      return {
        ...state,
        aspectratio_message: payload,
      };
    case ADD_ASPECTRATIO_ENDED:
      return {
        ...state,
        add_aspectratio_loading: false,
      };
    case GET_ASPECTRATIO_STATED:
      return {
        ...state,
        aspectratio: null,
        aspectratio_loading: true,
      };
    case GET_ASPECTRATIO:
      return {
        ...state,
        aspectratio: payload,
      };
    case GET_ASPECTRATIO_ENDED:
      return {
        ...state,
        aspectratio_loading: false,
      };
    case EDIT_ASPECTRATIO_STATED:
      return {
        ...state,
        aspectratio_message: null,
        edit_aspectratio_loading: true,
      };
    case EDIT_ASPECTRATIO:
      return {
        ...state,
        aspectratio_message: payload,
      };
    case EDIT_ASPECTRATIO_ENDED:
      return {
        ...state,
        edit_aspectratio_loading: false,
      };

    default:
      return state;
  }
};
