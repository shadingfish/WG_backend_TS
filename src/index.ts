// src/index.ts

// import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
// import typeDefs from './schemas/typeDefs/typeDefs.js';
// import resolvers from './schemas/resolvers/resolvers.js';
// import connectDB from './config/db.js';

// // Starting function
// const startServer = async () => {
//   try {
//     // connect database
//     console.log(`start connect MongoDB Server`);
//     await connectDB();

//     // Create Apollo Server instance
//     const server = new ApolloServer({
//       typeDefs,
//       resolvers,
//     });

//     // Start Apollo Server
//     const { url } = await startStandaloneServer(server, {
//       listen: { port: 4000 },
//     });

//     console.log(`🚀 Server ready at ${url}`);
//   } catch (error) {
//     console.error('Error starting server:', error);
//     process.exit(1); // Exit process if failed
//   }
// };

// startServer();
  
// src/index.ts
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemas/typeDefs/typeDefs.js';
import resolvers from './schemas/resolvers/resolvers.js';
import connectDB from './config/db.js';
// import { graphqlUploadExpress } from 'graphql-upload-ts';
import { graphqlUploadExpress } from 'graphql-upload';
import cors from 'cors';
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    console.log(`🔌 Connecting MongoDB...`);
    await connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      // Using graphql-upload without CSRF prevention is very insecure.
      // csrfPrevention: true,
      cache: 'bounded',
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    });

    await server.start();

    const app = express();

    app.use(cors()); // ✅ Allow Apollo Sandbox access
    app.use(graphqlUploadExpress({ maxFileSize: 10_000_000, maxFiles: 1 })); // ✅ 上传中间件

    server.applyMiddleware({ app });

    await new Promise<void>(r => app.listen({ port: 4000 }, r));

    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);

    // app.listen(PORT, () => {
    //   console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    // });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
