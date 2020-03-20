import { ValidationError, UserInputError } from 'apollo-server';
import { validate } from 'class-validator';
import { Context } from "../../server";
import { User } from "../../entity/User";

interface UserArgs {
    address: string;
}

interface CreateUserArgs {
    user: {
        address: string;
        data: string;
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
        createUser: async (parent: any, args: CreateUserArgs, context: Context, info: any) => {
            const user = new User();
            user.address = args.user.address;
            user.data = args.user.data;

            const errors = await validate(user, {
                dismissDefaultMessages: true,
            });

            if (errors.length) {
                throw new UserInputError('Validation Errors', {
                    validationErrors: errors,
                });
            }

            const createdUser = await context.connection.manager.save(user);
            return createdUser;
        },
    }
};

export default resolvers;
