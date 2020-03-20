import { gql } from 'apollo-server';

const typeDef = gql`
    type File {
        id: String
    }

    extend type Query {
        file(id: String!): File
        getBlockByNumber(id: Int!): File
    }
`;

export default typeDef;
