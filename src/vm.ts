import fs from 'fs';
import { NodeProvider } from "./services/NodeProvider";
const PlayOS = require('@playos/kernel');


export default async function bootVm() {
    // const wasmBin = fs.readFileSync('./bin/cowsay.wasm');

    PlayOS.config.setConfig({
        processWorkerUrl: './node_modules/@playos/kernel/build/process.worker.js',
    });

    return PlayOS.bootKernel('N_A', NodeProvider);

    // const process = await kernel.createProcess(wasmBin, ['cowthink', 'mogelijk zit ik binnen'], {});

    // process.on('message', (msg: string) => {
    //     console.log(msg);
    // });

    // process.spawn();
}
