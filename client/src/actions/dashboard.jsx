import api from "../utils/api";
import { setAlert } from "./alert";
import { GET_DASHBOARD, DASHBOARD_ERROR } from "./types";

// Get Dashboard

export const dashboard = () => async (dispatch) => {
  try {
    const res = await api.get("/dashboard");
    dispatch({
      type: GET_DASHBOARD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DASHBOARD_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        payload: { msg: err.response.statusText, status: err.response.status }
      }
    });
  }
};
