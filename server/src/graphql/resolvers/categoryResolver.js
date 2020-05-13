import { ApolloError } from "apollo-server";
import { Category, Recipe } from "../../models";

export const categoryResolvers = {
  Query: {
    categories: async () => {
      try {
        const categories = await Category.find();
        return categories;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    category: async (root, { id }) => {
      try {
        const category = await Category.findById(id);
        if (!category) throw new ApolloError("Category not found");
        return category;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  Category: {
    recipes: async ({ title }, { limit, page }) => {
      const total = await Recipe.find({ category: title }).countDocuments();
      const query = Recipe.find({ category: title });

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
