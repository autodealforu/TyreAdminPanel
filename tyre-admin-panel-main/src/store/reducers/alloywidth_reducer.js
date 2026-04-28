import {
  GET_ALLOYWIDTHS_STATED,
  GET_ALLOYWIDTHS,
  GET_ALLOYWIDTHS_ENDED,
  ADD_ALLOYWIDTH_STATED,
  ADD_ALLOYWIDTH,
  ADD_ALLOYWIDTH_ENDED,
  EDIT_ALLOYWIDTH_STATED,
  EDIT_ALLOYWIDTH,
  EDIT_ALLOYWIDTH_ENDED,
  GET_ALLOYWIDTH_STATED,
  GET_ALLOYWIDTH,
  GET_ALLOYWIDTH_ENDED,
  GET_ALL_ALLOYWIDTHS_STATED,
  GET_ALL_ALLOYWIDTHS,
  GET_ALL_ALLOYWIDTHS_ENDED,
} from '../types/alloywidth_type';

const initialState = {
  alloywidths_loading: false,
  add_alloywidth_loading: false,
  edit_alloywidth_loading: false,
  alloywidths: [],
  total_alloywidths: 0,
  page: 1,
  pages: 1,
  alloywidth: null,
  all_alloywidths: [],
};

export const alloywidth_reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALLOYWIDTHS_STATED:
      return { ...state, alloywidths_loading: true };
    case GET_ALLOYWIDTHS:
      return {
        ...state,
        alloywidths_loading: false,
        alloywidths: payload.items || payload.alloywidths || [],
        total_alloywidths: payload.count || 0,
        page: payload.page || 1,
        pages: payload.pages || 1,
      };
    case GET_ALLOYWIDTHS_ENDED:
      return { ...state, alloywidths_loading: false };

    case ADD_ALLOYWIDTH_STATED:
      return { ...state, add_alloywidth_loading: true };
    case ADD_ALLOYWIDTH:
      return { ...state, add_alloywidth_loading: false };
    case ADD_ALLOYWIDTH_ENDED:
      return { ...state, add_alloywidth_loading: false };

    case EDIT_ALLOYWIDTH_STATED:
      return { ...state, edit_alloywidth_loading: true };
    case EDIT_ALLOYWIDTH:
      return { ...state, edit_alloywidth_loading: false };
    case EDIT_ALLOYWIDTH_ENDED:
      return { ...state, edit_alloywidth_loading: false };

    case GET_ALLOYWIDTH_STATED:
      return { ...state, alloywidths_loading: true };
    case GET_ALLOYWIDTH:
      return { ...state, alloywidths_loading: false, alloywidth: payload };
    case GET_ALLOYWIDTH_ENDED:
      return { ...state, alloywidths_loading: false };

    case GET_ALL_ALLOYWIDTHS_STATED:
      return { ...state };
    case GET_ALL_ALLOYWIDTHS:
      return { ...state, all_alloywidths: payload };
    case GET_ALL_ALLOYWIDTHS_ENDED:
      return { ...state };
    default:
      return state;
  }
};
