import { gql } from "apollo-server";

export const recipeType = gql`
  input RecipesInput {
    limit: Int!
    page: Int!
  }

  input RecipeInput {
    title: String!
    description: String!
    image: String!
    ingredients: [String!]!
    instructions: [String!]!
  }

  type Recipe {
    id: ID!
    title: String!
    description: String!
    image: String!
    ingredients: [String!]!
    instructions: [String!]!
    author: User!
  }

  type Recipes {
    total: Int!
    result: [Recipe]!
  }

  extend type Query {
    recipes(input: RecipesInput): Recipes!
    recipe(id: ID): Recipe!
  }

  extend type Mutation {
    createRecipe(input: RecipeInput!): Recipe!
    deleteRecipe(id: ID!): Recipe!
    updateRecipe(id: ID!, input: RecipeInput!): Recipe!
  }
`;
