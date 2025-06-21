import { GET_SPENDING_CHART, SPENDING_CHART_ERROR } from "../actions/types";

const initialState = {
  chartData: [],
  loading: true,
  error: null
};

export default function spendingChartReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SPENDING_CHART:
      return {
        ...state,
        chartData: payload,
        loading: false,
        error: null
      };
    case SPENDING_CHART_ERROR:
      return {
        ...state,
        chartData: [],
        loading: false,
        error: payload
      };
    default:
      return state;
  }
}
