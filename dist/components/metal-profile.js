var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property, html, css, LitElement } from "lit-element";
import { select } from "../toolbox/selects.js";
import { Debouncer } from "../toolbox/debouncer.js";
import { deepClone, deepEqual } from "../toolbox/deep.js";
import { mixinLoadable, LoadableState } from "../framework/mixin-loadable.js";
import { mixinModelSubscription } from "../framework/mixin-model-subscription.js";
const Component = mixinLoadable(mixinModelSubscription(LitElement));
export class MetalProfile extends Component {
    constructor() {
        super(...arguments);
        this.errorMessage = "error in profile panel";
        this.loadingMessage = "loading profile panel";
        this._changedProfile = null;
        this._inputDebouncer = new Debouncer({
            delay: 1000,
            action: () => this._handleInputChange()
        });
        this.onProfileSave = async (profile) => {
            this.model.saveProfile(profile);
        };
        this._handleInputChange = () => {
            const { profile } = this.model.reader.state;
            if (!profile)
                return;
            const newProfile = this._generateNewProfileFromInputs();
            const changes = !deepEqual(profile, newProfile);
            this._changedProfile = changes ? newProfile : null;
        };
        this._handleSaveClick = async () => {
            const { _changedProfile } = this;
            this._changedProfile = null;
            await this.onProfileSave(_changedProfile);
        };
    }
    static get styles() { return [super.styles || css ``, styles]; }
    reset() {
        this._changedProfile = null;
    }
    updated() {
        const { error, loading } = this.model.reader.state;
        this.loadableState = error
            ? LoadableState.Error
            : loading
                ? LoadableState.Loading
                : LoadableState.Ready;
    }
    _generateNewProfileFromInputs() {
        const profile = deepClone(this.model.reader.state.profile);
        const input = select("input[name=nickname]", this.shadowRoot);
        profile.nickname = input.value;
        return profile;
    }
    renderReady() {
        const { _inputDebouncer, _handleSaveClick, _handleInputChange, } = this;
        const { profile, adminClaim, premium } = this.model.reader.state;
        const showSaveButton = !!this._changedProfile;
        if (!profile)
            return null;
        return html `
			<div class="panel">
				<div class="container formarea coolbuttonarea">
					<metal-avatar
						src=${profile && profile.avatar}
						?premium=${premium}
					></metal-avatar>
					<div>
						<ul>
							${adminClaim ? html `<li data-tag="admin">Admin</li>` : null}
							${premium ? html `<li data-tag="premium">Premium</li>` : null}
						</ul>
						<input
							type="text"
							name="nickname"
							spellcheck="false"
							autocomplete="off"
							placeholder="nickname"
							@change=${_handleInputChange}
							@keyup=${_inputDebouncer.queue}
							.value=${profile.nickname}
							/>
						${showSaveButton
            ? html `
								<button
									class="save"
									@click=${_handleSaveClick}>
										Save
								</button>`
            : null}
					</div>
				</div>
				<metal-admin-mode>Admin mode</metal-admin-mode>
			</div>
		`;
    }
}
__decorate([
    property({ type: Object })
], MetalProfile.prototype, "_changedProfile", void 0);
const styles = css `
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.panel > * + * {
		margin-top: 0.5em;
	}

	.container {
		display: flex;
		flex-direction: row;
	}

	metal-avatar {
		flex: 0 0 auto;
		--avatar-size: 6em;
		border: 5px solid rgba(255,255,255, 0.5);
	}

	.container > div {
		flex: 1 1 auto;
		display: flex;
		padding: 0.5em;
		flex-direction: column;
		justify-content: center;
	}

	.container > div > * + * {
		margin-top: 0.25em;
	}

	button.save {
		margin-left: auto;
	}

	ul > li {
		opacity: 0.7;
		font-size: 0.7em;
		display: inline-block;
		padding: 0.2em 0.5em;
		border-radius: 0.5em;
		font-family: monospace;
		border: 1px solid;
	}

	input {
		width: 100%;
	}

	h3 {
		font-size: 1.1em;
	}

	@media (max-width: 450px) {
		.container {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	metal-admin-mode {
		display: block;
		padding-left: 1em;
		padding-right: 1em;
	}
`;
//# sourceMappingURL=metal-profile.js.map