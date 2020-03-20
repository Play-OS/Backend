import { ApolloServer, gql } from 'apollo-server';
import { Connection } from 'typeorm';
import dotenv from 'dotenv';
import * as file from './schemes/File';
import * as user from './schemes/User';
import bootDatabase from './database';

export interface Context {
    connection: Connection;
}

async function bootServer() {
    dotenv.config();
    console.info('🚀 Booting GraphQL server');

    const connection = await bootDatabase();

    const typeDef = gql`
        type Query
        type Mutation
    `;

    const server = new ApolloServer({
        typeDefs: [typeDef, file.typeDef, user.typeDef],
        resolvers: [file.resolvers, user.resolvers],
        tracing: true,
        debug: false,
        context: {
            connection,
        }
    });

    const serverInfo = await server.listen();
    console.info(`🚀 GraphQL listening on ${serverInfo.url}`);
}

bootServer();
