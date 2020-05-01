import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

export const Recipe = mongoose.model("Recipe", RecipeSchema);
