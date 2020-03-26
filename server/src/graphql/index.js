import recipes from "./recipes";
import { gql } from "apollo-server";

const typeDef = gql`
  type Query
  type Mutation
`;

const typeDefs = [typeDef, recipes.typeDef];
const resolvers = [recipes.resolver];

export { typeDefs, resolvers };
