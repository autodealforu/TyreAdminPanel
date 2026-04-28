import {
  GET_ALLOYDIAMETERS_STATED,
  GET_ALLOYDIAMETERS,
  GET_ALLOYDIAMETERS_ENDED,
  ADD_ALLOYDIAMETER_STATED,
  ADD_ALLOYDIAMETER,
  ADD_ALLOYDIAMETER_ENDED,
  EDIT_ALLOYDIAMETER_STATED,
  EDIT_ALLOYDIAMETER,
  EDIT_ALLOYDIAMETER_ENDED,
  GET_ALLOYDIAMETER_STATED,
  GET_ALLOYDIAMETER,
  GET_ALLOYDIAMETER_ENDED,
  GET_ALL_ALLOYDIAMETERS_STATED,
  GET_ALL_ALLOYDIAMETERS,
  GET_ALL_ALLOYDIAMETERS_ENDED,
} from '../types/alloydiameter_type';

const initialState = {
  alloydiameters_loading: false,
  add_alloydiameter_loading: false,
  edit_alloydiameter_loading: false,
  alloydiameters: [],
  total_alloydiameters: 0,
  page: 1,
  pages: 1,
  alloydiameter: null,
  all_alloydiameters: [],
};

export const alloydiameter_reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALLOYDIAMETERS_STATED:
      return { ...state, alloydiameters_loading: true };
    case GET_ALLOYDIAMETERS:
      return {
        ...state,
        alloydiameters_loading: false,
        alloydiameters: payload.items || payload.alloydiameters || [],
        total_alloydiameters: payload.count || 0,
        page: payload.page || 1,
        pages: payload.pages || 1,
      };
    case GET_ALLOYDIAMETERS_ENDED:
      return { ...state, alloydiameters_loading: false };

    case ADD_ALLOYDIAMETER_STATED:
      return { ...state, add_alloydiameter_loading: true };
    case ADD_ALLOYDIAMETER:
      return { ...state, add_alloydiameter_loading: false };
    case ADD_ALLOYDIAMETER_ENDED:
      return { ...state, add_alloydiameter_loading: false };

    case EDIT_ALLOYDIAMETER_STATED:
      return { ...state, edit_alloydiameter_loading: true };
    case EDIT_ALLOYDIAMETER:
      return { ...state, edit_alloydiameter_loading: false };
    case EDIT_ALLOYDIAMETER_ENDED:
      return { ...state, edit_alloydiameter_loading: false };

    case GET_ALLOYDIAMETER_STATED:
      return { ...state, alloydiameters_loading: true };
    case GET_ALLOYDIAMETER:
      return {
        ...state,
        alloydiameters_loading: false,
        alloydiameter: payload,
      };
    case GET_ALLOYDIAMETER_ENDED:
      return { ...state, alloydiameters_loading: false };

    case GET_ALL_ALLOYDIAMETERS_STATED:
      return { ...state };
    case GET_ALL_ALLOYDIAMETERS:
      return { ...state, all_alloydiameters: payload };
    case GET_ALL_ALLOYDIAMETERS_ENDED:
      return { ...state };
    default:
      return state;
  }
};
