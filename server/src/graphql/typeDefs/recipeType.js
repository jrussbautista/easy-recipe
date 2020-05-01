import { gql } from "apollo-server";

export const recipeType = gql`
  input RecipeInput {
    limit: Int!
    page: Int!
  }

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
    recipes(input: RecipeInput): Recipes!
  }
`;
