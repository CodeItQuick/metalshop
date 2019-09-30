import { LitElement, CSSResult } from "lit-element";
export declare function themeComponents<C extends new (...args: any[]) => LitElement>(theme: CSSResult | CSSResult[], components: {
    [key: string]: C;
}): {
    [x: string]: any;
};
