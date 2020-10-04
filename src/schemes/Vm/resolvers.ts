import fs from 'fs';
import { promisify } from 'util';
import { Context } from "../../server";
import { User } from "../../entity/User";
import { executeWasmOnVm } from '../../services/VmService';
import config from '../../../config.json';

const readFile = promisify(fs.readFile);

interface UserArgs {
    address: string;
}

interface ExecuteArgs {
    address: string;
    input: {
        args: string[];
        env: {
            key: string;
            value: string;
        }[] | null
    }
}

const resolvers = {
    Query: {
        user: async (parent: any, args: UserArgs, context: Context, info: any) => {
            const user = await context.connection.getRepository(User).findOne({
                where: {
                    address: args.address,
                }
            });

            return user;
        },
    },
    Mutation: {
        execute: async (parent: any, args: ExecuteArgs, context: Context, info: any) => {
            const binaryPath = config.bins.find(bin => bin.address === args.address);

            if (!binaryPath) {
                return null;
            }

            const wasmBin = await readFile(binaryPath.path);
            const result = await executeWasmOnVm(context.kernel, wasmBin, args.input.args, {});

            return result;
        },
    }
};

export default resolvers;
