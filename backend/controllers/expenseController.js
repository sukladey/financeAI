import expenseModel from "../models/expenseModel.js";

export const addExpense =
  async (req, res) => {
    try {
      const {
        title,
        amount,
        category,
        date,
        // userId,
        // type
      } = req.body;

      console.log("BODY:", req.body);
      console.log("USER:", req.user._id);

      const expense =
        await expenseModel.create({
          user: req.user._id,
          title,
          amount,
          category,
          date,
        });

      console.log("SAVED:", expense);

      res.status(201).json({
        success: true,
        expense,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }

    
  };

export const getExpense =
  async (req, res) => {
    const expense =
      await expenseModel.find({
        user: req.user._id
      }).sort({
        createdAt: -1
      });

    res.json({
      success: true,
      expense
    });
  };

export const deleteExpense =
  async (req, res) => {
    await expenseModel.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Expense deleted"
    });

    // console.log("BODY:", req.body);
    // console.log("USER:", req.user._id);
  };