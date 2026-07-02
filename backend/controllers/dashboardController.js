import incomeModel from "../models/incomeModel.js";
import expenseModel from "../models/expenseModel.js";


export const getDashboard = async (req, res) => {
  try {
    const incomeResult = await incomeModel.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const expenseResult = await expenseModel.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const expenses =
 await expenseModel.find({
   user: req.user._id
 });

const categoryAnalysis = {};

expenses.forEach((expense) => {
  categoryAnalysis[expense.category] =
    (categoryAnalysis[expense.category] || 0)
    + expense.amount;
});

    const totalIncome =
      incomeResult.length > 0
        ? incomeResult[0].total
        : 0;

    const totalExpense =
      expenseResult.length > 0
        ? expenseResult[0].total
        : 0;

    const savings =
      totalIncome - totalExpense;

    // ADD THIS BLOCK HERE
    const savingsRate =
      totalIncome > 0
        ? (
            ((totalIncome -
              totalExpense) /
              totalIncome) *
            100
          ).toFixed(2)
        : 0;

    let healthScore = 0;

    if (savingsRate >= 40)
      healthScore = 95;
    else if (savingsRate >= 25)
      healthScore = 80;
    else if (savingsRate >= 10)
      healthScore = 65;
    else
      healthScore = 40;

    // RETURN IT IN RESPONSE
    res.json({
      success: true,
      totalIncome,
      totalExpense,
      savings,
      savingsRate,
      healthScore,
      categoryAnalysis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};