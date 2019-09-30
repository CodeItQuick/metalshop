import { LitElement } from "lit-element";
import { UserModel } from "../interfaces.js";
declare const Component: typeof LitElement & import("../interfaces.js").ConstructorFor<import("../framework/mixin-loadable.js").LoadableSignature> & import("../interfaces.js").ConstructorFor<import("../framework/mixin-model-subscription.js").ComponentWithModel<UserModel>>;
export declare class MetalAccount extends Component {
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    loadingMessage: string;
    errorMessage: string;
    ["initially-hidden"]: boolean;
    get ["logged-in"](): boolean;
    onLoginClick: (event: MouseEvent) => void;
    onLogoutClick: (event: MouseEvent) => void;
    firstUpdated(): void;
    updated(): void;
    private _renderLoggedIn;
    private _renderLoggedOut;
    renderReady(): import("lit-element").TemplateResult;
}
export {};
