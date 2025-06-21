const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Expense = require("../../models/Expense");
const Income = require("../../models/Income");
const auth = require("../../middleware/auth");
const { isValidObjectId, Types } = require("mongoose");

//@route get api/dashboard/
//@desc check total expense and income
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);

    // console.log("totalExpense", {
    //   totalExpense,
    //   userId: isValidObjectId(userId)
    // });

    const last60daysDaysIncome = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const incomeLast60days = last60daysDaysIncome.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const totalExp = totalExpense[0]?.totalAmount || 0;
    const totalInc = totalIncome[0]?.totalAmount || 0;
    const totalBalance = totalInc - totalExp;

    res.json({
      totalBalance,
      totalExp,
      totalInc,
      last60DaysIncome: {
        total: incomeLast60days,
        transactions: last60daysDaysIncome
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/incomeRange", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required." });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const incomes = await Income.find({
      userId,
      date: { $gte: start, $lte: end }
    }).sort({ date: -1 });

    const total = incomes.reduce((sum, income) => sum + income.amount, 0);

    res.json({
      total,
      count: incomes.length,
      startDate,
      endDate,
      incomes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route get api/dashboard/monthlyTrends
//@desc check total expense and income per month
//@access Private

router.get("/monthlytrends", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const incomeTrends = await Income.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          totalIncome: { $sum: "$amount" }
        }
      }
    ]);

    // Group Expense by Month
    const expenseTrends = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          totalExpense: { $sum: "$amount" }
        }
      }
    ]);

    // Merge results
    const resultMap = {};

    incomeTrends.forEach((item) => {
      resultMap[item._id] = {
        month: item._id,
        totalIncome: item.totalIncome,
        totalExpense: 0
      };
    });

    expenseTrends.forEach((item) => {
      if (resultMap[item._id]) {
        resultMap[item._id].totalExpense = item.totalExpense;
      } else {
        resultMap[item._id] = {
          month: item._id,
          totalIncome: 0,
          totalExpense: item.totalExpense
        };
      }
    });

    const result = Object.values(resultMap)
      .map((entry) => {
        const [year, month] = entry.month.split("-");
        const date = new Date(`${year}-${month}-01`);
        return {
          month: date.toLocaleString("en-US", { month: "short" }), // "Mar"
          Income: entry.totalIncome,
          Expense: entry.totalExpense
        };
      })
      .sort((a, b) => {
        const monthA = new Date(`2020-${a.month}-01`);
        const monthB = new Date(`2020-${b.month}-01`);
        return monthA - monthB;
      });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route get api/dashboard/spendingchart
//@desc check expenses by category
//@access Private

router.get("/spendingchart", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const expenseTrends = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: "$source",
          value: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,

          name: "$_id",
          value: 1 // rename '_id' (which is source) to 'name'
        }
      }
    ]);

    res.json(expenseTrends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
