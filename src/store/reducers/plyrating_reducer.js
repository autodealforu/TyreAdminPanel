import {
  GET_PLYRATINGS_STATED,
  GET_PLYRATINGS,
  GET_PLYRATINGS_ENDED,
  ADD_PLYRATING_STATED,
  ADD_PLYRATING,
  ADD_PLYRATING_ENDED,
  EDIT_PLYRATING_STATED,
  EDIT_PLYRATING,
  EDIT_PLYRATING_ENDED,
  GET_PLYRATING_STATED,
  GET_PLYRATING,
  GET_PLYRATING_ENDED,
  GET_ALL_PLYRATINGS_STATED,
  GET_ALL_PLYRATINGS,
  GET_ALL_PLYRATINGS_ENDED,
} from '../types/plyrating_type';

const initialState = {
  plyratings_loading: true,
  plyratings: null,
  page: null,
  pages: null,
  total_plyratings: 0,

  plyrating: null,
  plyrating_loading: null,

  loading: true,

  plyrating_message: null,
  all_plyratings: null,
  all_plyratings_loading: null,
  add_plyrating_loading: true,
  edit_plyrating_loading: true,
};

export const plyrating_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PLYRATINGS_STATED:
      return {
        ...state,
        plyratings: null,
        pages: null,
        page: null,
        total_plyratings: 0,
        plyratings_loading: true,
      };
    case GET_PLYRATINGS:
      return {
        ...state,
        plyratings: payload.plyRatings,
        pages: payload.pages,
        page: payload.page,
        total_plyratings: payload.count,
      };
    case GET_PLYRATINGS_ENDED:
      return {
        ...state,
        plyratings_loading: false,
      };
    case GET_ALL_PLYRATINGS_STATED:
      return {
        ...state,
        all_plyratings_loading: true,
        all_plyratings: null,
      };
    case GET_ALL_PLYRATINGS:
      return {
        ...state,
        all_plyratings: payload,
      };
    case GET_ALL_PLYRATINGS_ENDED:
      return {
        ...state,
        all_plyratings_loading: false,
      };

    case ADD_PLYRATING_STATED:
      return {
        ...state,
        plyrating_message: null,
        add_plyrating_loading: true,
      };
    case ADD_PLYRATING:
      return {
        ...state,
        plyrating_message: payload,
      };
    case ADD_PLYRATING_ENDED:
      return {
        ...state,
        add_plyrating_loading: false,
      };
    case GET_PLYRATING_STATED:
      return {
        ...state,
        plyrating: null,
        plyrating_loading: true,
      };
    case GET_PLYRATING:
      return {
        ...state,
        plyrating: payload,
      };
    case GET_PLYRATING_ENDED:
      return {
        ...state,
        plyrating_loading: false,
      };
    case EDIT_PLYRATING_STATED:
      return {
        ...state,
        plyrating_message: null,
        edit_plyrating_loading: true,
      };
    case EDIT_PLYRATING:
      return {
        ...state,
        plyrating_message: payload,
      };
    case EDIT_PLYRATING_ENDED:
      return {
        ...state,
        edit_plyrating_loading: false,
      };

    default:
      return state;
  }
};
