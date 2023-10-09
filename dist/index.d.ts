import MEM from "./core";
import { input, MEMResponseObject } from "./core/types";
declare const MEMContext: import("react").Context<Record<string, MEM>>;
export declare function useMEM(initialFunctionId?: string): {
    memInstance: MEM;
    state: any;
    setFunctionId: import("react").Dispatch<import("react").SetStateAction<string>>;
    read: (otherFunctionId?: string) => Promise<any>;
    write: (inputs: input[], otherFunctionId?: string) => Promise<MEMResponseObject>;
    testnet: (contractType: number, initState: string, input: string, contractSrc: string) => Promise<any>;
};
export { MEMContext };
