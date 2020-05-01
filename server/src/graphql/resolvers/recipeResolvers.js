import { Recipe } from "../../models";

export const recipeResolvers = {
  Query: {
    recipes: async () => {
      const total = await Recipe.countDocuments();
      const recipes = await Recipe.find();

      const data = {
        total,
        result: recipes,
      };

      return data;
    },
  },
};
