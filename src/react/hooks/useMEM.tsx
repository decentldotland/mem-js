import { useContext, useEffect, useState } from "react";

import MEM from "../../core";
import { KB, MEM_URL_READ, MEM_URL_TESTNET, MEM_URL_WRITE } from "../../core/constants";
import { axios } from "../../helpers";

import { input, MEMResponseObject } from "../../core/types";
import { MEMContext } from "../context";
import usePrevious from "./usePrevious";

export default function useMEM(initialFunctionId?: string) {
  const allFunctions = useContext(MEMContext);
  const [functionId, setFunctionId] = useState<string | undefined>(initialFunctionId || "");
  const prevFunctionId = usePrevious(initialFunctionId || functionId);
  const [state, setState] = useState<any>({});
  const currentFunction = allFunctions[functionId];

  // create new MEM instance if it doesn't exist yet
  if (!allFunctions[functionId]) {
    const MEMInstance = new MEM(functionId);
    allFunctions[functionId] = MEMInstance;
  }

  // Read and Populate State on functionId Change
  useEffect(() => {
    if (functionId && prevFunctionId !== functionId) {
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

  // Internal API methods

  // event emitter for read/write loading states
  function _handleLoader(type: "isReadLoading" | "isWriteLoading", newVal: boolean, functionId?: string) {
    if (!allFunctions[functionId]) return;
    allFunctions[functionId].loaders[type] = newVal;
    const event = new CustomEvent("loadStatus", {
      detail: { functionId, loaders: allFunctions[functionId].loaders }
    });
    window.dispatchEvent(event);
  }

  const _isFunctionId = () => {
    if (!functionId) throw new Error("functionId is not initialized.");
  };

  // Public API methods

  const read = async (otherFunctionId?: string) => {
    try {
      let currentFunctionId = otherFunctionId || functionId;
      if (!otherFunctionId) _isFunctionId();

      _handleLoader("isReadLoading", true, currentFunctionId);
      const responseState = (await axios.get(MEM_URL_READ + currentFunctionId)).data;
      _handleLoader("isReadLoading", false, currentFunctionId);

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

      _handleLoader("isWriteLoading", true, currentFunctionId);
      const response = (await axios.post(MEM_URL_WRITE, payload)).data as MEMResponseObject;
      _handleLoader("isWriteLoading", false, currentFunctionId);

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

  const destroyFunctionId = async (functionId: string) => {
    delete allFunctions[functionId];
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

export { MEMContext };
