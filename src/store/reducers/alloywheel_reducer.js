import {
  GET_ALLOYWHEELS_STATED,
  GET_ALLOYWHEELS,
  GET_ALLOYWHEELS_ENDED,
  ADD_ALLOYWHEEL_STATED,
  ADD_ALLOYWHEEL,
  ADD_ALLOYWHEEL_ENDED,
  EDIT_ALLOYWHEEL_STATED,
  EDIT_ALLOYWHEEL,
  EDIT_ALLOYWHEEL_ENDED,
  GET_ALLOYWHEEL_STATED,
  GET_ALLOYWHEEL,
  GET_ALLOYWHEEL_ENDED,
  GET_ALL_ALLOYWHEELS_STATED,
  GET_ALL_ALLOYWHEELS,
  GET_ALL_ALLOYWHEELS_ENDED,
} from '../types/alloywheel_type';

const initialState = {
  alloywheels_loading: true,
  alloywheels: null,
  page: null,
  pages: null,
  total_alloywheels: 0,

  alloywheel: null,
  alloywheel_loading: null,

  loading: true,

  alloywheel_message: null,
  all_alloywheels: null,
  all_alloywheels_loading: null,
  add_alloywheel_loading: true,
  edit_alloywheel_loading: true,
};

export const alloywheel_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALLOYWHEELS_STATED:
      return {
        ...state,
        alloywheels: null,
        pages: null,
        page: null,
        total_alloywheels: 0,
        alloywheels_loading: true,
      };
    case GET_ALLOYWHEELS:
      return {
        ...state,
        alloywheels: payload.alloyWheels || payload.alloywheels || [],
        pages: payload.pages,
        page: payload.page,
        total_alloywheels: payload.count,
      };
    case GET_ALLOYWHEELS_ENDED:
      return {
        ...state,
        alloywheels_loading: false,
      };
    case GET_ALL_ALLOYWHEELS_STATED:
      return {
        ...state,
        all_alloywheels_loading: true,
        all_alloywheels: null,
      };
    case GET_ALL_ALLOYWHEELS:
      return {
        ...state,
        all_alloywheels: payload,
      };
    case GET_ALL_ALLOYWHEELS_ENDED:
      return {
        ...state,
        all_alloywheels_loading: false,
      };

    case ADD_ALLOYWHEEL_STATED:
      return {
        ...state,
        alloywheel_message: null,
        add_alloywheel_loading: true,
      };
    case ADD_ALLOYWHEEL:
      return {
        ...state,
        alloywheel_message: payload,
      };
    case ADD_ALLOYWHEEL_ENDED:
      return {
        ...state,
        add_alloywheel_loading: false,
      };
    case GET_ALLOYWHEEL_STATED:
      return {
        ...state,
        alloywheel: null,
        alloywheel_loading: true,
      };
    case GET_ALLOYWHEEL:
      return {
        ...state,
        alloywheel: payload,
      };
    case GET_ALLOYWHEEL_ENDED:
      return {
        ...state,
        alloywheel_loading: false,
      };
    case EDIT_ALLOYWHEEL_STATED:
      return {
        ...state,
        alloywheel_message: null,
        edit_alloywheel_loading: true,
      };
    case EDIT_ALLOYWHEEL:
      return {
        ...state,
        alloywheel_message: payload,
      };
    case EDIT_ALLOYWHEEL_ENDED:
      return {
        ...state,
        edit_alloywheel_loading: false,
      };

    default:
      return state;
  }
};
