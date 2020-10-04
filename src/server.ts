import { ApolloServer, gql } from 'apollo-server-express';
import { Connection } from 'typeorm';
import dotenv from 'dotenv';
import express from 'express';
import * as file from './schemes/File';
import * as user from './schemes/User';
import * as vm from './schemes/Vm';
import bootDatabase from './database';
import bootVm from './vm';
import Kernel from '@playos/kernel/src/Kernel';

export interface Context {
    connection: Connection;
    kernel: Kernel;
}

async function bootServer() {
    dotenv.config();
    console.info('🚀 Booting GraphQL server');

    const connection = await bootDatabase();
    const kernel = await bootVm();

    const typeDef = gql`
        type Query
        type Mutation
    `;

    const server = new ApolloServer({
        uploads: true,
        typeDefs: [typeDef, file.typeDef, user.typeDef, vm.typeDef],
        resolvers: [file.resolvers, user.resolvers, vm.resolvers],
        tracing: true,
        debug: true,
        context: {
            connection,
            kernel,
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
