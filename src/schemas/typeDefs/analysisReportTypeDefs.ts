const analysisReportTypeDefs = {
    types: `
        type AnalysisReport {
            id: ID!
            userId: String!
            analystId: String!
            outputTime: String!
            detectionTimeRange: DetectionTimeRange!
            notableSpecies: [NotableSpecies] # Represents species above the abundance threshold
            cloudReportLocation: String!
            summary: String!
            createdAt: String
            updatedAt: String
        }

        type DetectionTimeRange {
            start: String!
            end: String!
        }

        type NotableSpecies {
            fieldId: String!
            nameCode: String!
            level: String!
        }
    `,
    queries: `
        getAnalysisReports: [AnalysisReport]
        getAnalysisReport(id: ID!): AnalysisReport
        getAnalysisReportsByUserId(userId: String!): [AnalysisReport]
        getAnalysisReportsByAnalystId(analystId: String!): [AnalysisReport]
    `,
    mutations: `
        addAnalysisReport(
            userId: String!,
            analystId: String!,
            outputTime: String!,
            detectionTimeRange: DetectionTimeRangeInput!,
            notableSpecies: [NotableSpeciesInput],
            cloudReportLocation: String!,
            summary: String!
        ): AnalysisReport
    `,
    inputs: `
        input DetectionTimeRangeInput {
            start: String!
            end: String!
        }

        input NotableSpeciesInput {
            fieldId: String!
            nameCode: String!
            level: String!
        }
    `,
};

export default analysisReportTypeDefs;
