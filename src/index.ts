import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schemas/typeDefs/typeDefs';
import resolvers from './schemas/resolvers/resolvers';
import connectDB from './config/db';

// Starting function
const startServer = async () => {
  try {
    // connect database
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
  
