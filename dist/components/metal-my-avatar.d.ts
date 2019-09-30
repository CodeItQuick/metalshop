import { ProfileModel } from "../interfaces.js";
import { LitElement } from "lit-element";
declare const Component: typeof LitElement & import("../interfaces.js").ConstructorFor<import("../framework/mixin-model-subscription.js").ComponentWithModel<ProfileModel>>;
export declare class MetalMyAvatar extends Component {
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    render(): import("lit-element").TemplateResult;
}
export {};
