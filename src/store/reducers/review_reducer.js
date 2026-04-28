import {
  GET_REVIEWS_STATED,
  GET_REVIEWS,
  GET_REVIEWS_ENDED,
  ADD_REVIEW_STATED,
  ADD_REVIEW,
  ADD_REVIEW_ENDED,
  EDIT_REVIEW_STATED,
  EDIT_REVIEW,
  EDIT_REVIEW_ENDED,
  GET_REVIEW_STATED,
  GET_REVIEW,
  GET_REVIEW_ENDED,
  GET_ALL_REVIEWS_STATED,
  GET_ALL_REVIEWS,
  GET_ALL_REVIEWS_ENDED
} from "../types/review_type";

const initialState = {
  reviews_loading: true,
  reviews: null,
  page: null,
  pages: null,
  total_reviews: 0,

  review: null,
  review_loading: null,

  loading: true,

  review_message: null,
  all_reviews: null,
  all_reviews_loading: null,
  add_review_loading: true,
  edit_review_loading: true
};

export const review_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REVIEWS_STATED:
      return {
        ...state,
        reviews: null,
        pages: null,
        page: null,
        total_reviews: 0,
        reviews_loading: true
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload.reviews,
        pages: payload.pages,
        page: payload.page,
        total_reviews: payload.count
      };
    case GET_REVIEWS_ENDED:
      return {
        ...state,
        reviews_loading: false
      };
    case GET_ALL_REVIEWS_STATED:
      return {
        ...state,
        all_reviews_loading: true,
        all_reviews: null
      };
    case GET_ALL_REVIEWS:
      return {
        ...state,
        all_reviews: payload
      };
    case GET_ALL_REVIEWS_ENDED:
      return {
        ...state,
        all_reviews_loading: false
      };

    case ADD_REVIEW_STATED:
      return {
        ...state,
        review_message: null,
        add_review_loading: true
      };
    case ADD_REVIEW:
      return {
        ...state,
        review_message: payload
      };
    case ADD_REVIEW_ENDED:
      return {
        ...state,
        add_review_loading: false
      };
    case GET_REVIEW_STATED:
      return {
        ...state,
        review: null,
        review_loading: true
      };
    case GET_REVIEW:
      return {
        ...state,
        review: payload
      };
    case GET_REVIEW_ENDED:
      return {
        ...state,
        review_loading: false
      };
    case EDIT_REVIEW_STATED:
      return {
        ...state,
        review_message: null,
        edit_review_loading: true
      };
    case EDIT_REVIEW:
      return {
        ...state,
        review_message: payload
      };
    case EDIT_REVIEW_ENDED:
      return {
        ...state,
        edit_review_loading: false
      };

    default:
      return state;
  }
};
