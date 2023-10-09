import { createContext, useContext } from "react";
import MEM from ".";

export const MEMContext = createContext<Record<string, MEM>>({});

export function useMEM(functionId: string): MEM {
  const memInstances = useContext(MEMContext);

  // If there's no instance with the given functionId, create one
  if (!memInstances[functionId]) {
    memInstances[functionId] = new MEM(functionId);
  }

  return memInstances[functionId];
}

// import { useEffect, useState } from "react";
// import { MEM_URL_READ, MEM_URL_TESTNET, MEM_URL_WRITE } from "./constants";
// import { axios } from "../helpers";
// import { input, MEMResponseObject } from "./types";

// export function useMEM(initialFunctionId?: string) {
//   const [functionId, setFunctionId] = useState<string | undefined>(
//     initialFunctionId || ""
//   );

//   const [state, setState] = useState<any>({});

//   useEffect(() => {
//     if (functionId) {
//       read(functionId);
//     } else {
//       console.warn("No functionId provided, set it via setFunctionId");
//     }
//   }, [functionId]);

//   const _isFunctionId = () => {
//     if (!functionId) throw new Error("functionId is not initialized.");
//   };

//   const read = async (otherFunctionId?: string) => {
//     try {
//       let currentFunctionId = otherFunctionId || functionId;
//       if (!otherFunctionId) _isFunctionId();
//       const responseState = (await axios.get(MEM_URL_READ + currentFunctionId))
//         .data;
//       setState(responseState);
//       return responseState;
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const write = async (inputs: input[], otherFunctionId?: string) => {
//     try {
//       let currentFunctionId = otherFunctionId || functionId;
//       if (!otherFunctionId) _isFunctionId();
//       const payload = {
//         functionId: currentFunctionId,
//         inputs
//       };
//       const response = (await axios.post(MEM_URL_WRITE, payload))
//         .data as MEMResponseObject;
//       const newState = response.data.execution.state;
//       setState(newState);
//       return response;
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const testnet = async (
//     contractType = 0,
//     initState: string,
//     input: string,
//     contractSrc: string
//   ) => {
//     try {
//       const response = await axios.post(MEM_URL_TESTNET, {
//         contractType,
//         initState,
//         input,
//         contractSrc
//       });
//       return response.data;
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return { state, setFunctionId, read, write, testnet };
// }
