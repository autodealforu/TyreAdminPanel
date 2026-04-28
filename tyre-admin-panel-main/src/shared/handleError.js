import { setAlert } from "../store/actions/alert";
import { logout } from "../store/actions/auth";
export const handleError = (err) => async (dispatch) => {
  if (err.response && err.response.data) {
    const errors = err.response.data.message;
    if (errors === "Not authorized, token failed") {
      console.log("Not Authorized");
      dispatch(logout());
    }
    dispatch(setAlert(errors, "danger"));
  }
};
