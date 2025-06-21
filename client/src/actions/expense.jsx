import api from "../utils/api";
import { GET_EXPENSES_SIMPLE, EXPENSES_ERROR } from "./types";

export const getSimpleExpenses = () => async (dispatch) => {
  try {
    const res = await api.get("/expense/getAllExpense");

    dispatch({
      type: GET_EXPENSES_SIMPLE,
      payload: res.data // Should be an array of { source, amount, date }
    });
  } catch (err) {
    dispatch({
      type: EXPENSES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
