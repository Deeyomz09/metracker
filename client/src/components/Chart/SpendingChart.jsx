import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import { getSpendingChart } from "../../actions/spendingChart";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8F8B66"];
const getRandomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

const SpendingChart = () => {
  const dispatch = useDispatch();

  const { chartData, loading } = useSelector((state) => state.spendingChart);

  useEffect(() => {
    dispatch(getSpendingChart());
  }, [dispatch]);

  return (
    <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">
        Spending by Category
      </h3>
      <p className="text-sm text-muted-foreground">
        Your expenses broken down by category
      </p>
      <div className="mt-12 h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingChart;
