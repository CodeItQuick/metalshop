import { LitElement } from "lit-element";
import { PaywallModel } from "../interfaces.js";
declare const Component: typeof LitElement & import("../interfaces.js").ConstructorFor<import("../framework/mixin-loadable.js").LoadableSignature> & import("../interfaces.js").ConstructorFor<import("../framework/mixin-model-subscription.js").ComponentWithModel<PaywallModel>>;
export declare class MetalPaywall extends Component {
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    loadingMessage: string;
    onMakeUserPremium: () => Promise<void>;
    onRevokeUserPremium: () => Promise<void>;
    updated(): void;
    private _renderNotPremium;
    private _renderPremium;
    renderReady(): import("lit-element").TemplateResult;
}
export {};
