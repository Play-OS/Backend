import { gql } from 'apollo-server';

const typeDef = gql`
    type File {
        id: String
        owner: String
        path: String
        fileLocation: String
    }

    extend type Query {
        file(path: String!, signedMessage: String!): File
    }

    extend type Mutation {
        uploadFile(file: Upload!, path: String!, signedMessage: String!): File!
    }
`;

export default typeDef;
