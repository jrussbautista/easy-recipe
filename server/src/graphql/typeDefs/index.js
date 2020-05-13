import { gql } from "apollo-server";
import { recipeType } from "./recipeType";
import { userType } from "./userType";
import { categoryType } from "./categoryType";

const typeDef = gql`
  type Query
  type Mutation
`;

export const typeDefs = [typeDef, recipeType, userType, categoryType];
