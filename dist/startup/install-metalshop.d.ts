import { AuthoritarianOptions } from "../interfaces.js";
export declare function installMetalshop(options?: AuthoritarianOptions): Promise<{
    start: () => Promise<void>;
}>;
