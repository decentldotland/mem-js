import { useContext, useEffect, useState } from "react";

import MEM from "@/core";
import { KB, MEM_URL_READ, MEM_URL_TESTNET, MEM_URL_WRITE } from "@/core/constants";
import { axios } from "@/helpers";

import { input, MEMResponseObject } from "@/core/types";
import { MEMContext } from "../context";
import { MEMInstance } from "./types";

// Create Context for MEM instances

export default function useMEM(initialFunctionId?: string) {
  const allFunctions = useContext(MEMContext);
  const [functionId, setFunctionId] = useState<string | undefined>(initialFunctionId || "");
  const [state, setState] = useState<any>({});
  const currentFunction = allFunctions[functionId]?.MEM;

  if (!allFunctions[functionId]) {
    const instance = new MEM(functionId);
    allFunctions[functionId] = {
      MEM: instance,
      loaders: {
        isReadLoading: null,
        isWriteLoading: null
      }
    } as MEMInstance;
  }

  function handleLoader(type: "isReadLoading" | "isWriteLoading", newVal: boolean, functionId?: string) {
    if (!allFunctions[functionId]) return;
    allFunctions[functionId].loaders[type] = newVal;
    const event = new CustomEvent("loaderChanged", {
      detail: { loaders: allFunctions[functionId].loaders, functionId }
    });
    window.dispatchEvent(event);
  }

  // Effect to handle read operation
  useEffect(() => {
    if (functionId) {
      read(functionId);
    } else {
      console.warn("No functionId provided, set it via setFunctionId");
    }
  }, [functionId]);

  useEffect(() => {
    if (JSON.stringify(state).length >= 750 * KB) console.warn("State size over 750 KB");
  }, [state]);

  useEffect(() => {
    if (Object.keys(allFunctions).length >= 10) console.warn("Instantiated 10 functions -- might decrease performance");
  }, [allFunctions]);

  const _isFunctionId = () => {
    if (!functionId) throw new Error("functionId is not initialized.");
  };

  const destroyFunctionId = async (functionId: string) => {
    delete allFunctions[functionId];
  };

  const read = async (otherFunctionId?: string) => {
    try {
      let currentFunctionId = otherFunctionId || functionId;
      if (!otherFunctionId) _isFunctionId();

      handleLoader("isReadLoading", true, currentFunctionId);
      const responseState = (await axios.get(MEM_URL_READ + currentFunctionId)).data;
      handleLoader("isReadLoading", false, currentFunctionId);

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

      handleLoader("isWriteLoading", true, currentFunctionId);
      const response = (await axios.post(MEM_URL_WRITE, payload)).data as MEMResponseObject;
      handleLoader("isWriteLoading", false, currentFunctionId);

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
    currentFunction,
    setFunctionId,
    destroyFunctionId,
    allFunctions,
    state,
    read,
    write,
    testnet
  };
}

export { MEMContext }; // Export MEMContext so it can be provided at the top level
