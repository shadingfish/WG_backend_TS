// src/schemas/typeDefs/typeDefs.ts
import { mergeTypeDefs } from '@graphql-tools/merge';
import analysisReportTypeDefs from './analysisReportTypeDefs.js';
import fieldTypeDefs from './fieldTypeDefs.js';
import samplingPointTypeDefs from './samplingPointTypeDefs.js';
import pestTypeDefs from './pestTypeDefs.js';
// import fileTypeDefs from './fileTypeDefs'; // Uncomment when file typedefs are ready

// Merge all typeDefs as an array of strings or DocumentNodes
const typeDefsArray = [
    analysisReportTypeDefs,
    fieldTypeDefs,
    samplingPointTypeDefs,
    // fileTypeDefs, // Uncomment when file typedefs are ready
    pestTypeDefs
];

const typeDefs = mergeTypeDefs(typeDefsArray);

export default typeDefs;
