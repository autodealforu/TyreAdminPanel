import {
  GET_BANNERS_STATED,
  GET_BANNERS,
  GET_BANNERS_ENDED,
  ADD_BANNER_STATED,
  ADD_BANNER,
  ADD_BANNER_ENDED,
  EDIT_BANNER_STATED,
  EDIT_BANNER,
  EDIT_BANNER_ENDED,
  GET_BANNER_STATED,
  GET_BANNER,
  GET_BANNER_ENDED,
  GET_ALL_BANNERS_STATED,
  GET_ALL_BANNERS,
  GET_ALL_BANNERS_ENDED
} from "../types/banner_type";

const initialState = {
  banners_loading: true,
  banners: null,
  page: null,
  pages: null,
  total_banners: 0,

  banner: null,
  banner_loading: null,

  loading: true,

  banner_message: null,
  all_banners: null,
  all_banners_loading: null,
  add_banner_loading: true,
  edit_banner_loading: true
};

export const banner_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BANNERS_STATED:
      return {
        ...state,
        banners: null,
        pages: null,
        page: null,
        total_banners: 0,
        banners_loading: true
      };
    case GET_BANNERS:
      return {
        ...state,
        banners: payload.banners,
        pages: payload.pages,
        page: payload.page,
        total_banners: payload.count
      };
    case GET_BANNERS_ENDED:
      return {
        ...state,
        banners_loading: false
      };
    case GET_ALL_BANNERS_STATED:
      return {
        ...state,
        all_banners_loading: true,
        all_banners: null
      };
    case GET_ALL_BANNERS:
      return {
        ...state,
        all_banners: payload
      };
    case GET_ALL_BANNERS_ENDED:
      return {
        ...state,
        all_banners_loading: false
      };

    case ADD_BANNER_STATED:
      return {
        ...state,
        banner_message: null,
        add_banner_loading: true
      };
    case ADD_BANNER:
      return {
        ...state,
        banner_message: payload
      };
    case ADD_BANNER_ENDED:
      return {
        ...state,
        add_banner_loading: false
      };
    case GET_BANNER_STATED:
      return {
        ...state,
        banner: null,
        banner_loading: true
      };
    case GET_BANNER:
      return {
        ...state,
        banner: payload
      };
    case GET_BANNER_ENDED:
      return {
        ...state,
        banner_loading: false
      };
    case EDIT_BANNER_STATED:
      return {
        ...state,
        banner_message: null,
        edit_banner_loading: true
      };
    case EDIT_BANNER:
      return {
        ...state,
        banner_message: payload
      };
    case EDIT_BANNER_ENDED:
      return {
        ...state,
        edit_banner_loading: false
      };

    default:
      return state;
  }
};
