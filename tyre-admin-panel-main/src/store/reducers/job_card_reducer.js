import {
  GET_JOB_CARDS_STATED,
  GET_JOB_CARDS,
  GET_JOB_CARDS_ENDED,
  ADD_JOB_CARD_STATED,
  ADD_JOB_CARD,
  ADD_JOB_CARD_ENDED,
  EDIT_JOB_CARD_STATED,
  EDIT_JOB_CARD,
  EDIT_JOB_CARD_ENDED,
  GET_JOB_CARD_STATED,
  GET_JOB_CARD,
  GET_JOB_CARD_ENDED,
  GET_ALL_JOB_CARDS_STATED,
  GET_ALL_JOB_CARDS,
  GET_ALL_JOB_CARDS_ENDED,
} from '../types/job_card_type';

const initialState = {
  job_cards_loading: true,
  job_cards: null,
  page: null,
  pages: null,
  total_job_cards: 0,

  job_card: null,
  job_card_loading: null,

  loading: true,

  job_card_message: null,
  all_job_cards: null,
  all_job_cards_loading: null,
  add_job_card_loading: true,
  edit_job_card_loading: true,
};

export const job_card_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_JOB_CARDS_STATED:
      return {
        ...state,
        job_cards: null,
        pages: null,
        page: null,
        total_job_cards: 0,
        job_cards_loading: true,
      };
    case GET_JOB_CARDS:
      return {
        ...state,
        job_cards: payload.jobCards,
        pages: payload.pages,
        page: payload.page,
        total_job_cards: payload.count,
      };
    case GET_JOB_CARDS_ENDED:
      return {
        ...state,
        job_cards_loading: false,
      };
    case GET_ALL_JOB_CARDS_STATED:
      return {
        ...state,
        all_job_cards_loading: true,
        all_job_cards: null,
      };
    case GET_ALL_JOB_CARDS:
      return {
        ...state,
        all_job_cards: payload,
      };
    case GET_ALL_JOB_CARDS_ENDED:
      return {
        ...state,
        all_job_cards_loading: false,
      };

    case ADD_JOB_CARD_STATED:
      return {
        ...state,
        job_card_message: null,
        add_job_card_loading: true,
      };
    case ADD_JOB_CARD:
      return {
        ...state,
        job_card_message: payload,
      };
    case ADD_JOB_CARD_ENDED:
      return {
        ...state,
        add_job_card_loading: false,
      };
    case GET_JOB_CARD_STATED:
      return {
        ...state,
        job_card: null,
        job_card_loading: true,
      };
    case GET_JOB_CARD:
      return {
        ...state,
        job_card: payload,
      };
    case GET_JOB_CARD_ENDED:
      return {
        ...state,
        job_card_loading: false,
      };
    case EDIT_JOB_CARD_STATED:
      return {
        ...state,
        job_card_message: null,
        edit_job_card_loading: true,
      };
    case EDIT_JOB_CARD:
      return {
        ...state,
        job_card_message: payload,
      };
    case EDIT_JOB_CARD_ENDED:
      return {
        ...state,
        edit_job_card_loading: false,
      };

    default:
      return state;
  }
};
