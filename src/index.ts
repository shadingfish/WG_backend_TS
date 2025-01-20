// src/index.ts

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schemas/typeDefs/typeDefs.js';
import resolvers from './schemas/resolvers/resolvers.js';
import connectDB from './config/db.js';

// Starting function
const startServer = async () => {
  try {
    // connect database
    console.log(`start connect MongoDB Server`);
    await connectDB();

    // Create Apollo Server instance
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // Start Apollo Server
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit process if failed
  }
};

startServer();
  
