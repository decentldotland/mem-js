import MEM from "@/core";
import { KB, MEM_URL_READ, MEM_URL_TESTNET, MEM_URL_WRITE } from "@/core/constants";
import { axios } from "@/helpers";

import { input, MEMResponseObject } from "@/core/types";
import { MEMContext } from "@/react/context";
import useMEM from "@/react/useMEM";
import { MEMInstance } from "./react/useMEM/types";

// Create Context for MEM instances
export default MEM;
export { useMEM };
export { MEMContext }; // Export MEMContext so it can be provided at the top level
export type { input, MEMResponseObject, MEMInstance };
export { axios };
export { KB, MEM_URL_READ, MEM_URL_TESTNET, MEM_URL_WRITE };
