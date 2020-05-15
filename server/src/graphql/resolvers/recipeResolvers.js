import { Recipe, User } from "../../models";
import { authenticate } from "../../lib/utils";
import { ApolloError, UserInputError } from "apollo-server";
import { Cloudinary } from "../../lib/cloudinary";
import isLength from "validator/lib/isLength";

const validateRecipeInput = ({
  image,
  title,
  description,
  category,
  difficulty,
  instructions,
  ingredients,
}) => {
  const errors = [];

  if (!isLength(title, { min: 6 })) {
    const error = { message: "Title must be  under 6 characters" };
    errors.push(error);
  }

  if (!isLength(description, { min: 6, max: 200 })) {
    const error = {
      message:
        "Description must be under 6 characters and not above 200 characters",
    };
    errors.push(error);
  }

  if (!isLength(category, { min: 3 })) {
    const error = { message: "Category is required" };
    errors.push(error);
  }

  if (!isLength(difficulty, { min: 3 })) {
    const error = { message: "Difficulty is required" };
    errors.push(error);
  }

  if (!isLength(image, { min: 3 })) {
    const error = { message: "Image is required" };
    errors.push(error);
  }

  if (ingredients.length === 0) {
    const error = { message: "Ingredients is required" };
    errors.push(error);
  }

  if (instructions.length === 0) {
    const error = { message: "Instructions is required" };
    errors.push(error);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const recipeResolvers = {
  Query: {
    recipes: async (root, { page, limit, keyword }) => {
      let total, query;

      if (keyword) {
        query = Recipe.find({ $text: { $search: keyword } });
        total = await Recipe.find({
          $text: { $search: keyword },
        }).countDocuments();
      } else {
        total = await Recipe.countDocuments();
        query = Recipe.find();
      }

      const skips = (page - 1) * limit;

      const recipes = await query.skip(skips).limit(limit);

      const data = {
        total,
        result: recipes,
      };

      return data;
    },
    recipe: async (root, { id }) => {
      const recipe = await Recipe.findById(id);
      return recipe;
    },
  },
  Mutation: {
    createRecipe: async (root, { input }, { req }) => {
      const user = await authenticate(req);

      const { isValid, errors } = validateRecipeInput(input);

      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      input.author = user;
      const image = await Cloudinary.upload(input.image);
      input.image = image;
      const recipe = await Recipe.create(input);
      return recipe;
    },
    deleteRecipe: async (root, { id }, { req }) => {
      try {
        const user = await authenticate(req);
        const recipe = await Recipe.findById(id);
        if (!recipe) throw new Error("Recipe not found");

        if (user.id !== recipe.author.toString())
          throw new Error("You are not allowed to delete this group");

        await recipe.remove();
        return recipe;
      } catch (error) {
        throw new ApolloError(`Failed to delete recipe: ${error}`);
      }
    },
    updateRecipe: async (root, { id, input }, { req }) => {
      try {
        const user = await authenticate(req);
        let recipe = await Recipe.findById(id);
        if (!recipe) throw new Error("Recipe not found");

        // make sure author of recipe can only update the recipe
        if (user.id !== recipe.author.toString())
          throw new Error("You are not allowed to delete this group");

        recipe = await Recipe.findByIdAndUpdate(id, input, {
          new: true,
          runValidators: true,
        });
        return recipe;
      } catch (error) {
        throw new ApolloError(`Failed to update recipe: ${error}`);
      }
    },
  },
  Recipe: {
    author: async ({ author }) => {
      const user = await User.findById(author);
      return user;
    },
  },
};
