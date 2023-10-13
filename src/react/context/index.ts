import { createContext } from "react";

import MEM from "../../core";

export const MEMContext = createContext<Record<string, MEM>>({});
