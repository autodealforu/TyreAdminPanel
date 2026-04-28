import {
  GET_TEMPLATES_STATED,
  GET_TEMPLATES,
  GET_TEMPLATES_ENDED,
  ADD_TEMPLATE_STATED,
  ADD_TEMPLATE,
  ADD_TEMPLATE_ENDED,
  EDIT_TEMPLATE_STATED,
  EDIT_TEMPLATE,
  EDIT_TEMPLATE_ENDED,
  GET_TEMPLATE_STATED,
  GET_TEMPLATE,
  GET_TEMPLATE_ENDED,
  GET_ALL_TEMPLATES_STATED,
  GET_ALL_TEMPLATES,
  GET_ALL_TEMPLATES_ENDED
} from "../types/template_type";

const initialState = {
  templates_loading: true,
  templates: null,
  page: null,
  pages: null,
  total_templates: 0,

  template: null,
  template_loading: null,

  loading: true,

  template_message: null,
  all_templates: null,
  all_templates_loading: null,
  add_template_loading: true,
  edit_template_loading: true
};

export const template_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TEMPLATES_STATED:
      return {
        ...state,
        templates: null,
        pages: null,
        page: null,
        total_templates: 0,
        templates_loading: true
      };
    case GET_TEMPLATES:
      return {
        ...state,
        templates: payload.templates,
        pages: payload.pages,
        page: payload.page,
        total_templates: payload.count
      };
    case GET_TEMPLATES_ENDED:
      return {
        ...state,
        templates_loading: false
      };
    case GET_ALL_TEMPLATES_STATED:
      return {
        ...state,
        all_templates_loading: true,
        all_templates: null
      };
    case GET_ALL_TEMPLATES:
      return {
        ...state,
        all_templates: payload
      };
    case GET_ALL_TEMPLATES_ENDED:
      return {
        ...state,
        all_templates_loading: false
      };

    case ADD_TEMPLATE_STATED:
      return {
        ...state,
        template_message: null,
        add_template_loading: true
      };
    case ADD_TEMPLATE:
      return {
        ...state,
        template_message: payload
      };
    case ADD_TEMPLATE_ENDED:
      return {
        ...state,
        add_template_loading: false
      };
    case GET_TEMPLATE_STATED:
      return {
        ...state,
        template: null,
        template_loading: true
      };
    case GET_TEMPLATE:
      return {
        ...state,
        template: payload
      };
    case GET_TEMPLATE_ENDED:
      return {
        ...state,
        template_loading: false
      };
    case EDIT_TEMPLATE_STATED:
      return {
        ...state,
        template_message: null,
        edit_template_loading: true
      };
    case EDIT_TEMPLATE:
      return {
        ...state,
        template_message: payload
      };
    case EDIT_TEMPLATE_ENDED:
      return {
        ...state,
        edit_template_loading: false
      };

    default:
      return state;
  }
};
