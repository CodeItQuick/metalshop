var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement, property } from "lit-element";
import { deepEqual } from "../toolbox/deep.js";
import { mixinLoadable, LoadableState } from "../framework/mixin-loadable.js";
import { mixinModelSubscription } from "../framework/mixin-model-subscription.js";
const Component = mixinLoadable(mixinModelSubscription(LitElement));
export class MetalAdminMode extends Component {
    constructor() {
        super(...arguments);
        this.errorMessage = "error in admin controls";
        this.loadingMessage = "loading admin controls";
        this._handleAdminModeChange = (event) => {
            const adminMode = !!event.currentTarget.checked;
            const { profile } = this.model.reader.state;
            if (!profile)
                return;
            const newProfile = { ...profile, adminMode };
            const changes = !deepEqual(profile, newProfile);
            // save the new profile with admin mode
            if (changes)
                this.model.saveProfile(newProfile);
        };
    }
    static get styles() { return [super.styles || css ``, styles]; }
    firstUpdated() {
        this["initially-hidden"] = false;
    }
    updated() {
        const { error, loading } = this.model.reader.state;
        this.loadableState = error
            ? LoadableState.Error
            : loading
                ? LoadableState.Loading
                : LoadableState.Ready;
    }
    renderReady() {
        const { adminClaim, profile } = this.model.reader.state;
        return !profile || !adminClaim ? null : html `
			<input
				type="checkbox"
				?checked=${profile.adminMode}
				@change=${this._handleAdminModeChange}
				@keyup=${this._handleAdminModeChange}
				/>
			<label><slot>Admin mode</slot></label>
		`;
    }
}
__decorate([
    property({ type: Boolean, reflect: true })
], MetalAdminMode.prototype, "initially-hidden", void 0);
const styles = css `
	:host {
		color: var(--metal-admin-color, #fd34e2);
	}
`;
//# sourceMappingURL=metal-admin-mode.js.map