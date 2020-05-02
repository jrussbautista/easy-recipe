import { gql } from "apollo-server";
import { recipeType } from "./recipeType";
import { userType } from "./userType";

const typeDef = gql`
  type Query
  type Mutation
`;

export const typeDefs = [typeDef, recipeType, userType];
