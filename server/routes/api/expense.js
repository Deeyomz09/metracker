const express = require("express");
const router = express.Router();
const Expense = require("../../models/Expense");
const auth = require("../../middleware/auth");
const xlsx = require("xlsx");

//@route get api/exepense/add
//@desc Add expenses
//@access Private

router.post("/add", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const { source, amount, date } = req.body;
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "all fiels are required" });
    }
    const newExpense = new Expense({
      userId,
      source,
      amount,
      date: new Date(date)
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route get api/exepense/getAllIncome
//@desc Add Income
//@access Private

// need tofix // need to add by id:
router.get("/getAllExpense", auth, async (req, res) => {
  // add pagination

  const userId = req.user.id;
  try {
    const expense = await Expense.find(
      { userId },
      { source: 1, amount: 1, date: 1, _id: 0 }
    ).sort({
      date: -1
    });

    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//@route get api/exepense/deleteExpense
//@desc delete Expense
//@access Private

router.delete("/:expense_id", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.findById(req.params.expense_id);
    if (!expense) {
      return res.status(404).json({ msg: "Expense does not exists" });
    }

    if (expense.userId.toString !== userId) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await expense.deleteOne();
    res.json({ msg: "Expense removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route get api/exepense/Download Excel
//@desc Download excel
//@access Private

router.get("/download", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Expense.find({ userId }).sort({ date: -1 });
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
