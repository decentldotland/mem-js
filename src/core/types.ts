interface anyJson {
  [key: string]: any;
}

export interface state extends anyJson {}

export interface validity extends anyJson {}

export interface requests extends anyJson {}

export interface errors extends anyJson {}

export interface tags {
  name: string;
  value: string;
}

export interface input {
  input: Record<string, string>;
  tags?: tags[];
}

export interface MEMResponseObject {
  status: "SUCCESS";
  data: {
    pseudoId: string;
    execution: {
      state: state;
      result: any;
      validity: validity;
      exmContext: {
        requests: requests;
        kv: any;
      };
      updated: boolean;
      errors: errors;
    };
  };
}

export interface MEM {
  setFunctionId(functionId: string): void;
  read(otherFunctionId?: string): Promise<state | undefined>;
  write(inputs: input[], otherFunctionId?: string): Promise<MEMResponseObject | undefined>;
  testnet(
    contractType: number,
    initState: string,
    input: string,
    contractSrc: string
  ): Promise<MEMResponseObject | undefined>;
}
