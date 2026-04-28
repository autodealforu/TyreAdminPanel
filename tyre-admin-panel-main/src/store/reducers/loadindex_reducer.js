import {
  GET_LOADINDEXS_STATED,
  GET_LOADINDEXS,
  GET_LOADINDEXS_ENDED,
  ADD_LOADINDEX_STATED,
  ADD_LOADINDEX,
  ADD_LOADINDEX_ENDED,
  EDIT_LOADINDEX_STATED,
  EDIT_LOADINDEX,
  EDIT_LOADINDEX_ENDED,
  GET_LOADINDEX_STATED,
  GET_LOADINDEX,
  GET_LOADINDEX_ENDED,
  GET_ALL_LOADINDEXS_STATED,
  GET_ALL_LOADINDEXS,
  GET_ALL_LOADINDEXS_ENDED,
} from '../types/loadindex_type';

const initialState = {
  loadindexs_loading: true,
  loadindexs: null,
  page: null,
  pages: null,
  total_loadindexs: 0,

  loadindex: null,
  loadindex_loading: null,

  loading: true,

  loadindex_message: null,
  all_loadindexs: null,
  all_loadindexs_loading: null,
  add_loadindex_loading: true,
  edit_loadindex_loading: true,
};

export const loadindex_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_LOADINDEXS_STATED:
      return {
        ...state,
        loadindexs: null,
        pages: null,
        page: null,
        total_loadindexs: 0,
        loadindexs_loading: true,
      };
    case GET_LOADINDEXS:
      return {
        ...state,
        loadindexs: payload.loadIndexes,
        pages: payload.pages,
        page: payload.page,
        total_loadindexs: payload.count,
      };
    case GET_LOADINDEXS_ENDED:
      return {
        ...state,
        loadindexs_loading: false,
      };
    case GET_ALL_LOADINDEXS_STATED:
      return {
        ...state,
        all_loadindexs_loading: true,
        all_loadindexs: null,
      };
    case GET_ALL_LOADINDEXS:
      return {
        ...state,
        all_loadindexs: payload,
      };
    case GET_ALL_LOADINDEXS_ENDED:
      return {
        ...state,
        all_loadindexs_loading: false,
      };

    case ADD_LOADINDEX_STATED:
      return {
        ...state,
        loadindex_message: null,
        add_loadindex_loading: true,
      };
    case ADD_LOADINDEX:
      return {
        ...state,
        loadindex_message: payload,
      };
    case ADD_LOADINDEX_ENDED:
      return {
        ...state,
        add_loadindex_loading: false,
      };
    case GET_LOADINDEX_STATED:
      return {
        ...state,
        loadindex: null,
        loadindex_loading: true,
      };
    case GET_LOADINDEX:
      return {
        ...state,
        loadindex: payload,
      };
    case GET_LOADINDEX_ENDED:
      return {
        ...state,
        loadindex_loading: false,
      };
    case EDIT_LOADINDEX_STATED:
      return {
        ...state,
        loadindex_message: null,
        edit_loadindex_loading: true,
      };
    case EDIT_LOADINDEX:
      return {
        ...state,
        loadindex_message: payload,
      };
    case EDIT_LOADINDEX_ENDED:
      return {
        ...state,
        edit_loadindex_loading: false,
      };

    default:
      return state;
  }
};
