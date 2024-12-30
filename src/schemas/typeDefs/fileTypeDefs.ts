// const fileTypeDefs = `
//     type File {
//         id: ID!
//         filename: String!
//         mimetype: String!
//         encoding: String!
//         url: String!
//         createdAt: String!
//         updatedAt: String!
//     }

//     input FileUploadInput {
//         filename: String!
//         mimetype: String!
//         encoding: String!
//         content: String! # base64 encoded content
//     }

//     input FileUpdateInput {
//         id: ID!
//         filename: String
//         mimetype: String
//         encoding: String
//         content: String
//     }

//     extend type Mutation {
//         uploadFile(file: FileUploadInput!): File!
//         updateFile(file: FileUpdateInput!): File!
//         deleteFile(id: ID!): String!
//     }

//     extend type Query {
//         getFile(id: ID!): File
//         getFiles: [File]
//     }
// `;

// module.exports = fileTypeDefs;
