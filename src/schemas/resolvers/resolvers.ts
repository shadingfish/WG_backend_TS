// src/schemas/resolvers/resolvers.ts

import analysisReportResolvers from './analysisReportResolvers.js';
import fieldResolvers from './fieldResolvers.js';
import samplingPointResolvers from './samplingPointResolvers.js';
// import fileResolvers from './fileResolvers'; // Uncomment when file resolvers are needed
import pestResolvers from './pestResolvers.js';

// Combined Resolvers
const resolvers = {
    Query: {
        ...analysisReportResolvers.Query,
        ...fieldResolvers.Query,
        ...samplingPointResolvers.Query,
        // ...fileResolvers.Query, // Uncomment when file resolvers are needed
        ...pestResolvers.Query,
    },
    Mutation: {
        ...analysisReportResolvers.Mutation,
        ...fieldResolvers.Mutation,
        ...samplingPointResolvers.Mutation,
        // ...fileResolvers.Mutation, // Uncomment when file resolvers are needed
        ...pestResolvers.Mutation,
    },
};

export default resolvers;
