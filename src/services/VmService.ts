import Kernel from "@playos/kernel/src/Kernel";
import { ProcessEnvOptions } from "child_process";

export interface VmResult {
    code: number;
    output: string[];
}

export async function executeWasmOnVm(kernel: Kernel, bin: Buffer, args: string[], env: ProcessEnvOptions['env']): Promise<VmResult> {
    return new Promise(async (resolve) => {
        console.log('[] args -> ', args);
        const process = await kernel.createProcess(bin, args, {
            ...env,
            '$HOME': '/home/app',
            sender: 'beatsbyesco',
        });
        const output: string[] = [];

        process.on('message', (message: string) => {
            output.push(message);
        });

        process.on('exit', (code: number) => {
            resolve({
                code,
                output,
            });
        });

        process.spawn();
    });
}
