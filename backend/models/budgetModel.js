import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },

    limit: {
      type: Number,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const budgetModel =
  mongoose.models.budget ||
  mongoose.model("budget", budgetSchema);

export default budgetModel;