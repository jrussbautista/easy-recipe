import { Recipe } from "../../models";

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
  },
};
