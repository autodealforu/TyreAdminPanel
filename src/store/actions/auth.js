import api from "../../domain/api";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_PROFILE,
} from "../types/auth_type";
import { handleError } from "../../shared/handleError";
import setAuthToken from "../../domain/setAuthToken";
// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users/profile");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const registeruser = {
      username: formData.email,
      email: formData.email,
      password: formData.password,
    };
    const res = await api.post("/auth/local/register", registeruser);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch(handleError(err));
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users/login", formData);
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    setAuthToken(res.data.token);
    dispatch(loadUser());
  } catch (err) {
    dispatch(handleError(err));
  }
};
export const forgetPassword = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users/forget-password", formData);
    dispatch(
      setAlert(
        "Email Reset link successfully sent to your email. Please check your email.",
        "success"
      )
    );
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch(handleError(err));
  }
};
export const resetPassword = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users/reset-password", formData);
    console.log(res.data);
    if (res.data) {
      dispatch(setAlert("Your Password Reset Successfully", "success"));
    }
  } catch (err) {
    dispatch(handleError(err));
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  try {
    const res = await api.put("/users/profile", formData);
    console.log(res.data);
    setAuthToken(res.data.token);
    dispatch(loadUser());

    if (res.data) {
      dispatch(setAlert("Your Profile Changed Successfully", "success"));
    }
  } catch (err) {
    dispatch(handleError(err));
  }
};

export const changePassword = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/password", formData);
    console.log(res.data);
    setAuthToken(res.data.jwt);
    if (res.data) {
      dispatch(setAlert("Your Password Changed Successfully", "success"));
    }
  } catch (err) {
    dispatch(handleError(err));
  }
};
export const logout = () => async (dispatch) => {
  console.log("LOGOUT");
  setAuthToken(null);
  dispatch({ type: LOGOUT });
};
