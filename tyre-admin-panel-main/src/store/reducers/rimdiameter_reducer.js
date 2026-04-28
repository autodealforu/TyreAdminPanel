import {
  GET_RIMDIAMETERS_STATED,
  GET_RIMDIAMETERS,
  GET_RIMDIAMETERS_ENDED,
  ADD_RIMDIAMETER_STATED,
  ADD_RIMDIAMETER,
  ADD_RIMDIAMETER_ENDED,
  EDIT_RIMDIAMETER_STATED,
  EDIT_RIMDIAMETER,
  EDIT_RIMDIAMETER_ENDED,
  GET_RIMDIAMETER_STATED,
  GET_RIMDIAMETER,
  GET_RIMDIAMETER_ENDED,
  GET_ALL_RIMDIAMETERS_STATED,
  GET_ALL_RIMDIAMETERS,
  GET_ALL_RIMDIAMETERS_ENDED,
} from '../types/rimdiameter_type';

const initialState = {
  rimdiameters_loading: true,
  rimdiameters: null,
  page: null,
  pages: null,
  total_rimdiameters: 0,

  rimdiameter: null,
  rimdiameter_loading: null,

  loading: true,

  rimdiameter_message: null,
  all_rimdiameters: null,
  all_rimdiameters_loading: null,
  add_rimdiameter_loading: true,
  edit_rimdiameter_loading: true,
};

export const rimdiameter_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_RIMDIAMETERS_STATED:
      return {
        ...state,
        rimdiameters: null,
        pages: null,
        page: null,
        total_rimdiameters: 0,
        rimdiameters_loading: true,
      };
    case GET_RIMDIAMETERS:
      return {
        ...state,
        rimdiameters: payload.rimDiameters,
        pages: payload.pages,
        page: payload.page,
        total_rimdiameters: payload.count,
      };
    case GET_RIMDIAMETERS_ENDED:
      return {
        ...state,
        rimdiameters_loading: false,
      };
    case GET_ALL_RIMDIAMETERS_STATED:
      return {
        ...state,
        all_rimdiameters_loading: true,
        all_rimdiameters: null,
      };
    case GET_ALL_RIMDIAMETERS:
      return {
        ...state,
        all_rimdiameters: payload,
      };
    case GET_ALL_RIMDIAMETERS_ENDED:
      return {
        ...state,
        all_rimdiameters_loading: false,
      };

    case ADD_RIMDIAMETER_STATED:
      return {
        ...state,
        rimdiameter_message: null,
        add_rimdiameter_loading: true,
      };
    case ADD_RIMDIAMETER:
      return {
        ...state,
        rimdiameter_message: payload,
      };
    case ADD_RIMDIAMETER_ENDED:
      return {
        ...state,
        add_rimdiameter_loading: false,
      };
    case GET_RIMDIAMETER_STATED:
      return {
        ...state,
        rimdiameter: null,
        rimdiameter_loading: true,
      };
    case GET_RIMDIAMETER:
      return {
        ...state,
        rimdiameter: payload,
      };
    case GET_RIMDIAMETER_ENDED:
      return {
        ...state,
        rimdiameter_loading: false,
      };
    case EDIT_RIMDIAMETER_STATED:
      return {
        ...state,
        rimdiameter_message: null,
        edit_rimdiameter_loading: true,
      };
    case EDIT_RIMDIAMETER:
      return {
        ...state,
        rimdiameter_message: payload,
      };
    case EDIT_RIMDIAMETER_ENDED:
      return {
        ...state,
        edit_rimdiameter_loading: false,
      };

    default:
      return state;
  }
};
