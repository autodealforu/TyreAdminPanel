import {
  GET_MAKEMODELS_STATED,
  GET_MAKEMODELS,
  GET_MAKEMODELS_ENDED,
  ADD_MAKEMODEL_STATED,
  ADD_MAKEMODEL,
  ADD_MAKEMODEL_ENDED,
  EDIT_MAKEMODEL_STATED,
  EDIT_MAKEMODEL,
  EDIT_MAKEMODEL_ENDED,
  GET_MAKEMODEL_STATED,
  GET_MAKEMODEL,
  GET_MAKEMODEL_ENDED,
  GET_ALL_MAKEMODELS_STATED,
  GET_ALL_MAKEMODELS,
  GET_ALL_MAKEMODELS_ENDED,
} from '../types/makemodel_type';

const initialState = {
  makemodels_loading: true,
  makemodels: null,
  page: null,
  pages: null,
  total_makemodels: 0,

  makemodel: null,
  makemodel_loading: null,

  loading: true,

  makemodel_message: null,
  all_makemodels: null,
  all_makemodels_loading: null,
  add_makemodel_loading: true,
  edit_makemodel_loading: true,
};

export const makemodel_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MAKEMODELS_STATED:
      return {
        ...state,
        makemodels: null,
        pages: null,
        page: null,
        total_makemodels: 0,
        makemodels_loading: true,
      };
    case GET_MAKEMODELS:
      return {
        ...state,
        makemodels: payload.makemodels,
        pages: payload.pages,
        page: payload.page,
        total_makemodels: payload.count,
      };
    case GET_MAKEMODELS_ENDED:
      return {
        ...state,
        makemodels_loading: false,
      };
    case GET_ALL_MAKEMODELS_STATED:
      return {
        ...state,
        all_makemodels_loading: true,
        all_makemodels: null,
      };
    case GET_ALL_MAKEMODELS:
      return {
        ...state,
        all_makemodels: payload,
      };
    case GET_ALL_MAKEMODELS_ENDED:
      return {
        ...state,
        all_makemodels_loading: false,
      };

    case ADD_MAKEMODEL_STATED:
      return {
        ...state,
        makemodel_message: null,
        add_makemodel_loading: true,
      };
    case ADD_MAKEMODEL:
      return {
        ...state,
        makemodel_message: payload,
      };
    case ADD_MAKEMODEL_ENDED:
      return {
        ...state,
        add_makemodel_loading: false,
      };
    case GET_MAKEMODEL_STATED:
      return {
        ...state,
        makemodel: null,
        makemodel_loading: true,
      };
    case GET_MAKEMODEL:
      return {
        ...state,
        makemodel: payload,
      };
    case GET_MAKEMODEL_ENDED:
      return {
        ...state,
        makemodel_loading: false,
      };
    case EDIT_MAKEMODEL_STATED:
      return {
        ...state,
        makemodel_message: null,
        edit_makemodel_loading: true,
      };
    case EDIT_MAKEMODEL:
      return {
        ...state,
        makemodel_message: payload,
      };
    case EDIT_MAKEMODEL_ENDED:
      return {
        ...state,
        edit_makemodel_loading: false,
      };

    default:
      return state;
  }
};
