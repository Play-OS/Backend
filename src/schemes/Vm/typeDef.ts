import { gql } from 'apollo-server';

const typeDef = gql`
    type VmResult {
        code: Int
        output: [String]
    }

    extend type Query {
        executeResult(address: String!): VmResult
    }

    input EnvMap {
        key: String!
        value: String!
    }

    input ExecuteInput {
        args: [String]!
        env: [EnvMap]
    }

    extend type Mutation {
        execute(address: String!, input: ExecuteInput!): VmResult
    }
`;

export default typeDef;
