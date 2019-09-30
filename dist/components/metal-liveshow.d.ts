import { LitElement } from "lit-element";
import { VideoViewerModel } from "../interfaces.js";
declare const Component: typeof LitElement & import("../interfaces.js").ConstructorFor<import("../framework/mixin-loadable.js").LoadableSignature> & import("../interfaces.js").ConstructorFor<import("../framework/mixin-model-subscription.js").ComponentWithModel<VideoViewerModel>>;
export declare class MetalLiveshow extends Component {
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    ["initially-hidden"]: boolean;
    ["video-name"]: string;
    private _videoModel;
    onUpdateVideo: (vimeostring: string) => void;
    firstUpdated(): void;
    updated(): void;
    private _renderLoggedOut;
    private _renderUnprivileged;
    private _renderViewer;
    private _renderPrivileged;
    private _handleClickUpdateLivestream;
    renderReady(): import("lit-element").TemplateResult;
}
export {};
