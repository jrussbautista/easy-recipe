import { recipeResolvers } from "./recipeResolvers";
import { userResolvers } from "./userResolvers";
import { categoryResolvers } from "./categoryResolver";

export const resolvers = [recipeResolvers, userResolvers, categoryResolvers];
