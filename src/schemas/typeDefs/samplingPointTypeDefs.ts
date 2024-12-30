const samplingPointTypeDefs = {
    types: `
        type SamplingPoint {
            id: ID!
            userId: String!
            sampleId: String!
            location: GeoPoint!
            samplingNote: String
            samplingTime: String!
            photoUrl: String
        }

        type GeoPoint {
            type: String! # Must always be "Point"
            coordinates: [Float!]! # [longitude, latitude]
        }
    `,
    queries: `
        getSamplingPoints: [SamplingPoint]
        getSamplingPoint(id: ID!): SamplingPoint
        getSamplingPointsByUserId(userId: String!): [SamplingPoint]
    `,
    mutations: `
        addSamplingPoint(
            userId: String!,
            sampleId: String!,
            location: GeoPointInput!,
            samplingNote: String,
            samplingTime: String!,
            photoUrl: String
        ): SamplingPoint

        deleteSamplingPoint(id: ID!): String
    `,
    inputs: `
        input GeoPointInput {
            type: String! # Must always be "Point"
            coordinates: [Float!]! # [longitude, latitude]
        }
    `,
};

export default samplingPointTypeDefs;
