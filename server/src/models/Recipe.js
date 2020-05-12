import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    ingredients: [],
    instructions: [],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

RecipeSchema.index(
  {
    title: "text",
  },
  {
    weights: {
      title: 3,
    },
  }
);

export const Recipe = mongoose.model("Recipe", RecipeSchema);
