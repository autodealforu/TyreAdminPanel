import {
  GET_TECHNICIANS_STATED,
  GET_TECHNICIANS,
  GET_TECHNICIANS_ENDED,
  ADD_TECHNICIAN_STATED,
  ADD_TECHNICIAN,
  ADD_TECHNICIAN_ENDED,
  EDIT_TECHNICIAN_STATED,
  EDIT_TECHNICIAN,
  EDIT_TECHNICIAN_ENDED,
  GET_TECHNICIAN_STATED,
  GET_TECHNICIAN,
  GET_TECHNICIAN_ENDED,
  GET_ALL_TECHNICIANS_STATED,
  GET_ALL_TECHNICIANS,
  GET_ALL_TECHNICIANS_ENDED,
} from '../types/technician_type';

const initialState = {
  technicians_loading: true,
  technicians: null,
  page: null,
  pages: null,
  total_technicians: 0,

  technician: null,
  technician_loading: null,

  loading: true,

  technician_message: null,
  all_technicians: null,
  all_technicians_loading: null,
  add_technician_loading: true,
  edit_technician_loading: true,
};

export const technician_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TECHNICIANS_STATED:
      return {
        ...state,
        technicians: null,
        pages: null,
        page: null,
        total_technicians: 0,
        technicians_loading: true,
      };
    case GET_TECHNICIANS:
      return {
        ...state,
        technicians: payload.technicians,
        pages: payload.pages,
        page: payload.page,
        total_technicians: payload.count,
      };
    case GET_TECHNICIANS_ENDED:
      return {
        ...state,
        technicians_loading: false,
      };
    case GET_ALL_TECHNICIANS_STATED:
      return {
        ...state,
        all_technicians_loading: true,
        all_technicians: null,
      };
    case GET_ALL_TECHNICIANS:
      return {
        ...state,
        all_technicians: payload,
      };
    case GET_ALL_TECHNICIANS_ENDED:
      return {
        ...state,
        all_technicians_loading: false,
      };

    case ADD_TECHNICIAN_STATED:
      return {
        ...state,
        technician_message: null,
        add_technician_loading: true,
      };
    case ADD_TECHNICIAN:
      return {
        ...state,
        technician_message: payload,
      };
    case ADD_TECHNICIAN_ENDED:
      return {
        ...state,
        add_technician_loading: false,
      };
    case GET_TECHNICIAN_STATED:
      return {
        ...state,
        technician: null,
        technician_loading: true,
      };
    case GET_TECHNICIAN:
      return {
        ...state,
        technician: payload,
      };
    case GET_TECHNICIAN_ENDED:
      return {
        ...state,
        technician_loading: false,
      };
    case EDIT_TECHNICIAN_STATED:
      return {
        ...state,
        technician_message: null,
        edit_technician_loading: true,
      };
    case EDIT_TECHNICIAN:
      return {
        ...state,
        technician_message: payload,
      };
    case EDIT_TECHNICIAN_ENDED:
      return {
        ...state,
        edit_technician_loading: false,
      };

    default:
      return state;
  }
};
