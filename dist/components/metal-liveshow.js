var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, property } from "lit-element";
import { cancel } from "../system/icons.js";
import { select } from "../toolbox/selects.js";
import { PrivilegeMode } from "../models/video-viewer-model.js";
import { mixinLoadable, LoadableState } from "../framework/mixin-loadable.js";
import { mixinModelSubscription } from "../framework/mixin-model-subscription.js";
const Component = mixinLoadable(mixinModelSubscription(LitElement));
export class MetalLiveshow extends Component {
    constructor() {
        super(...arguments);
        this.onUpdateVideo = (vimeostring) => {
            this._videoModel.updateVideo(vimeostring);
        };
        this._handleClickUpdateLivestream = () => {
            const input = select("input[name=vimeostring]", this.shadowRoot);
            this.onUpdateVideo(input.value);
            input.value = "";
        };
    }
    static get styles() { return [super.styles || css ``, styles]; }
    firstUpdated() {
        this["initially-hidden"] = false;
        const { ["video-name"]: videoName } = this;
        // weird specialized wiring
        this._videoModel = this.model.prepareVideoModel({ videoName });
        this.subscribeToReader(this._videoModel.reader);
        for (const style of Array.from(this.renderRoot.querySelectorAll("style")))
            style.style.display = "none";
    }
    updated() {
        const { errorMessage = null, loading = true } = this._videoModel.reader.state;
        this.errorMessage = errorMessage;
        this.loadableState = errorMessage
            ? LoadableState.Error
            : loading
                ? LoadableState.Loading
                : LoadableState.Ready;
    }
    _renderLoggedOut() {
        return html `
			<slot name="loggedout">
				<h2>Private video</h2>
				<p>You must be logged in to view this video</p>
			</slot>
			<div class="ghostplayer">${cancel}</div>
		`;
    }
    _renderUnprivileged() {
        return html `
			<slot name="unprivileged">
				<h2>Private video</h2>
				<p>Your account does not have privilege to watch this video</p>
			</slot>
			<div class="ghostplayer">${cancel}</div>
		`;
    }
    _renderViewer() {
        const { vimeoId } = this._videoModel.reader.state;
        const query = "?color=00a651&title=0&byline=0&portrait=0&badge=0";
        const viewer = html `
			<div class="viewer">
				<iframe
					frameborder="0"
					allowfullscreen
					allow="autoplay; fullscreen"
					src="https://player.vimeo.com/video/${vimeoId}${query}"
				></iframe>
			</div>
		`;
        const nothing = html `
			<div class="missing ghostplayer">
				<p>video missing</p>
			</div>
		`;
        return vimeoId ? viewer : nothing;
    }
    _renderPrivileged() {
        const { validationMessage } = this._videoModel.reader.state;
        return html `
			<slot></slot>
			${this._renderViewer()}
			<metal-admin-only class="adminpanel coolbuttonarea formarea" block title>
				<h3>Admin Controls</h3>
				<div class="inputarea">
					<input
						type="text"
						name="vimeostring"
						placeholder="vimeo link or id"
						/>
					<button @click=${this._handleClickUpdateLivestream}>
						update
					</button>
				</div>
				${validationMessage
            ? html `<p class="error">${validationMessage}</p>`
            : null}
			</metal-admin-only>
		`;
    }
    renderReady() {
        const { mode } = this._videoModel.reader.state;
        switch (mode) {
            case PrivilegeMode.LoggedOut: return this._renderLoggedOut();
            case PrivilegeMode.Unprivileged: return this._renderUnprivileged();
            case PrivilegeMode.Privileged: return this._renderPrivileged();
        }
    }
}
__decorate([
    property({ type: Boolean, reflect: true })
], MetalLiveshow.prototype, "initially-hidden", void 0);
__decorate([
    property({ type: String, reflect: true })
], MetalLiveshow.prototype, "video-name", void 0);
const styles = css `
	:host, :host > * {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}

	* + .ghostplayer,
	* + .viewer,
	* + metal-admin-only > .adminpanel {
		margin-top: 1em;
	}

	.ghostplayer {
		position: relative;
		display: block;
		width: 100%;
		color: var(--vimeo-ghostplayer-color, inherit);
		background: var(--vimeo-ghostplayer-background, rgba(0,0,0, 0.2));
		border: var(--vimeo-ghostplayer-border, 0.2em solid rgba(0,0,0, 0.1));
	}

	.ghostplayer::before {
		content: "";
		display: block;
		padding-top: var(--vimeo-aspect-percentage, 56.25%);
	}

	.ghostplayer svg {
		position: absolute;
		opacity: var(--vimeo-ghostplayer-icon-opacity, 0.5);
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		width: 30%;
		height: 30%;
		max-width: 10em;
	}

	.ghostplayer p {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.missing {
		opacity: 0.8;
		font-style: italic;
	}

	.viewer {
		position: relative;
	}

	.viewer::before {
		content: "";
		display: block;
		padding-top: var(--vimeo-aspect-percentage, 56.25%);
	}

	.viewer iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	metal-admin-only {
		display: block;
		max-width: 420px;
		margin-top: 0.5em;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
	}

	metal-admin-only p,
	metal-admin-only h3 {
		margin: 0.1em 0.5em;
	}

	metal-admin-only h3 {
		text-transform: uppercase;
	}

	metal-admin-only .inputarea {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	metal-admin-only .inputarea > * {
		flex: 1 1 auto;
		margin: 0.5em;
		max-width: 100%;
	}

	metal-admin-only .inputarea > button {
		flex: 0 1 auto;
		margin-left: auto;
	}

	.error {
		color: red;
		border: 1px solid;
		border-radius: 3px;
	}
`;
//# sourceMappingURL=metal-liveshow.js.map