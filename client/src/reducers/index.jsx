import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import dashboard from "./dashboard";
import monthlyTrends from "./monthlyTrends";
import spendingChart from "./spendingChart";
import expense from "./expense";
import income from "./income";
export default combineReducers({
  alert,
  auth,
  dashboard,
  monthlyTrends,
  spendingChart,
  expense,
  income
});
