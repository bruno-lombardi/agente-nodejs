import axios from "axios";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/auth/current");
  dispatch({ type: "FETCH_USER", payload: res.data });
};