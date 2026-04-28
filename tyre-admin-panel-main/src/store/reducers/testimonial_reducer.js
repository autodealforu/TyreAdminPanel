import {
  GET_TESTIMONIALS_STATED,
  GET_TESTIMONIALS,
  GET_TESTIMONIALS_ENDED,
  ADD_TESTIMONIAL_STATED,
  ADD_TESTIMONIAL,
  ADD_TESTIMONIAL_ENDED,
  EDIT_TESTIMONIAL_STATED,
  EDIT_TESTIMONIAL,
  EDIT_TESTIMONIAL_ENDED,
  GET_TESTIMONIAL_STATED,
  GET_TESTIMONIAL,
  GET_TESTIMONIAL_ENDED,
  GET_ALL_TESTIMONIALS_STATED,
  GET_ALL_TESTIMONIALS,
  GET_ALL_TESTIMONIALS_ENDED
} from "../types/testimonial_type";

const initialState = {
  testimonials_loading: true,
  testimonials: null,
  page: null,
  pages: null,
  total_testimonials: 0,

  testimonial: null,
  testimonial_loading: null,

  loading: true,

  testimonial_message: null,
  all_testimonials: null,
  all_testimonials_loading: null,
  add_testimonial_loading: true,
  edit_testimonial_loading: true
};

export const testimonial_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TESTIMONIALS_STATED:
      return {
        ...state,
        testimonials: null,
        pages: null,
        page: null,
        total_testimonials: 0,
        testimonials_loading: true
      };
    case GET_TESTIMONIALS:
      return {
        ...state,
        testimonials: payload.testimonials,
        pages: payload.pages,
        page: payload.page,
        total_testimonials: payload.count
      };
    case GET_TESTIMONIALS_ENDED:
      return {
        ...state,
        testimonials_loading: false
      };
    case GET_ALL_TESTIMONIALS_STATED:
      return {
        ...state,
        all_testimonials_loading: true,
        all_testimonials: null
      };
    case GET_ALL_TESTIMONIALS:
      return {
        ...state,
        all_testimonials: payload
      };
    case GET_ALL_TESTIMONIALS_ENDED:
      return {
        ...state,
        all_testimonials_loading: false
      };

    case ADD_TESTIMONIAL_STATED:
      return {
        ...state,
        testimonial_message: null,
        add_testimonial_loading: true
      };
    case ADD_TESTIMONIAL:
      return {
        ...state,
        testimonial_message: payload
      };
    case ADD_TESTIMONIAL_ENDED:
      return {
        ...state,
        add_testimonial_loading: false
      };
    case GET_TESTIMONIAL_STATED:
      return {
        ...state,
        testimonial: null,
        testimonial_loading: true
      };
    case GET_TESTIMONIAL:
      return {
        ...state,
        testimonial: payload
      };
    case GET_TESTIMONIAL_ENDED:
      return {
        ...state,
        testimonial_loading: false
      };
    case EDIT_TESTIMONIAL_STATED:
      return {
        ...state,
        testimonial_message: null,
        edit_testimonial_loading: true
      };
    case EDIT_TESTIMONIAL:
      return {
        ...state,
        testimonial_message: payload
      };
    case EDIT_TESTIMONIAL_ENDED:
      return {
        ...state,
        edit_testimonial_loading: false
      };

    default:
      return state;
  }
};
