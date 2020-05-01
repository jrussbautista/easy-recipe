import { gql } from "apollo-server";

export const recipeType = gql`
  type Recipe {
    id: ID!
    title: String!
    description: String!
    image: String!
  }

  type Recipes {
    total: Int!
    result: [Recipe]!
  }

  type Query {
    recipes: Recipes!
  }
`;
