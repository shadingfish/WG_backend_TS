// src/schemas/resolvers/resolvers.ts

import analysisReportResolvers from './analysisReportResolvers.js';
import fieldResolvers from './fieldResolvers.js';
import samplingPointResolvers from './samplingPointResolvers.js';
// import fileResolvers from './fileResolvers'; // Uncomment when file resolvers are needed
import pestResolvers from './pestResolvers.js';
import testResolvers from './testResolvers.js';
import scalarResolvers from "./scalars.js";

// Combined Resolvers
const resolvers = {
    ...scalarResolvers,
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
        ...testResolvers.Mutation,
    },
};

export default resolvers;

// export default [
//     scalarResolvers,              // ✅ Upload scalar
//     analysisReportResolvers,
//     fieldResolvers,
//     samplingPointResolvers,
//     pestResolvers,
//     testResolvers,
//     // fileResolvers
//   ];