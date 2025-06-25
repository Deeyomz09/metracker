const express = require("express");
const router = express.Router();
const Income = require("../../models/Income");
const auth = require("../../middleware/auth");
const xlsx = require("xlsx");
//@route get api/income/add
//@desc Add income
//@access Private

router.post("/add", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const { source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "all fiels are required" });
    }

    const newIncome = new Income({
      userId,
      source,
      amount,
      date: new Date(date)
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route get api/income/getAllIncome
//@desc Add Income
//@access Private

router.get("/getAllIncome", auth, async (req, res) => {
  const userId = req.user.id;
  // add pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    const income = await Income.find(
      { userId },
      { source: 1, amount: 1, date: 1, _id: 0 }
    )
      .sort({
        date: -1
      })
      .skip(skip)
      .limit(limit);

    const total = await Expense.countDocuments({ userId });

    res.json({
      income,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//@route get api/income/deleteIncome
//@desc delete Incomee
//@access Private

router.delete("/:income_id", auth, async (req, res) => {
  const userId = req.user.params;
  try {
    const income = await Income.findById(req.params.income_id);
    if (!income) {
      return res.status(404).json({ msg: "income does not exists" });
    }
    if (income.userId.toString !== userId) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await income.deleteOne();
    res.json({ msg: "Income removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route get api/income/Download Excel
//@desc Download excel
//@access Private

router.get("/download", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
