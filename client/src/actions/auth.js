import axios from "axios";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/auth/current");
  dispatch({ type: "FETCH_USER", payload: res.data });
};

export const logoutUser = () => async dispatch => {
  const res = await axios.get("/auth/logout");
  dispatch({ type: "LOGOUT_USER", payload: res.data });
};

export const loginWithCredentials = (email, password) => dispatch => {
  const config = {
    validateStatus: function (status) {
      return status >= 200 && status < 410; // default
    },
  }
  axios.post("/auth/local", {email, password}, config).then(res => {
    
    dispatch({ type: "LOGIN_USER", payload: res.data });
  });
};

export const setFields = (fields) => dispatch => {
  dispatch({type: "SET_FIELD", payload: fields});
}