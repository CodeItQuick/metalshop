import { LitElement } from "lit-element";
import { ScheduleModel } from "../../interfaces.js";
declare const Component: typeof LitElement & import("../../interfaces.js").ConstructorFor<import("../../framework/mixin-model-subscription.js").ComponentWithModel<ScheduleModel>>;
export declare class MetalCountdown extends Component {
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    ["initially-hidden"]: boolean;
    key: string;
    adminValidationMessage: string;
    adminDate: number;
    adminTime: number;
    private _countdownModel;
    private _timer;
    private get adminDateTime();
    firstUpdated(): Promise<void>;
    disconnectedCallback(): void;
    private _handleUpdateDate;
    private _handleUpdateTime;
    private _updateValidation;
    private _handleScheduleClick;
    render(): import("lit-element").TemplateResult;
}
export {};
