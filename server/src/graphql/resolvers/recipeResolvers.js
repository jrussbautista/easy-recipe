import { Recipe, User } from "../../models";
import { authenticate } from "../../lib/utils";
import { ApolloError } from "apollo-server";

export const recipeResolvers = {
  Query: {
    recipes: async (root, { input }) => {
      const page = input.page || 1;
      const limit = input.limit || 5;

      const total = await Recipe.countDocuments();

      const query = Recipe.find();
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
        input.author = user;
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
