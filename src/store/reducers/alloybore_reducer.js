import {
  GET_ALLOYBORES_STATED,
  GET_ALLOYBORES,
  GET_ALLOYBORES_ENDED,
  ADD_ALLOYBORE_STATED,
  ADD_ALLOYBORE,
  ADD_ALLOYBORE_ENDED,
  EDIT_ALLOYBORE_STATED,
  EDIT_ALLOYBORE,
  EDIT_ALLOYBORE_ENDED,
  GET_ALLOYBORE_STATED,
  GET_ALLOYBORE,
  GET_ALLOYBORE_ENDED,
  GET_ALL_ALLOYBORES_STATED,
  GET_ALL_ALLOYBORES,
  GET_ALL_ALLOYBORES_ENDED,
} from '../types/alloybore_type';

const initialState = {
  alloybores: [],
  all_alloybores: [],
  alloybore: {},
  get_alloybores_loading: false,
  add_alloybore_loading: false,
  edit_alloybore_loading: false,
  get_alloybore_loading: false,
  get_all_alloybores_loading: false,
  total: 0,
  pageNumber: 1,
  pages: 1,
};

function alloyBoreReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALLOYBORES_STATED:
      return {
        ...state,
        get_alloybores_loading: true,
      };
    case GET_ALLOYBORES:
      return {
        ...state,
        alloybores: payload.items || payload.alloybores || [],
        total: payload.count || payload.total || 0,
        pageNumber: payload.page || payload.pageNumber || 1,
        pages: payload.pages || 1,
        get_alloybores_loading: false,
      };
    case GET_ALLOYBORES_ENDED:
      return {
        ...state,
        get_alloybores_loading: false,
      };
    case ADD_ALLOYBORE_STATED:
      return {
        ...state,
        add_alloybore_loading: true,
      };
    case ADD_ALLOYBORE:
      return {
        ...state,
        alloybores: [payload.alloybore, ...state.alloybores],
        add_alloybore_loading: false,
      };
    case ADD_ALLOYBORE_ENDED:
      return {
        ...state,
        add_alloybore_loading: false,
      };
    case EDIT_ALLOYBORE_STATED:
      return {
        ...state,
        edit_alloybore_loading: true,
      };
    case EDIT_ALLOYBORE:
      return {
        ...state,
        alloybores: state.alloybores.map((alloybore) =>
          alloybore._id === payload.alloybore._id
            ? payload.alloybore
            : alloybore
        ),
        edit_alloybore_loading: false,
      };
    case EDIT_ALLOYBORE_ENDED:
      return {
        ...state,
        edit_alloybore_loading: false,
      };
    case GET_ALLOYBORE_STATED:
      return {
        ...state,
        get_alloybore_loading: true,
      };
    case GET_ALLOYBORE:
      return {
        ...state,
        alloybore: payload.alloybore,
        get_alloybore_loading: false,
      };
    case GET_ALLOYBORE_ENDED:
      return {
        ...state,
        get_alloybore_loading: false,
      };
    case GET_ALL_ALLOYBORES_STATED:
      return {
        ...state,
        get_all_alloybores_loading: true,
      };
    case GET_ALL_ALLOYBORES:
      return {
        ...state,
        all_alloybores: payload,
        get_all_alloybores_loading: false,
      };
    case GET_ALL_ALLOYBORES_ENDED:
      return {
        ...state,
        get_all_alloybores_loading: false,
      };
    default:
      return state;
  }
}

export default alloyBoreReducer;
