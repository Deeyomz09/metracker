const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = Expense = mongoose.model("expense", ExpenseSchema);
