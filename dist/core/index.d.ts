import { input, MEMResponseObject, Loaders } from "./types";
export default class MEM {
    functionId: string;
    state: any;
    loaders: Loaders;
    constructor(functionId: string);
    setFunctionId(functionId: string): void;
    private _isFunctionId;
    read(otherFunctionId?: string): Promise<any>;
    write(inputs: input[], otherFunctionId?: string): Promise<MEMResponseObject>;
    /**
     * @param contractType 0 - JavaScript, 1-9 other languages !TODO
     * @param initState JSON.stringify(state)
     * @param input @interface input JSON.stringified too
     * @param contractSrc Stringified contract source code
     */
    testnet(contractType: number, initState: string, input: string, contractSrc: string): Promise<any>;
}
