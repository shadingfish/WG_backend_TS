// src/schemas/resolvers/resolvers.ts

import analysisReportResolvers from './analysisReportResolvers';
import fieldResolvers from './fieldResolvers';
import samplingPointResolvers from './samplingPointResolvers';
// import fileResolvers from './fileResolvers'; // Uncomment when file resolvers are needed

// Combined Resolvers
const resolvers = {
    Query: {
        ...analysisReportResolvers.Query,
        ...fieldResolvers.Query,
        ...samplingPointResolvers.Query,
        // ...fileResolvers.Query, // Uncomment when file resolvers are needed
    },
    Mutation: {
        ...analysisReportResolvers.Mutation,
        ...fieldResolvers.Mutation,
        ...samplingPointResolvers.Mutation,
        // ...fileResolvers.Mutation, // Uncomment when file resolvers are needed
    },
};

export default resolvers;
