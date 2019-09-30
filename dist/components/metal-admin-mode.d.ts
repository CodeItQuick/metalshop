import { LitElement } from "lit-element";
import { ProfileModel } from "../interfaces.js";
declare const Component: typeof LitElement & import("../interfaces.js").ConstructorFor<import("../framework/mixin-loadable.js").LoadableSignature> & import("../interfaces.js").ConstructorFor<import("../framework/mixin-model-subscription.js").ComponentWithModel<ProfileModel>>;
export declare class MetalAdminMode extends Component {
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    errorMessage: string;
    loadingMessage: string;
    ["initially-hidden"]: boolean;
    firstUpdated(): void;
    updated(): void;
    private _handleAdminModeChange;
    renderReady(): import("lit-element").TemplateResult;
}
export {};
