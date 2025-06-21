import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/TransactionCard";
import { getSimpleExpenses } from "../../actions/expense";
const Transaction = () => {
  const [type, setType] = useState("Expenses"); // State to track selected type

  const dispatch = useDispatch();

  const { simpleExpenses, loading } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(getSimpleExpenses());
  }, [dispatch]);

  console.log(simpleExpenses);
  // Dummy data for Expenses and Income

  const income = [
    { id: 1, source: "Salary", amount: 25000, date: "2025-06-20" },
    { id: 2, source: "Freelance", amount: 8000, date: "2025-06-18" },
    { id: 3, source: "Investment", amount: 4000, date: "2025-06-12" }
  ];

  // Select data based on type
  const nestedCards = type === "Expenses" ? simpleExpenses : income;

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setType("Expenses")}
          className={`px-4 py-2 rounded ${
            type === "Expenses"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Expenses
        </button>
        <button
          onClick={() => setType("Income")}
          className={`px-4 py-2 rounded ${
            type === "Income"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Income
        </button>
      </div>

      {/* Card component */}
      <Card
        title={type}
        content={`Showing ${nestedCards.length} transactions`}
        buttonLabel={`Add ${type}`}
        onClick={() => console.log(`Add ${type} clicked`)}
      >
        {nestedCards.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 p-4 rounded-md bg-gray-50 flex justify-between items-center hover:bg-gray-100"
          >
            {/* Left side: Title and Date */}
            <div>
              <h3 className="text-md font-medium text-gray-800">
                {item.source}
              </h3>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>

            {/* Right side: Amount */}
            <div
              className={`text-right font-semibold ${
                type === "Expenses" ? "text-red-600" : "text-green-600"
              }`}
            >
              ₱{item.amount.toLocaleString()}
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-center space-x-2 pt-4">
          <button className="px-3 py-1 border rounded hover:bg-gray-200">
            1
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-200">
            2
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-200">
            3
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Transaction;
