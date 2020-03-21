import { ApolloServer, gql } from 'apollo-server-express';
import { Connection } from 'typeorm';
import dotenv from 'dotenv';
import express from 'express';
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
        uploads: true,
        typeDefs: [typeDef, file.typeDef, user.typeDef],
        resolvers: [file.resolvers, user.resolvers],
        tracing: true,
        debug: true,
        context: {
            connection,
        }
    });

    const app = express();
    server.applyMiddleware({ app });
    app.use(express.static('public', {
        setHeaders: (res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    }));

    app.listen(4000, () => {
        console.info(`🚀 GraphQL listening on ${4000}`);
    });
}

bootServer();
