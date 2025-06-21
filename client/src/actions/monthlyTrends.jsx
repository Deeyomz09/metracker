import api from "../utils/api";
import { GET_MONTHLY_TRENDS, MONTHLY_TRENDS_ERROR } from "./types";

// Fetch monthly trends
export const fetchMonthlyTrends = () => async (dispatch) => {
  try {
    const res = await api.get("/dashboard/monthlytrends");

    dispatch({
      type: GET_MONTHLY_TRENDS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MONTHLY_TRENDS_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        payload: { msg: err.response.statusText, status: err.response.status }
      }
    });
  }
};
