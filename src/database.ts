import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import config from '../ormconfig.json';

export default async function bootDatabase(): Promise<Connection> {
    const dbConfig = {
        ...config,
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    };

    // @ts-ignore
    const connection = await createConnection(dbConfig);

    return connection;
}
