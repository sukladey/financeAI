import Budget from "../models/budgetModel.js";

export const addBudget = async (req, res) => {
  try {
    const { category, limit } = req.body;

    if (!category || !limit) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const budget = await Budget.create({
      user: req.user._id,
      category,
      limit
    });

    res.status(201).json({
      success: true,
      budget
    });


  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBudget =
  async (req, res) => {
    const budget =
      await Budget.find({
        user: req.user._id
      }).sort({
        createdAt: -1
      });

    res.json({
      success: true,
      budget
    });
  };

export const deleteBudget =
  async (req, res) => {
    await Budget.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Budget deleted"
    });
  };