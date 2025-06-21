import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboard } from "../../actions/dashboard"; // adjust path as needed
import InfoCards from "../Cards/InfoCards";
import SpendingChart from "../Chart/SpendingChart";
import MonthlyTrends from "../Chart/MonthlyTrends";
import RecentTranscation from "../Cards/RecentTranscation";
const Dashboard = () => {
  const dispatch = useDispatch();

  const { totalBalance, totalInc, totalExp, loading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(dashboard());
  }, [dispatch]);
  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 ">
        <InfoCards
          label="Total Balance"
          desc="Current balance across all accounts"
          value={`$${totalBalance?.toFixed(2) || "0.00"}`}
        />
        <InfoCards
          label="Total Income"
          desc="All time incoming funds"
          value={`$${totalInc?.toFixed(2) || "0.00"}`}
        />
        <InfoCards
          label="Total Expenses"
          desc="All time outgoing funds"
          value={`$${totalExp?.toFixed(2) || "0.00"}`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SpendingChart />
        <MonthlyTrends />
      </div>
      <div>
        <RecentTranscation />
      </div>
    </div>
  );
};

export default Dashboard;
