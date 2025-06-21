import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyTrends } from "../../actions/monthlyTrends";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const MonthlyTrends = () => {
  const dispatch = useDispatch();
  const { trends, loading } = useSelector((state) => state.monthlyTrends);
  useEffect(() => {
    dispatch(fetchMonthlyTrends());
  }, [dispatch]);

  return (
    <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">
        Monthly Trends
      </h3>
      <p className="text-sm text-muted-foreground">
        Income vs Expenses over time
      </p>
      <div className="w-full h-96">
        <ResponsiveContainer>
          <BarChart
            data={trends}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Income"
              fill="#82ca9d"
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="Expense"
              fill="#ff7f50"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyTrends;
