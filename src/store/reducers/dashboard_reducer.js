import {
  GET_DASHBOARDS_STATED,
  GET_DASHBOARDS,
  GET_DASHBOARDS_ENDED,
  ADD_DASHBOARD_STATED,
  ADD_DASHBOARD,
  ADD_DASHBOARD_ENDED,
  EDIT_DASHBOARD_STATED,
  EDIT_DASHBOARD,
  EDIT_DASHBOARD_ENDED,
  GET_DASHBOARD_STATED,
  GET_DASHBOARD,
  GET_DASHBOARD_ENDED,
  GET_ALL_DASHBOARDS_STATED,
  GET_ALL_DASHBOARDS,
  GET_ALL_DASHBOARDS_ENDED,
} from "../types/dashboard_type";

const initialState = {
  dashboards_loading: true,
  dashboards: null,
  page: null,
  pages: null,
  total_dashboards: 0,

  dashboard: null,
  dashboard_loading: null,

  loading: true,

  dashboard_message: null,
  all_dashboards: null,
  all_dashboards_loading: null,
  add_dashboard_loading: true,
  edit_dashboard_loading: true,
};

export const dashboard_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_DASHBOARDS_STATED:
      return {
        ...state,
        dashboards: null,

        dashboards_loading: true,
      };
    case GET_DASHBOARDS:
      return {
        ...state,
        dashboards: payload,
      };
    case GET_DASHBOARDS_ENDED:
      return {
        ...state,
        dashboards_loading: false,
      };
    case GET_ALL_DASHBOARDS_STATED:
      return {
        ...state,
        all_dashboards_loading: true,
        all_dashboards: null,
      };
    case GET_ALL_DASHBOARDS:
      return {
        ...state,
        all_dashboards: payload,
      };
    case GET_ALL_DASHBOARDS_ENDED:
      return {
        ...state,
        all_dashboards_loading: false,
      };

    case ADD_DASHBOARD_STATED:
      return {
        ...state,
        dashboard_message: null,
        add_dashboard_loading: true,
      };
    case ADD_DASHBOARD:
      return {
        ...state,
        dashboard_message: payload,
      };
    case ADD_DASHBOARD_ENDED:
      return {
        ...state,
        add_dashboard_loading: false,
      };
    case GET_DASHBOARD_STATED:
      return {
        ...state,
        dashboard: null,
        dashboard_loading: true,
      };
    case GET_DASHBOARD:
      return {
        ...state,
        dashboard: payload,
      };
    case GET_DASHBOARD_ENDED:
      return {
        ...state,
        dashboard_loading: false,
      };
    case EDIT_DASHBOARD_STATED:
      return {
        ...state,
        dashboard_message: null,
        edit_dashboard_loading: true,
      };
    case EDIT_DASHBOARD:
      return {
        ...state,
        dashboard_message: payload,
      };
    case EDIT_DASHBOARD_ENDED:
      return {
        ...state,
        edit_dashboard_loading: false,
      };

    default:
      return state;
  }
};
