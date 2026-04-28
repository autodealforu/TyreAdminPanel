import {
  GET_NOTIFICATIONS_STATED,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_ENDED,
  ADD_NOTIFICATION_STATED,
  ADD_NOTIFICATION,
  ADD_NOTIFICATION_ENDED,
  EDIT_NOTIFICATION_STATED,
  EDIT_NOTIFICATION,
  EDIT_NOTIFICATION_ENDED,
  GET_NOTIFICATION_STATED,
  GET_NOTIFICATION,
  GET_NOTIFICATION_ENDED,
  GET_ALL_NOTIFICATIONS_STATED,
  GET_ALL_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS_ENDED
} from "../types/notification_type";

const initialState = {
  notifications_loading: true,
  notifications: null,
  page: null,
  pages: null,
  total_notifications: 0,

  notification: null,
  notification_loading: null,

  loading: true,

  notification_message: null,
  all_notifications: null,
  all_notifications_loading: null,
  add_notification_loading: true,
  edit_notification_loading: true
};

export const notification_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATIONS_STATED:
      return {
        ...state,
        notifications: null,
        pages: null,
        page: null,
        total_notifications: 0,
        notifications_loading: true
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload.notifications,
        pages: payload.pages,
        page: payload.page,
        total_notifications: payload.count
      };
    case GET_NOTIFICATIONS_ENDED:
      return {
        ...state,
        notifications_loading: false
      };
    case GET_ALL_NOTIFICATIONS_STATED:
      return {
        ...state,
        all_notifications_loading: true,
        all_notifications: null
      };
    case GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        all_notifications: payload
      };
    case GET_ALL_NOTIFICATIONS_ENDED:
      return {
        ...state,
        all_notifications_loading: false
      };

    case ADD_NOTIFICATION_STATED:
      return {
        ...state,
        notification_message: null,
        add_notification_loading: true
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notification_message: payload
      };
    case ADD_NOTIFICATION_ENDED:
      return {
        ...state,
        add_notification_loading: false
      };
    case GET_NOTIFICATION_STATED:
      return {
        ...state,
        notification: null,
        notification_loading: true
      };
    case GET_NOTIFICATION:
      return {
        ...state,
        notification: payload
      };
    case GET_NOTIFICATION_ENDED:
      return {
        ...state,
        notification_loading: false
      };
    case EDIT_NOTIFICATION_STATED:
      return {
        ...state,
        notification_message: null,
        edit_notification_loading: true
      };
    case EDIT_NOTIFICATION:
      return {
        ...state,
        notification_message: payload
      };
    case EDIT_NOTIFICATION_ENDED:
      return {
        ...state,
        edit_notification_loading: false
      };

    default:
      return state;
  }
};
