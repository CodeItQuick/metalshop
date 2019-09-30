import { LitElement, PropertyValues } from "lit-element";
import { QuestionsModel } from "../../interfaces.js";
declare const Component: typeof LitElement & import("../../interfaces.js").ConstructorFor<import("../../framework/mixin-loadable.js").LoadableSignature> & import("../../interfaces.js").ConstructorFor<import("../../framework/mixin-model-subscription.js").ComponentWithModel<QuestionsModel>>;
export declare class MetalQuestions extends Component {
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    ["board-name"]: string;
    ["initially-hidden"]: boolean;
    draftText: string;
    minCharacterLimit: number;
    maxCharacterLimit: number;
    adminMode: boolean;
    loadingMessage: string;
    errorMessage: string;
    firstUpdated(): void;
    updated(changedProperties: PropertyValues): void;
    private _downloadQuestions;
    private _getQuestionDraft;
    private _handleTextAreaChange;
    private _warnUnauthenticatedUser;
    private _handlePostClick;
    private _prepareHandleDeleteClick;
    private _prepareHandleLikeClick;
    private _validatePost;
    private _getBoard;
    renderReady(): import("lit-element").TemplateResult;
}
export {};
