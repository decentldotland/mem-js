import { createContext, useContext, useEffect, useState } from "react";

import MEM from "./core";
import { input, MEMResponseObject } from "./core/types";
import { MEM_URL_READ, MEM_URL_TESTNET, MEM_URL_WRITE } from "./core/constants";
import { axios } from "./helpers";

// Create Context for MEM instances
const MEMContext = createContext<Record<string, MEM>>({});

export function useMEM(initialFunctionId?: string) {
  const memInstances = useContext(MEMContext);
  const [functionId, setFunctionId] = useState<string | undefined>(initialFunctionId || "");
  const [state, setState] = useState<any>({});

  // Initialize MEM instance if needed
  if (!memInstances[functionId]) {
    memInstances[functionId] = new MEM(functionId);
  }

  // Effect to handle read operation
  useEffect(() => {
    if (functionId) {
      read(functionId);
    } else {
      console.warn("No functionId provided, set it via setFunctionId");
    }
  }, [functionId]);

  const _isFunctionId = () => {
    if (!functionId) throw new Error("functionId is not initialized.");
  };

  const read = async (otherFunctionId?: string) => {
    try {
      let currentFunctionId = otherFunctionId || functionId;
      if (!otherFunctionId) _isFunctionId();
      const responseState = (await axios.get(MEM_URL_READ + currentFunctionId)).data;
      setState(responseState);
      return responseState;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  const write = async (inputs: input[], otherFunctionId?: string) => {
    try {
      let currentFunctionId = otherFunctionId || functionId;
      if (!otherFunctionId) _isFunctionId();
      const payload = {
        functionId: currentFunctionId,
        inputs
      };
      const response = (await axios.post(MEM_URL_WRITE, payload)).data as MEMResponseObject;
      const newState = response.data.execution.state;
      setState(newState);
      return response;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  const testnet = async (contractType = 0, initState: string, input: string, contractSrc: string) => {
    try {
      const response = await axios.post(MEM_URL_TESTNET, {
        contractType,
        initState,
        input,
        contractSrc
      });
      return response.data;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  return {
    memInstance: memInstances[functionId],
    state,
    setFunctionId,
    read,
    write,
    testnet
  };
}

export { MEMContext }; // Export MEMContext so it can be provided at the top level
