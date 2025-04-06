// src/schemas/typeDefs/pestTypeDefs.ts

const pestTypeDefs = `#graphql
    scalar Upload
    scalar JSONObject

    type Pest {
        id: ID!
        commonName: String!
        latinName: String!
        description: String!
        distribution: [String!]!
        economicThreshold: Float!
        treatment: String!
        hardToDetect: Boolean!
        singleDetectionSevere: Boolean!
        imageURL: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        getAllPests: [Pest]
        getPestByID(id: ID!): Pest
        getPestByCommonName(commonName: String!): Pest
        getPestByLatinName(latinName: String!): Pest
    }

    type Mutation {
        addPest(
            commonName: String!,
            latinName: String!,
            description: String!,
            distribution: [String!],
            economicThreshold: Float,
            treatment: String,
            hardToDetect: Boolean,
            singleDetectionSevere: Boolean,
            imageURL: String
        ): Pest

        updatePest(
            id: ID!
            commonName: String
            latinName: String
            description: String
            distribution: [String!]
            economicThreshold: Float
            treatment: String
            hardToDetect: Boolean
            singleDetectionSevere: Boolean
            imageURL: String
        ): Pest

        deletePest(id: ID!): Boolean
        importPestSpreadsheet(file: Upload!): String
        exportPestSpreadsheet(data: [JSONObject!]!, format: String): String
    }
`
export default pestTypeDefs;
