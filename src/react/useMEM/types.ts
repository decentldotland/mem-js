import MEM from "@/core";

export interface MEMInstance {
  MEM: MEM;
  loaders: {
    isReadLoading: boolean;
    isWriteLoading: boolean;
  };
}
