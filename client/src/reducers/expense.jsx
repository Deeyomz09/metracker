import { GET_EXPENSES_SIMPLE, EXPENSES_ERROR } from "../actions/types";

const initialState = {
  simpleExpenses: [],
  loading: true,
  error: null
};

export default function expenseReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXPENSES_SIMPLE:
      return {
        ...state,
        simpleExpenses: payload, // Array of { source, amount, date }
        loading: false,
        error: null
      };
    case EXPENSES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
