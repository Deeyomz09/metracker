import { GET_INCOMES_SIMPLE, INCOMES_ERROR } from "../actions/types";

const initialState = {
  simpleIncomes: [],
  loading: true,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
};

export default function incomeReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_INCOMES_SIMPLE:
      return {
        ...state,
        simpleIncomes: payload.income,
        currentPage: payload.currentPage,
        totalPages: payload.totalPages,
        totalItems: payload.totalItems,
        loading: false,
        error: null
      };
    case INCOMES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
