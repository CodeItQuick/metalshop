import { Profile } from "authoritarian/dist/interfaces.js";
import { LitElement } from "lit-element";
import { ProfileModel } from "../interfaces.js";
declare const Component: typeof LitElement & import("../interfaces.js").ConstructorFor<import("../framework/mixin-loadable.js").LoadableSignature> & import("../interfaces.js").ConstructorFor<import("../framework/mixin-model-subscription.js").ComponentWithModel<ProfileModel>>;
export declare class MetalProfile extends Component {
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    errorMessage: string;
    loadingMessage: string;
    private _changedProfile;
    private _inputDebouncer;
    onProfileSave: (profile: Profile) => Promise<void>;
    reset(): void;
    updated(): void;
    private _handleInputChange;
    private _handleSaveClick;
    private _generateNewProfileFromInputs;
    renderReady(): import("lit-element").TemplateResult;
}
export {};
