import {
  GET_CONTACTS_STATED,
  GET_CONTACTS,
  GET_CONTACTS_ENDED,
  ADD_CONTACT_STATED,
  ADD_CONTACT,
  ADD_CONTACT_ENDED,
  EDIT_CONTACT_STATED,
  EDIT_CONTACT,
  EDIT_CONTACT_ENDED,
  GET_CONTACT_STATED,
  GET_CONTACT,
  GET_CONTACT_ENDED,
  GET_ALL_CONTACTS_STATED,
  GET_ALL_CONTACTS,
  GET_ALL_CONTACTS_ENDED
} from "../types/contact_type";

const initialState = {
  contacts_loading: true,
  contacts: null,
  page: null,
  pages: null,
  total_contacts: 0,

  contact: null,
  contact_loading: null,

  loading: true,

  contact_message: null,
  all_contacts: null,
  all_contacts_loading: null,
  add_contact_loading: true,
  edit_contact_loading: true
};

export const contact_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTACTS_STATED:
      return {
        ...state,
        contacts: null,
        pages: null,
        page: null,
        total_contacts: 0,
        contacts_loading: true
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload.contacts,
        pages: payload.pages,
        page: payload.page,
        total_contacts: payload.count
      };
    case GET_CONTACTS_ENDED:
      return {
        ...state,
        contacts_loading: false
      };
    case GET_ALL_CONTACTS_STATED:
      return {
        ...state,
        all_contacts_loading: true,
        all_contacts: null
      };
    case GET_ALL_CONTACTS:
      return {
        ...state,
        all_contacts: payload
      };
    case GET_ALL_CONTACTS_ENDED:
      return {
        ...state,
        all_contacts_loading: false
      };

    case ADD_CONTACT_STATED:
      return {
        ...state,
        contact_message: null,
        add_contact_loading: true
      };
    case ADD_CONTACT:
      return {
        ...state,
        contact_message: payload
      };
    case ADD_CONTACT_ENDED:
      return {
        ...state,
        add_contact_loading: false
      };
    case GET_CONTACT_STATED:
      return {
        ...state,
        contact: null,
        contact_loading: true
      };
    case GET_CONTACT:
      return {
        ...state,
        contact: payload
      };
    case GET_CONTACT_ENDED:
      return {
        ...state,
        contact_loading: false
      };
    case EDIT_CONTACT_STATED:
      return {
        ...state,
        contact_message: null,
        edit_contact_loading: true
      };
    case EDIT_CONTACT:
      return {
        ...state,
        contact_message: payload
      };
    case EDIT_CONTACT_ENDED:
      return {
        ...state,
        edit_contact_loading: false
      };

    default:
      return state;
  }
};
