import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import typeDefs from './graphql/schema';
import userTypeDefs from './graphql/userschema';
import userResolvers from './graphql/userResolvers';
import productResolvers from './graphql/productResolver';

dotenv.config();

// Verbinding maken met MongoDB
connectDB();

const app = express();

// Apollo Server configureren
const server = new ApolloServer({
  typeDefs: [typeDefs, userTypeDefs],
  resolvers: [productResolvers, userResolvers],
  context: ({ req }) => ({ req }),
});

// Middleware om Apollo Server te integreren met Express
async function startServer() {
  await server.start();
  server.applyMiddleware({ app: app as any });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
