import {
  GET_ALLOYFINISHES_STATED,
  GET_ALLOYFINISHES,
  GET_ALLOYFINISHES_ENDED,
  ADD_ALLOYFINISH_STATED,
  ADD_ALLOYFINISH,
  ADD_ALLOYFINISH_ENDED,
  EDIT_ALLOYFINISH_STATED,
  EDIT_ALLOYFINISH,
  EDIT_ALLOYFINISH_ENDED,
  GET_ALLOYFINISH_STATED,
  GET_ALLOYFINISH,
  GET_ALLOYFINISH_ENDED,
  GET_ALL_ALLOYFINISHES_STATED,
  GET_ALL_ALLOYFINISHES,
  GET_ALL_ALLOYFINISHES_ENDED,
} from '../types/alloyfinish_type';

const initialState = {
  alloyfinishes_loading: false,
  add_alloyfinish_loading: false,
  edit_alloyfinish_loading: false,
  alloyfinishes: [],
  total_alloyfinishes: 0,
  page: 1,
  pages: 1,
  alloyfinish: null,
  all_alloyfinishes: [],
};

export const alloyfinish_reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALLOYFINISHES_STATED:
      return { ...state, alloyfinishes_loading: true };
    case GET_ALLOYFINISHES:
      return {
        ...state,
        alloyfinishes_loading: false,
        alloyfinishes: payload.items || payload.alloyfinishes || [],
        total_alloyfinishes: payload.count || 0,
        page: payload.page || 1,
        pages: payload.pages || 1,
      };
    case GET_ALLOYFINISHES_ENDED:
      return { ...state, alloyfinishes_loading: false };

    case ADD_ALLOYFINISH_STATED:
      return { ...state, add_alloyfinish_loading: true };
    case ADD_ALLOYFINISH:
      return { ...state, add_alloyfinish_loading: false };
    case ADD_ALLOYFINISH_ENDED:
      return { ...state, add_alloyfinish_loading: false };

    case EDIT_ALLOYFINISH_STATED:
      return { ...state, edit_alloyfinish_loading: true };
    case EDIT_ALLOYFINISH:
      return { ...state, edit_alloyfinish_loading: false };
    case EDIT_ALLOYFINISH_ENDED:
      return { ...state, edit_alloyfinish_loading: false };

    case GET_ALLOYFINISH_STATED:
      return { ...state, alloyfinishes_loading: true };
    case GET_ALLOYFINISH:
      return { ...state, alloyfinishes_loading: false, alloyfinish: payload };
    case GET_ALLOYFINISH_ENDED:
      return { ...state, alloyfinishes_loading: false };

    case GET_ALL_ALLOYFINISHES_STATED:
      return { ...state };
    case GET_ALL_ALLOYFINISHES:
      return { ...state, all_alloyfinishes: payload };
    case GET_ALL_ALLOYFINISHES_ENDED:
      return { ...state };
    default:
      return state;
  }
};
