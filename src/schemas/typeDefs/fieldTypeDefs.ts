const fieldTypeDefs = `#graphql
        type Field {
            id: ID!
            field: String!
            userId: String!
            updateTime: String!
            soilType: String
            geoLocation: GeoLocation!
            cityOrTown: String
            crops: [String]
        }

        type GeoLocation {
            type: String! # Should always be "Polygon"
            coordinates: [[[Float!]]]! # A nested array of coordinates representing the polygon
        }

        type Query {
            getFields: [Field]
            getField(id: ID!): Field
            getFieldsByUserId(userId: String!): [Field]
        }

        type Mutation {
            addField(
                field: String!,
                userId: String!,
                updateTime: String,
                soilType: String,
                geoLocation: GeoLocationInput!,
                cityOrTown: String,
                crops: [String]
            ): Field
        }

        input GeoLocationInput {
            type: String! # Should always be "Polygon"
            coordinates: [[[Float!]]]! # A nested array of coordinates for the polygon
        }
    `

export default fieldTypeDefs;
