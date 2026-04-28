import {
  GET_VEHICLES_STATED,
  GET_VEHICLES,
  GET_VEHICLES_ENDED,
  ADD_VEHICLE_STATED,
  ADD_VEHICLE,
  ADD_VEHICLE_ENDED,
  EDIT_VEHICLE_STATED,
  EDIT_VEHICLE,
  EDIT_VEHICLE_ENDED,
  GET_VEHICLE_STATED,
  GET_VEHICLE,
  GET_VEHICLE_ENDED,
  GET_ALL_VEHICLES_STATED,
  GET_ALL_VEHICLES,
  GET_ALL_VEHICLES_ENDED,
} from '../types/vehicle_type';

const initialState = {
  vehicles_loading: true,
  vehicles: null,
  page: null,
  pages: null,
  total_vehicles: 0,

  vehicle: null,
  vehicle_loading: null,

  loading: true,

  vehicle_message: null,
  all_vehicles: null,
  all_vehicles_loading: null,
  add_vehicle_loading: true,
  edit_vehicle_loading: true,
};

export const vehicle_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_VEHICLES_STATED:
      return {
        ...state,
        vehicles: null,
        pages: null,
        page: null,
        total_vehicles: 0,
        vehicles_loading: true,
      };
    case GET_VEHICLES:
      return {
        ...state,
        vehicles: payload.vehicles,
        pages: payload.pages,
        page: payload.page,
        total_vehicles: payload.count,
      };
    case GET_VEHICLES_ENDED:
      return {
        ...state,
        vehicles_loading: false,
      };
    case GET_ALL_VEHICLES_STATED:
      return {
        ...state,
        all_vehicles_loading: true,
        all_vehicles: null,
      };
    case GET_ALL_VEHICLES:
      return {
        ...state,
        all_vehicles: payload,
      };
    case GET_ALL_VEHICLES_ENDED:
      return {
        ...state,
        all_vehicles_loading: false,
      };

    case ADD_VEHICLE_STATED:
      return {
        ...state,
        vehicle_message: null,
        add_vehicle_loading: true,
      };
    case ADD_VEHICLE:
      return {
        ...state,
        vehicle_message: payload,
      };
    case ADD_VEHICLE_ENDED:
      return {
        ...state,
        add_vehicle_loading: false,
      };
    case GET_VEHICLE_STATED:
      return {
        ...state,
        vehicle: null,
        vehicle_loading: true,
      };
    case GET_VEHICLE:
      return {
        ...state,
        vehicle: payload,
      };
    case GET_VEHICLE_ENDED:
      return {
        ...state,
        vehicle_loading: false,
      };
    case EDIT_VEHICLE_STATED:
      return {
        ...state,
        vehicle_message: null,
        edit_vehicle_loading: true,
      };
    case EDIT_VEHICLE:
      return {
        ...state,
        vehicle_message: payload,
      };
    case EDIT_VEHICLE_ENDED:
      return {
        ...state,
        edit_vehicle_loading: false,
      };

    default:
      return state;
  }
};
