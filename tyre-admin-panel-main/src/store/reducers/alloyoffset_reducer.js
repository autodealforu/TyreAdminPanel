import {
  GET_ALLOYOFFSETS_STATED,
  GET_ALLOYOFFSETS,
  GET_ALLOYOFFSETS_ENDED,
  ADD_ALLOYOFFSET_STATED,
  ADD_ALLOYOFFSET,
  ADD_ALLOYOFFSET_ENDED,
  EDIT_ALLOYOFFSET_STATED,
  EDIT_ALLOYOFFSET,
  EDIT_ALLOYOFFSET_ENDED,
  GET_ALLOYOFFSET_STATED,
  GET_ALLOYOFFSET,
  GET_ALLOYOFFSET_ENDED,
  GET_ALL_ALLOYOFFSETS_STATED,
  GET_ALL_ALLOYOFFSETS,
  GET_ALL_ALLOYOFFSETS_ENDED,
} from '../types/alloyoffset_type';

const initialState = {
  alloyoffsets_loading: false,
  add_alloyoffset_loading: false,
  edit_alloyoffset_loading: false,
  alloyoffsets: [],
  total_alloyoffsets: 0,
  page: 1,
  pages: 1,
  alloyoffset: null,
  all_alloyoffsets: [],
};

export const alloyoffset_reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALLOYOFFSETS_STATED:
      return { ...state, alloyoffsets_loading: true };
    case GET_ALLOYOFFSETS:
      return {
        ...state,
        alloyoffsets_loading: false,
        alloyoffsets: payload.items || payload.alloyoffsets || [],
        total_alloyoffsets: payload.count || 0,
        page: payload.page || 1,
        pages: payload.pages || 1,
      };
    case GET_ALLOYOFFSETS_ENDED:
      return { ...state, alloyoffsets_loading: false };

    case ADD_ALLOYOFFSET_STATED:
      return { ...state, add_alloyoffset_loading: true };
    case ADD_ALLOYOFFSET:
      return { ...state, add_alloyoffset_loading: false };
    case ADD_ALLOYOFFSET_ENDED:
      return { ...state, add_alloyoffset_loading: false };

    case EDIT_ALLOYOFFSET_STATED:
      return { ...state, edit_alloyoffset_loading: true };
    case EDIT_ALLOYOFFSET:
      return { ...state, edit_alloyoffset_loading: false };
    case EDIT_ALLOYOFFSET_ENDED:
      return { ...state, edit_alloyoffset_loading: false };

    case GET_ALLOYOFFSET_STATED:
      return { ...state, alloyoffsets_loading: true };
    case GET_ALLOYOFFSET:
      return { ...state, alloyoffsets_loading: false, alloyoffset: payload };
    case GET_ALLOYOFFSET_ENDED:
      return { ...state, alloyoffsets_loading: false };

    case GET_ALL_ALLOYOFFSETS_STATED:
      return { ...state };
    case GET_ALL_ALLOYOFFSETS:
      return { ...state, all_alloyoffsets: payload };
    case GET_ALL_ALLOYOFFSETS_ENDED:
      return { ...state };
    default:
      return state;
  }
};
