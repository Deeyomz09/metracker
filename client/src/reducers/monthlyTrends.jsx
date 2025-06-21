import {
  GET_MONTHLY_TRENDS,
  MONTHLY_TRENDS_ERROR,
  CLEAR_MONTHLY_TRENDS
} from "../actions/types";

const initialState = {
  trends: [],
  loading: true,
  error: null
};

export default function monthlyTrendsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MONTHLY_TRENDS:
      return {
        ...state,
        trends: payload,
        loading: false,
        error: null
      };

    case MONTHLY_TRENDS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case CLEAR_MONTHLY_TRENDS:
      return {
        ...state,
        trends: [],
        loading: true,
        error: null
      };

    default:
      return state;
  }
}
