import {
  GET_THREADPATTERNS_STATED,
  GET_THREADPATTERNS,
  GET_THREADPATTERNS_ENDED,
  ADD_THREADPATTERN_STATED,
  ADD_THREADPATTERN,
  ADD_THREADPATTERN_ENDED,
  EDIT_THREADPATTERN_STATED,
  EDIT_THREADPATTERN,
  EDIT_THREADPATTERN_ENDED,
  GET_THREADPATTERN_STATED,
  GET_THREADPATTERN,
  GET_THREADPATTERN_ENDED,
  GET_ALL_THREADPATTERNS_STATED,
  GET_ALL_THREADPATTERNS,
  GET_ALL_THREADPATTERNS_ENDED,
} from '../types/threadpattern_type';

const initialState = {
  threadpatterns_loading: true,
  threadpatterns: null,
  page: null,
  pages: null,
  total_threadpatterns: 0,

  threadpattern: null,
  threadpattern_loading: null,

  loading: true,

  threadpattern_message: null,
  all_threadpatterns: null,
  all_threadpatterns_loading: null,
  add_threadpattern_loading: true,
  edit_threadpattern_loading: true,
};

export const threadpattern_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_THREADPATTERNS_STATED:
      return {
        ...state,
        threadpatterns: null,
        pages: null,
        page: null,
        total_threadpatterns: 0,
        threadpatterns_loading: true,
      };
    case GET_THREADPATTERNS:
      return {
        ...state,
        threadpatterns: payload.threadPatterns,
        pages: payload.pages,
        page: payload.page,
        total_threadpatterns: payload.count,
      };
    case GET_THREADPATTERNS_ENDED:
      return {
        ...state,
        threadpatterns_loading: false,
      };
    case GET_ALL_THREADPATTERNS_STATED:
      return {
        ...state,
        all_threadpatterns_loading: true,
        all_threadpatterns: null,
      };
    case GET_ALL_THREADPATTERNS:
      return {
        ...state,
        all_threadpatterns: payload,
      };
    case GET_ALL_THREADPATTERNS_ENDED:
      return {
        ...state,
        all_threadpatterns_loading: false,
      };

    case ADD_THREADPATTERN_STATED:
      return {
        ...state,
        threadpattern_message: null,
        add_threadpattern_loading: true,
      };
    case ADD_THREADPATTERN:
      return {
        ...state,
        threadpattern_message: payload,
      };
    case ADD_THREADPATTERN_ENDED:
      return {
        ...state,
        add_threadpattern_loading: false,
      };
    case GET_THREADPATTERN_STATED:
      return {
        ...state,
        threadpattern: null,
        threadpattern_loading: true,
      };
    case GET_THREADPATTERN:
      return {
        ...state,
        threadpattern: payload,
      };
    case GET_THREADPATTERN_ENDED:
      return {
        ...state,
        threadpattern_loading: false,
      };
    case EDIT_THREADPATTERN_STATED:
      return {
        ...state,
        threadpattern_message: null,
        edit_threadpattern_loading: true,
      };
    case EDIT_THREADPATTERN:
      return {
        ...state,
        threadpattern_message: payload,
      };
    case EDIT_THREADPATTERN_ENDED:
      return {
        ...state,
        edit_threadpattern_loading: false,
      };

    default:
      return state;
  }
};
