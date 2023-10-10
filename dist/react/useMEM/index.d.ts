import MEM from '../../../../../../../../../src/core';
import { input, MEMResponseObject } from '../../../../../../../../../src/core/types';
import { MEMContext } from "../context";
export default function useMEM(initialFunctionId?: string): {
    currentFunction: MEM;
    setFunctionId: import("react").Dispatch<import("react").SetStateAction<string>>;
    destroyFunctionId: (functionId: string) => Promise<void>;
    allFunctions: Record<string, {
        MEM: MEM;
        loaders: import("../context/types").loaders;
    }>;
    state: any;
    read: (otherFunctionId?: string) => Promise<any>;
    write: (inputs: input[], otherFunctionId?: string) => Promise<MEMResponseObject>;
    testnet: (contractType: number, initState: string, input: string, contractSrc: string) => Promise<any>;
};
export { MEMContext };
