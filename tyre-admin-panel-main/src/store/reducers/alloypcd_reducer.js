import {
  GET_ALLOYPCDS_STATED,
  GET_ALLOYPCDS,
  GET_ALLOYPCDS_ENDED,
  ADD_ALLOYPCD_STATED,
  ADD_ALLOYPCD,
  ADD_ALLOYPCD_ENDED,
  EDIT_ALLOYPCD_STATED,
  EDIT_ALLOYPCD,
  EDIT_ALLOYPCD_ENDED,
  GET_ALLOYPCD_STATED,
  GET_ALLOYPCD,
  GET_ALLOYPCD_ENDED,
  GET_ALL_ALLOYPCDS_STATED,
  GET_ALL_ALLOYPCDS,
  GET_ALL_ALLOYPCDS_ENDED,
} from '../types/alloypcd_type';

const initialState = {
  alloypcds_loading: false,
  add_alloypcd_loading: false,
  edit_alloypcd_loading: false,
  alloypcds: [],
  total_alloypcds: 0,
  page: 1,
  pages: 1,
  alloypcd: null,
  all_alloypcds: [],
};

export const alloypcd_reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALLOYPCDS_STATED:
      return { ...state, alloypcds_loading: true };
    case GET_ALLOYPCDS:
      return {
        ...state,
        alloypcds_loading: false,
        alloypcds: payload.items || payload.alloypcds || [],
        total_alloypcds: payload.count || 0,
        page: payload.page || 1,
        pages: payload.pages || 1,
      };
    case GET_ALLOYPCDS_ENDED:
      return { ...state, alloypcds_loading: false };

    case ADD_ALLOYPCD_STATED:
      return { ...state, add_alloypcd_loading: true };
    case ADD_ALLOYPCD:
      return { ...state, add_alloypcd_loading: false };
    case ADD_ALLOYPCD_ENDED:
      return { ...state, add_alloypcd_loading: false };

    case EDIT_ALLOYPCD_STATED:
      return { ...state, edit_alloypcd_loading: true };
    case EDIT_ALLOYPCD:
      return { ...state, edit_alloypcd_loading: false };
    case EDIT_ALLOYPCD_ENDED:
      return { ...state, edit_alloypcd_loading: false };

    case GET_ALLOYPCD_STATED:
      return { ...state, alloypcds_loading: true };
    case GET_ALLOYPCD:
      return { ...state, alloypcds_loading: false, alloypcd: payload };
    case GET_ALLOYPCD_ENDED:
      return { ...state, alloypcds_loading: false };

    case GET_ALL_ALLOYPCDS_STATED:
      return { ...state };
    case GET_ALL_ALLOYPCDS:
      return { ...state, all_alloypcds: payload };
    case GET_ALL_ALLOYPCDS_ENDED:
      return { ...state };
    default:
      return state;
  }
};
