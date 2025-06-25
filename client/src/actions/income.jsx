import api from "../utils/api";
import { GET_INCOMES_SIMPLE, INCOMES_ERROR } from "./types";

export const getSimpleIncomes =
  (page = 1, limit = 5) =>
  async (dispatch) => {
    try {
      const res = await api.get(
        `/income/getAllIncome?page=${page}&limit=${limit}`
      );

      dispatch({
        type: GET_INCOMES_SIMPLE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: INCOMES_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
