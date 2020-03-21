import { gql } from 'apollo-server';

const typeDef = gql`
    type User {
        id: String
        address: String
        data: String
    }

    extend type Query {
        user(address: String!): User
    }

    input UserInput {
        "The public key derived address"
        address: String!

        "Encrypted data for storage"
        data: String!
    }

    extend type Mutation {
        createUser(user: UserInput!): User
    }
`;

export default typeDef;
