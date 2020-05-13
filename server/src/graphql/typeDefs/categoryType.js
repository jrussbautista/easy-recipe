import { gql } from "apollo-server";

export const categoryType = gql`
  type Category {
    id: ID!
    title: String!
    image: String!
    recipes(page: Int!, limit: Int!): Recipes
  }

  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category!
  }
`;
