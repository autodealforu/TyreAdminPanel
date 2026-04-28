import {
  GET_SERVICES_STATED,
  GET_SERVICES,
  GET_SERVICES_ENDED,
  ADD_SERVICE_STATED,
  ADD_SERVICE,
  ADD_SERVICE_ENDED,
  EDIT_SERVICE_STATED,
  EDIT_SERVICE,
  EDIT_SERVICE_ENDED,
  GET_SERVICE_STATED,
  GET_SERVICE,
  GET_SERVICE_ENDED,
  GET_ALL_SERVICES_STATED,
  GET_ALL_SERVICES,
  GET_ALL_SERVICES_ENDED,
} from '../types/service_type';

const initialState = {
  services_loading: true,
  services: null,
  page: null,
  pages: null,
  total_services: 0,

  service: null,
  service_loading: null,

  loading: true,

  service_message: null,
  all_services: null,
  all_services_loading: null,
  add_service_loading: true,
  edit_service_loading: true,
};

export const service_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SERVICES_STATED:
      return {
        ...state,
        services: null,
        pages: null,
        page: null,
        total_services: 0,
        services_loading: true,
      };
    case GET_SERVICES:
      return {
        ...state,
        services: payload.services || payload.services || [],
        pages: payload.pages,
        page: payload.page,
        total_services: payload.count,
      };
    case GET_SERVICES_ENDED:
      return {
        ...state,
        services_loading: false,
      };
    case GET_ALL_SERVICES_STATED:
      return {
        ...state,
        all_services_loading: true,
        all_services: null,
      };
    case GET_ALL_SERVICES:
      return {
        ...state,
        all_services: payload,
      };
    case GET_ALL_SERVICES_ENDED:
      return {
        ...state,
        all_services_loading: false,
      };

    case ADD_SERVICE_STATED:
      return {
        ...state,
        service_message: null,
        add_service_loading: true,
      };
    case ADD_SERVICE:
      return {
        ...state,
        service_message: payload,
      };
    case ADD_SERVICE_ENDED:
      return {
        ...state,
        add_service_loading: false,
      };
    case GET_SERVICE_STATED:
      return {
        ...state,
        service: null,
        service_loading: true,
      };
    case GET_SERVICE:
      return {
        ...state,
        service: payload,
      };
    case GET_SERVICE_ENDED:
      return {
        ...state,
        service_loading: false,
      };
    case EDIT_SERVICE_STATED:
      return {
        ...state,
        service_message: null,
        edit_service_loading: true,
      };
    case EDIT_SERVICE:
      return {
        ...state,
        service_message: payload,
      };
    case EDIT_SERVICE_ENDED:
      return {
        ...state,
        edit_service_loading: false,
      };

    default:
      return state;
  }
};
