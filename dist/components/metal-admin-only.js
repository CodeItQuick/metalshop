var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement, property } from "lit-element";
import { mixinLoadable, LoadableState } from "../framework/mixin-loadable.js";
import { mixinModelSubscription } from "../framework/mixin-model-subscription.js";
const Component = mixinLoadable(mixinModelSubscription(LitElement));
export class MetalAdminOnly extends Component {
    constructor() {
        super(...arguments);
        this.errorMessage = "error in admin area";
        this.loadingMessage = "loading admin area";
        this["admin"] = false;
        this["not-admin"] = true;
    }
    static get styles() { return [super.styles || css ``, styles]; }
    firstUpdated() {
        this["initially-hidden"] = false;
    }
    updated() {
        const { error, loading, admin } = this.model.reader.state;
        this["admin"] = admin;
        this["not-admin"] = !admin;
        this.loadableState = error
            ? LoadableState.Error
            : loading
                ? LoadableState.Loading
                : LoadableState.Ready;
    }
    renderReady() {
        const { admin } = this;
        return !admin ? null : html `
			${!!this["header"] ? html `
				<p class="header"><strong>Admin-only controls</strong></p>
			` : null}
			<slot></slot>
		`;
    }
}
__decorate([
    property({ type: Boolean, reflect: true })
], MetalAdminOnly.prototype, "initially-hidden", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MetalAdminOnly.prototype, "block", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MetalAdminOnly.prototype, "header", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MetalAdminOnly.prototype, "admin", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MetalAdminOnly.prototype, "not-admin", void 0);
const styles = css `
	:host {
		color: var(--metal-admin-color, #ff5c98);
		--coolbutton-background: var(--metal-admin-color, #ff5c98);
	}
	:host([block]) {
		display: block;
		padding: 1em 0.5em !important;
		border: 1px solid;
		border-radius: 3px;
	}
	:host([not-admin]) {
		display: none !important;
	}
	.header {
		opacity: 0.5;
		font-size: 1.2em;
		text-transform: uppercase;
		margin-bottom: 0.5em;
	}
`;
//# sourceMappingURL=metal-admin-only.js.map