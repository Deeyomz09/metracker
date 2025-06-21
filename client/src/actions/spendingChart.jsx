import api from "../utils/api";
import { GET_SPENDING_CHART, SPENDING_CHART_ERROR } from "./types";

export const getSpendingChart = () => async (dispatch) => {
  try {
    const res = await api.get("/dashboard/spendingchart");
    dispatch({
      type: GET_SPENDING_CHART,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SPENDING_CHART_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        payload: { msg: err.response.statusText, status: err.response.status }
      }
    });
  }
};
