import { Context } from "../../server";

const resolvers = {
    Query: {
        file: async (parent: any, args: any, context: Context, info: any) => {
            return {
                id: 'Hello world'
            };
        },

        getBlockByNumber: async (parent: any, args: any, context: Context, info: any) => {
            return {
                id: 'Hello world'
            };
        }
    }
};

export default resolvers;
