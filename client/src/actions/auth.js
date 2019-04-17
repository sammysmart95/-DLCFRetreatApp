import { history } from "../App";
import { callCustomApi } from "../utils";
import { startLoading, stopLoading, showError, showInfo } from "./feedback";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = user => {
  return {
    type: LOGIN,
    user
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.clear();
    history.push("/login");
    callCustomApi("/auth/logout")
      .then(data => {
        return { type: LOGOUT };
      })
      .catch(err => {
        return { type: LOGOUT };
      });
  };
};

export const startRegister = formData => {
  return dispatch => {
    console.log("Starting register");
    dispatch(startLoading());
    callCustomApi("/auth/register", formData, "POST")
      .then(data => {
        dispatch(stopLoading());
        dispatch(showInfo("Registration Successful!"));
        console.log(data);
        history.push("/auth/adminAppPage");
      })
      .catch(err => {
        console.log(err);
        dispatch(stopLoading());
        dispatch(showError("Username or email already is use"));
      });
  };
};

export const startLogin = formData => {
  return dispatch => {
    dispatch(startLoading());
    callCustomApi("/auth/login", formData, "POST")
      .then(data => {
        dispatch(stopLoading());
        dispatch(login(data.user));
        history.push("/auth/adminAppPage");
      })
      .catch(err => {
        dispatch(stopLoading());
        dispatch(showError("Stop trying to log in... Pray!!!"));
        console.log(err);
      });
  };
};
