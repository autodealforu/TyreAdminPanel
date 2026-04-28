import {
  GET_PARTS_STATED,
  GET_PARTS,
  GET_PARTS_ENDED,
  ADD_PART_STATED,
  ADD_PART,
  ADD_PART_ENDED,
  EDIT_PART_STATED,
  EDIT_PART,
  EDIT_PART_ENDED,
  GET_PART_STATED,
  GET_PART,
  GET_PART_ENDED,
  GET_ALL_PARTS_STATED,
  GET_ALL_PARTS,
  GET_ALL_PARTS_ENDED,
} from '../types/part_type';

const initialState = {
  parts_loading: true,
  parts: null,
  page: null,
  pages: null,
  total_parts: 0,

  part: null,
  part_loading: null,

  loading: true,

  part_message: null,
  all_parts: null,
  all_parts_loading: null,
  add_part_loading: true,
  edit_part_loading: true,
};

export const part_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PARTS_STATED:
      return {
        ...state,
        parts: null,
        pages: null,
        page: null,
        total_parts: 0,
        parts_loading: true,
      };
    case GET_PARTS:
      return {
        ...state,
        parts: payload.parts,
        pages: payload.pages,
        page: payload.page,
        total_parts: payload.count,
      };
    case GET_PARTS_ENDED:
      return {
        ...state,
        parts_loading: false,
      };
    case GET_ALL_PARTS_STATED:
      return {
        ...state,
        all_parts_loading: true,
        all_parts: null,
      };
    case GET_ALL_PARTS:
      return {
        ...state,
        all_parts: payload,
      };
    case GET_ALL_PARTS_ENDED:
      return {
        ...state,
        all_parts_loading: false,
      };

    case ADD_PART_STATED:
      return {
        ...state,
        part_message: null,
        add_part_loading: true,
      };
    case ADD_PART:
      return {
        ...state,
        part_message: payload,
      };
    case ADD_PART_ENDED:
      return {
        ...state,
        add_part_loading: false,
      };
    case GET_PART_STATED:
      return {
        ...state,
        part: null,
        part_loading: true,
      };
    case GET_PART:
      return {
        ...state,
        part: payload,
      };
    case GET_PART_ENDED:
      return {
        ...state,
        part_loading: false,
      };
    case EDIT_PART_STATED:
      return {
        ...state,
        part_message: null,
        edit_part_loading: true,
      };
    case EDIT_PART:
      return {
        ...state,
        part_message: payload,
      };
    case EDIT_PART_ENDED:
      return {
        ...state,
        edit_part_loading: false,
      };

    default:
      return state;
  }
};
