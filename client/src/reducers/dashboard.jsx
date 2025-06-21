import { GET_DASHBOARD, DASHBOARD_ERROR } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  totalBalance: 0,
  totalExp: 0,
  totalInc: 0,
  last60DaysIncome: {
    total: 0,
    transactions: []
  },
  loading: true,
  error: {}
};

export default function dashboardReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DASHBOARD:
      return {
        ...state,
        ...payload, // this will set totalBalance, totalExp, totalInc, last60DaysIncome
        loading: false
      };
    case DASHBOARD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
