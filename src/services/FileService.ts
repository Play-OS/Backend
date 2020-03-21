import fs from 'fs';

export function uploadFile(stream: any, fileName: string): Promise<string> {
    return new Promise((resolve) => {
        const writeStream = fs.createWriteStream(`./public/uploads/${fileName}`);
        stream.pipe(writeStream);

        stream.on('end', () => {
            resolve(`${process.env.HOST}/uploads/${fileName}`);
        })
    });
}
