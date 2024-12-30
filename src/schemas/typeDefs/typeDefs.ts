import { mergeTypeDefs } from '@graphql-tools/merge';
import analysisReportTypeDefs from './analysisReportTypeDefs';
import fieldTypeDefs from './fieldTypeDefs';
import samplingPointTypeDefs from './samplingPointTypeDefs';
// import fileTypeDefs from './fileTypeDefs'; // Uncomment when file typedefs are ready

// Merge all typeDefs as an array of strings or DocumentNodes
const typeDefsArray = [
    analysisReportTypeDefs,
    fieldTypeDefs,
    samplingPointTypeDefs,
    // fileTypeDefs, // Uncomment when file typedefs are ready
];

const typeDefs = mergeTypeDefs(typeDefsArray);

export default typeDefs;
