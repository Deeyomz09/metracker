import api from "../utils/api";
import { GET_EXPENSES_SIMPLE, EXPENSES_ERROR } from "./types";

export const getSimpleExpenses =
  (page = 1, limit = 5) =>
  async (dispatch) => {
    try {
      const res = await api.get(
        `/expense/getAllExpense?page=${page}&limit=${limit}`
      );

      dispatch({
        type: GET_EXPENSES_SIMPLE,
        payload: res.data // { expenses, currentPage, totalPages, totalItems }
      });
    } catch (err) {
      dispatch({
        type: EXPENSES_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
