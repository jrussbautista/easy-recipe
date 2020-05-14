require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs } from "./graphql";
import { connectDb } from "./database";

const start = async () => {
  await connectDb();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    playground: true,
    introspection: true,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

start();
