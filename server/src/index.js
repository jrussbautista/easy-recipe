import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs } from "./graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
