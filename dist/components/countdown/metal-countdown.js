var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, property } from "lit-element";
import { clock } from "../../system/icons.js";
import { mixinModelSubscription } from "../../framework/mixin-model-subscription.js";
import { styles } from "./metal-countdown-styles.js";
import { formatDate, formatDuration } from "./dates.js";
const timeOffset = (new Date()).getTimezoneOffset() * 60 * 1000;
const Component = mixinModelSubscription(LitElement);
export class MetalCountdown extends Component {
    constructor() {
        super(...arguments);
        this.adminValidationMessage = "";
        this.adminDate = NaN;
        this.adminTime = NaN;
        this._handleUpdateDate = (event) => {
            const input = event.target;
            this.adminDate = input.valueAsNumber;
            this._updateValidation();
        };
        this._handleUpdateTime = (event) => {
            const input = event.target;
            this.adminTime = input.valueAsNumber;
            this._updateValidation();
        };
        this._updateValidation = () => {
            const { adminDateTime } = this;
            let message = "enter a valid date and time to schedule";
            if (!isNaN(adminDateTime)) {
                if ((adminDateTime) > Date.now()) {
                    message = "";
                }
                else {
                    message = "cannot schedule the past";
                }
            }
            this.adminValidationMessage = message;
        };
        this._handleScheduleClick = async () => {
            const { adminDateTime } = this;
            const time = adminDateTime;
            await this._countdownModel.setEventTime(time);
        };
    }
    static get styles() { return [super.styles || css ``, styles]; }
    get adminDateTime() {
        const { adminDate, adminTime } = this;
        const dateTime = timeOffset + adminDate + adminTime;
        return dateTime;
    }
    async firstUpdated() {
        this["initially-hidden"] = false;
        const { key, model } = this;
        if (!key)
            throw new Error(`schedule-countdown requires [key] attribute`);
        const countdownModel = this._countdownModel
            = model.prepareCountdownModel({ key });
        this.subscribeToReader(countdownModel.reader);
        await countdownModel.refreshEventTime();
        this._timer = setInterval(() => this.requestUpdate(), 1000);
        this._updateValidation();
    }
    disconnectedCallback() {
        if (this._timer !== undefined) {
            clearInterval(this._timer);
            this._timer = undefined;
        }
        super.disconnectedCallback();
    }
    render() {
        if (!this._countdownModel)
            return html ``;
        const { eventTime } = this._countdownModel.reader.state;
        const eventSchedule = formatDate(eventTime);
        const timeUntilEvent = eventTime - Date.now();
        const countdownDuration = formatDuration(timeUntilEvent);
        const { adminValidationMessage } = this;
        return html `
			<div class="icon-area">
				${clock}
			</div>
			<div class="content-area">
				${timeUntilEvent > 0 ? html `
					<div class="countdown">
						<slot>
							<h2>Next event</h2>
						</slot>
						<p class="start-time">
							<strong>Scheduled start:</strong>
							<span>
								<span>${eventSchedule.datestring}</span>, at
								<span>${eventSchedule.timestring}</span>
								<span>(${eventSchedule.zonestring})</span>
							</span>
						</p>
						<p class="countdown-time">
							<strong>Countdown:</strong>
							<span>
								<span>${countdownDuration.days}</span>
								<span>${countdownDuration.hours}</span>
								<span>${countdownDuration.minutes}</span>
								<span>${countdownDuration.seconds}</span>
							</span>
						</p>
					</div>
				` : html `
					<div>
						<slot name="expired">
							<h2>Next event: To Be Determined</h2>
							<p>Check back soon!</p>
						</slot>
					</div>
				`}
				<metal-admin-only class="controls coolbuttonarea" block header>
					<input
						type="date"
						@keyUp=${this._handleUpdateDate}
						@change=${this._handleUpdateDate}
						@mouseUp=${this._handleUpdateDate}
					/>
					<input
						type="time"
						@keyUp=${this._handleUpdateTime}
						@change=${this._handleUpdateTime}
						@mouseUp=${this._handleUpdateTime}
					/>
					<button
						@click=${this._handleScheduleClick}
						?disabled=${!!adminValidationMessage}
						class="coolbutton schedule-button">
							Schedule
					</button>
					${adminValidationMessage ? html `
						<p class="validation">${adminValidationMessage}</p>
					` : null}
				</metal-admin-only>
			</div>
		`;
    }
}
__decorate([
    property({ type: Boolean, reflect: true })
], MetalCountdown.prototype, "initially-hidden", void 0);
__decorate([
    property({ type: String })
], MetalCountdown.prototype, "key", void 0);
__decorate([
    property({ type: String })
], MetalCountdown.prototype, "adminValidationMessage", void 0);
__decorate([
    property({ type: String })
], MetalCountdown.prototype, "adminDate", void 0);
__decorate([
    property({ type: String })
], MetalCountdown.prototype, "adminTime", void 0);
//# sourceMappingURL=metal-countdown.js.map