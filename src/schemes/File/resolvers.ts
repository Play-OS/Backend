import { Context } from "../../server";
import { File } from "../../entity/File";
import { uploadFile } from "../../services/FileService";

interface FileArgs {
    path: string;
    signedMessage: string;
}

interface UploadFileArgs {
    file: any;
    path: string;
    signedMessage: string;
}

const resolvers = {
    Query: {
        file: async (parent: any, args: FileArgs, context: Context, info: any) => {
            // TODO: Check the signed message first and use that address
            const file = await context.connection.getRepository(File).findOne({
                where: {
                    path: args.path,
                    owner: args.signedMessage,
                }
            });

            return file;
        },
    },
    Mutation: {
        uploadFile: async (parent: any, args: UploadFileArgs, context: Context, info: any) => {
            const file = await args.file;
            const stream = file.createReadStream();
            const fileLocation = await uploadFile(stream, Math.random().toString());

            const createdFile = new File();
            createdFile.owner = args.signedMessage;
            createdFile.fileLocation = fileLocation;
            createdFile.path = args.path;

            return context.connection.manager.save(createdFile);
        }
    }
};

export default resolvers;
