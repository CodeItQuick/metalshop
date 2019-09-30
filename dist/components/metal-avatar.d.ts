import { LitElement } from "lit-element";
export declare class MetalAvatar extends LitElement {
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    src: string;
    premium: boolean;
    defaultPicture: import("lit-element").SVGTemplateResult;
    render(): import("lit-element").TemplateResult;
}
