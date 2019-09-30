var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, property, html, css } from "lit-element";
import { UserMode } from "../models/user-model.js";
import { mixinLoadable, LoadableState } from "../framework/mixin-loadable.js";
import { mixinModelSubscription } from "../framework/mixin-model-subscription.js";
const Component = mixinLoadable(mixinModelSubscription(LitElement));
export class MetalAccount extends Component {
    constructor() {
        super(...arguments);
        this.loadingMessage = "loading user panel";
        this.errorMessage = "user account system error";
        this.onLoginClick = () => {
            this.model.login();
        };
        this.onLogoutClick = () => {
            this.model.logout();
        };
        this._renderLoggedIn = () => html `
		<slot></slot>
		<div class="logout coolbuttonarea">
			<button @click=${this.onLogoutClick}>
				Logout
			</button>
		</div>
	`;
        this._renderLoggedOut = () => html `
		<div class="login coolbuttonarea">
			<button @click=${this.onLoginClick}>
				Login
			</button>
		</div>
	`;
    }
    static get styles() { return [super.styles || css ``, styles]; }
    get ["logged-in"]() {
        return this.model.reader.state.mode === UserMode.LoggedIn;
    }
    firstUpdated() {
        this["initially-hidden"] = false;
    }
    updated() {
        const { mode } = this.model.reader.state;
        this.loadableState = (mode === UserMode.Error)
            ? LoadableState.Error
            : (mode === UserMode.Loading)
                ? LoadableState.Loading
                : LoadableState.Ready;
    }
    renderReady() {
        const { _renderLoggedIn, _renderLoggedOut, ["logged-in"]: loggedIn, } = this;
        return html `
			<slot name="top"></slot>
			${loggedIn ? _renderLoggedIn() : _renderLoggedOut()}
			<slot name="bottom"></slot>
		`;
    }
}
__decorate([
    property({ type: Boolean, reflect: true })
], MetalAccount.prototype, "initially-hidden", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MetalAccount.prototype, "logged-in", null);
const styles = css `
	:host {
		display: block;
	}

	div {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.login {
		justify-content: var(--user-panel-login-justify, center);
	}

	.logout {
		justify-content: var(--user-panel-logout-justify, flex-end);
	}

	* + div {
		margin-top: var(--user-panel-margins, 0.5em);
	}

	::slotted(*) {
		display: block;
		margin-top: var(--user-panel-margins, 0.5em) !important;
	}

	::slotted(*:first-child) {
		margin-top: unset !important;
	}
`;
//# sourceMappingURL=metal-account.js.map