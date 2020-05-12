import { gql } from "apollo-server";

export const recipeType = gql`
  input RecipeInput {
    title: String!
    description: String!
    image: String!
    category: String!
    difficulty: String!
    ingredients: [String!]!
    instructions: [String!]!
  }

  type Recipe {
    id: ID!
    title: String!
    description: String!
    image: String!
    category: String!
    ingredients: [String!]!
    instructions: [String!]!
    difficulty: String!
    author: User!
    ratingsCount: Int!
    likesCount: Int!
  }

  type Recipes {
    total: Int!
    result: [Recipe]!
  }

  extend type Query {
    recipes(page: Int!, limit: Int!, keyword: String): Recipes!
    recipe(id: ID): Recipe!
  }

  extend type Mutation {
    createRecipe(input: RecipeInput!): Recipe!
    deleteRecipe(id: ID!): Recipe!
    updateRecipe(id: ID!, input: RecipeInput!): Recipe!
  }
`;
