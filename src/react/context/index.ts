import { createContext } from "react";

import MEM from "@/core";
import { loaders } from "./types";

export const MEMContext = createContext<Record<string, { MEM: MEM; loaders: loaders }>>({});
