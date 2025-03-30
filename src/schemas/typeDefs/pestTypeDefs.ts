// src/schemas/typeDefs/pestTypeDefs.ts

const pestTypeDefs = `#graphql
        type Pest {
            id: ID!
            commonName: String!
            LatinName: String!
            description: String!
            treatment: String
            imageURL: String
            createdAt: String
            updatedAt: String
        }

        type Query {
            getAllPests: [Pest]
            getPestByID(id: ID!): Pest
            getPestByCommonName(commonName: String!): Pest
            getPestByLatinName(LatinName: String!): Pest
        }

        type Mutation {
            addPest(
                commonName: String!,
                LatinName: String!,
                description: String!,
                treatment: String,
                imageURL: String,
            ): Pest
        }
    `

export default pestTypeDefs;
