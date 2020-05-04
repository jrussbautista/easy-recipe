import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({
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
});

export const Recipe = mongoose.model("Recipe", RecipeSchema);
