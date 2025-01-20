const samplingPointTypeDefs = `#graphql
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

        type Query {
            getSamplingPoints: [SamplingPoint]
            getSamplingPoint(id: ID!): SamplingPoint
            getSamplingPointsByUserId(userId: String!): [SamplingPoint]
        }

        type Mutation {
            getSamplingPoints: [SamplingPoint]
            getSamplingPoint(id: ID!): SamplingPoint
            getSamplingPointsByUserId(userId: String!): [SamplingPoint]
        }

        input GeoPointInput {
            type: String! # Must always be "Point"
            coordinates: [Float!]! # [longitude, latitude]
        }
    `
    
export default samplingPointTypeDefs;
