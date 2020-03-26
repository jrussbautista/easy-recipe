import { gql } from "apollo-server";

const typeDef = gql`
  type Recipe {
    id: ID!
    name: String!
    description: String
  }

  extend type Query {
    recipe: Recipe!
  }

  input RecipeInput {
    name: String!
    description: String
  }

  extend type Mutation {
    createRecipe(data: RecipeInput): Recipe!
  }
`;

export default typeDef;
