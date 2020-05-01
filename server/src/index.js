import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs } from "./graphql";
import { connectDb } from "./database";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const start = async () => {
  await connectDb();
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

start();
