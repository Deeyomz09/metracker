import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/TransactionCard";
import { getSimpleExpenses } from "../../actions/expense";
import { getSimpleIncomes } from "../../actions/income";
import AddTrans from "../Cards/AddTrans";

const Transaction = () => {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const [type, setType] = useState("Expenses");
  const dispatch = useDispatch();

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
    console.log("New Expense:", newExpense);
  };

  const {
    simpleExpenses = [],
    currentPage = 1,
    totalPages = 1,
    loading,
    error
  } = useSelector((state) => state.expense);

  const {
    simpleIncomes = [],
    currentPage: incomePage = 1,
    totalPages: incomeTotalPages = 1,
    loading: incomeLoading,
    error: incomeError
  } = useSelector((state) => state.income);

  useEffect(() => {
    if (type === "Expenses") {
      dispatch(getSimpleExpenses(1, 5));
    } else {
      dispatch(getSimpleIncomes(1, 5));
    }
  }, [dispatch, type]);

  const handleNext = () => {
    if (type === "Expenses" && currentPage < totalPages) {
      dispatch(getSimpleExpenses(currentPage + 1, 5));
    } else if (type === "Incomes" && incomePage < incomeTotalPages) {
      dispatch(getSimpleIncomes(incomePage + 1, 5));
    }
  };

  const handlePrev = () => {
    if (type === "Expenses" && currentPage > 1) {
      dispatch(getSimpleExpenses(currentPage - 1, 5));
    } else if (type === "Incomes" && incomePage > 1) {
      dispatch(getSimpleIncomes(incomePage - 1, 5));
    }
  };

  const nestedCards = type === "Expenses" ? simpleExpenses : simpleIncomes;

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error loading expenses.</div>
    );

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
          onClick={() => setType("Incomes")}
          className={`px-4 py-2 rounded ${
            type === "Income"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Income
        </button>
      </div>

      {/* Modal */}
      <AddTrans
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddExpense={handleAddExpense}
      />
      {/* Card */}
      <div className="mt-6 space-y-2">
        {expenses.map((e, i) => (
          <div
            key={i}
            className="p-4 border rounded-lg shadow-sm"
          >
            <div className="flex justify-between">
              <span>{e.category}</span>
              <span className="font-semibold text-blue-600">${e.amount}</span>
            </div>
          </div>
        ))}
      </div>
      <Card
        title={type}
        content={`Showing ${nestedCards.length} transactions`}
        buttonLabel={`Add ${type}`}
        onClick={() => setShowModal(true)}
      >
        {nestedCards.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 p-4 rounded-md bg-gray-50 flex justify-between items-center hover:bg-gray-100"
          >
            <div>
              <h3 className="text-md font-medium text-gray-800">
                {item.source}
              </h3>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
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
        {type === "Expenses" && (
          <div className="flex justify-center items-center space-x-2 pt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {type === "Incomes" && (
          <div className="flex justify-center items-center space-x-2 pt-4">
            <button
              onClick={handlePrev}
              disabled={incomePage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1">{`Page ${incomePage} of ${incomeTotalPages}`}</span>
            <button
              onClick={handleNext}
              disabled={incomePage === incomeTotalPages}
              className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Transaction;
