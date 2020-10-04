export const fileStorage: { [key: string]: Buffer } = {};
export const keyStorage: { [key: string]: string } = {};

export const NodeProvider = {
    async init() {

    },
    async fetchFile(id: string): Promise<Buffer> {
        return fileStorage[id];
    },
    async storageGet(key: string): Promise<string> {
        return keyStorage[key];
    },
    async storageSet(key: string, value: string) {
        console.log('[] key, value -> ', key, value);
        keyStorage[key] = value;
    },
    async storeFile(file: Buffer, path: string) {
        const fileId = Math.random().toString();
        console.log('[] file -> ', file, path);
        fileStorage[fileId] = file;
        return fileId;
    },
    async setMapping() {},
    setMappingListener() {},
};
