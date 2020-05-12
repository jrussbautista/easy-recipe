import { Recipe, User } from "../../models";
import { authenticate } from "../../lib/utils";
import { ApolloError } from "apollo-server";
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
  if (!isLength(title, { min: 6 })) {
    throw new Error("Title must be  under 6 characters");
  }

  if (!isLength(description, { max: 200 })) {
    throw new Error("Description must not above 200 characters");
  }

  if (!isLength(category)) {
    throw new Error("Category is required");
  }

  if (!isLength(difficulty)) {
    throw new Error("Category is required");
  }

  if (!isLength(image)) {
    throw new Error("Image is required");
  }

  if (ingredients.length === 0) {
    throw new Error("Ingredients is required");
  }

  if (instructions.length === 0) {
    throw new Error("Instructions is required");
  }
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
      try {
        const user = await authenticate(req);
        validateRecipeInput(input);
        input.author = user;
        const image = await Cloudinary.upload(input.image);
        input.image = image;
        const recipe = await Recipe.create(input);
        return recipe;
      } catch (error) {
        throw new ApolloError(`Failed to create recipe: ${error}`);
      }
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
