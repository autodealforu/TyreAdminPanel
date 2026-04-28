import {
  GET_MOBILEBANNERS_STATED,
  GET_MOBILEBANNERS,
  GET_MOBILEBANNERS_ENDED,
  ADD_MOBILEBANNER_STATED,
  ADD_MOBILEBANNER,
  ADD_MOBILEBANNER_ENDED,
  EDIT_MOBILEBANNER_STATED,
  EDIT_MOBILEBANNER,
  EDIT_MOBILEBANNER_ENDED,
  GET_MOBILEBANNER_STATED,
  GET_MOBILEBANNER,
  GET_MOBILEBANNER_ENDED,
  GET_ALL_MOBILEBANNERS_STATED,
  GET_ALL_MOBILEBANNERS,
  GET_ALL_MOBILEBANNERS_ENDED
} from "../types/mobilebanner_type";

const initialState = {
  mobilebanners_loading: true,
  mobilebanners: null,
  page: null,
  pages: null,
  total_mobilebanners: 0,

  mobilebanner: null,
  mobilebanner_loading: null,

  loading: true,

  mobilebanner_message: null,
  all_mobilebanners: null,
  all_mobilebanners_loading: null,
  add_mobilebanner_loading: true,
  edit_mobilebanner_loading: true
};

export const mobilebanner_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MOBILEBANNERS_STATED:
      return {
        ...state,
        mobilebanners: null,
        pages: null,
        page: null,
        total_mobilebanners: 0,
        mobilebanners_loading: true
      };
    case GET_MOBILEBANNERS:
      return {
        ...state,
        mobilebanners: payload.mobilebanners,
        pages: payload.pages,
        page: payload.page,
        total_mobilebanners: payload.count
      };
    case GET_MOBILEBANNERS_ENDED:
      return {
        ...state,
        mobilebanners_loading: false
      };
    case GET_ALL_MOBILEBANNERS_STATED:
      return {
        ...state,
        all_mobilebanners_loading: true,
        all_mobilebanners: null
      };
    case GET_ALL_MOBILEBANNERS:
      return {
        ...state,
        all_mobilebanners: payload
      };
    case GET_ALL_MOBILEBANNERS_ENDED:
      return {
        ...state,
        all_mobilebanners_loading: false
      };

    case ADD_MOBILEBANNER_STATED:
      return {
        ...state,
        mobilebanner_message: null,
        add_mobilebanner_loading: true
      };
    case ADD_MOBILEBANNER:
      return {
        ...state,
        mobilebanner_message: payload
      };
    case ADD_MOBILEBANNER_ENDED:
      return {
        ...state,
        add_mobilebanner_loading: false
      };
    case GET_MOBILEBANNER_STATED:
      return {
        ...state,
        mobilebanner: null,
        mobilebanner_loading: true
      };
    case GET_MOBILEBANNER:
      return {
        ...state,
        mobilebanner: payload
      };
    case GET_MOBILEBANNER_ENDED:
      return {
        ...state,
        mobilebanner_loading: false
      };
    case EDIT_MOBILEBANNER_STATED:
      return {
        ...state,
        mobilebanner_message: null,
        edit_mobilebanner_loading: true
      };
    case EDIT_MOBILEBANNER:
      return {
        ...state,
        mobilebanner_message: payload
      };
    case EDIT_MOBILEBANNER_ENDED:
      return {
        ...state,
        edit_mobilebanner_loading: false
      };

    default:
      return state;
  }
};
