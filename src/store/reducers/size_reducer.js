import {
  GET_SIZES_STATED,
  GET_SIZES,
  GET_SIZES_ENDED,
  ADD_SIZE_STATED,
  ADD_SIZE,
  ADD_SIZE_ENDED,
  EDIT_SIZE_STATED,
  EDIT_SIZE,
  EDIT_SIZE_ENDED,
  GET_SIZE_STATED,
  GET_SIZE,
  GET_SIZE_ENDED,
  GET_ALL_SIZES_STATED,
  GET_ALL_SIZES,
  GET_ALL_SIZES_ENDED,
} from '../types/size_type';

const initialState = {
  sizes_loading: true,
  sizes: null,
  page: null,
  pages: null,
  total_sizes: 0,

  size: null,
  size_loading: null,

  loading: true,

  size_message: null,
  all_sizes: null,
  all_sizes_loading: null,
  add_size_loading: true,
  edit_size_loading: true,
};

export const size_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SIZES_STATED:
      return {
        ...state,
        sizes: null,
        pages: null,
        page: null,
        total_sizes: 0,
        sizes_loading: true,
      };
    case GET_SIZES:
      return {
        ...state,
        sizes: payload.sizes,
        pages: payload.pages,
        page: payload.page,
        total_sizes: payload.count,
      };
    case GET_SIZES_ENDED:
      return {
        ...state,
        sizes_loading: false,
      };
    case GET_ALL_SIZES_STATED:
      return {
        ...state,
        all_sizes_loading: true,
        all_sizes: null,
      };
    case GET_ALL_SIZES:
      return {
        ...state,
        all_sizes: payload,
      };
    case GET_ALL_SIZES_ENDED:
      return {
        ...state,
        all_sizes_loading: false,
      };

    case ADD_SIZE_STATED:
      return {
        ...state,
        size_message: null,
        add_size_loading: true,
      };
    case ADD_SIZE:
      return {
        ...state,
        size_message: payload,
      };
    case ADD_SIZE_ENDED:
      return {
        ...state,
        add_size_loading: false,
      };
    case GET_SIZE_STATED:
      return {
        ...state,
        size: null,
        size_loading: true,
      };
    case GET_SIZE:
      return {
        ...state,
        size: payload,
      };
    case GET_SIZE_ENDED:
      return {
        ...state,
        size_loading: false,
      };
    case EDIT_SIZE_STATED:
      return {
        ...state,
        size_message: null,
        edit_size_loading: true,
      };
    case EDIT_SIZE:
      return {
        ...state,
        size_message: payload,
      };
    case EDIT_SIZE_ENDED:
      return {
        ...state,
        edit_size_loading: false,
      };

    default:
      return state;
  }
};
