import { MEM_URL_READ, MEM_URL_TESTNET, MEM_URL_WRITE } from "./constants";
import { axios } from "../helpers";
import { input, MEMResponseObject } from "./types";

export default class MEM {
  functionId: string = "";
  state: any = {};

  constructor(functionId: string) {
    if (functionId) {
      this.functionId = functionId;
      this.read(functionId);
    } else {
      console.warn("No functionId provided, set it via setFunctionId");
    }
  }

  setFunctionId(functionId: string) {
    this.functionId = functionId;
  }

  private _isFunctionId() {
    if (!this.functionId) throw new Error("functionId is not initialized.");
  }

  async read(otherFunctionId?: string) {
    try {
      let functionId = otherFunctionId || this.functionId;
      if (!otherFunctionId) this._isFunctionId();
      const state = (await axios.get(MEM_URL_READ + functionId)).data;
      this.state = state;
      return state;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  async write(inputs: input[], otherFunctionId?: string) {
    try {
      let functionId = otherFunctionId || this.functionId;
      if (!otherFunctionId) this._isFunctionId();
      const payload = {
        functionId,
        inputs
      };
      const response = (await axios.post(MEM_URL_WRITE, payload)).data as MEMResponseObject;
      const newState = response.data.execution.state;
      this.state = newState;
      return response;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  /**
   * @param contractType 0 - JavaScript, 1-9 other languages !TODO
   * @param initState JSON.stringify(state)
   * @param input @interface input JSON.stringified too
   * @param contractSrc Stringified contract source code
   */
  async testnet(contractType = 0, initState: string, input: string, contractSrc: string) {
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
  }
}
