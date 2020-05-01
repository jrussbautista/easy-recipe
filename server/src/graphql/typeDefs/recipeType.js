import { gql } from "apollo-server";

export const recipeType = gql`
  type Query {
    recipes: String!
  }
`;
