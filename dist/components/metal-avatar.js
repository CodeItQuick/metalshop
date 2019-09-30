var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, property, html, css } from "lit-element";
import { silhouette } from "../system/icons.js";
export class MetalAvatar extends LitElement {
    constructor() {
        super(...arguments);
        this.src = "";
        this.premium = false;
        this.defaultPicture = silhouette;
    }
    static get styles() { return [super.styles || css ``, styles]; }
    render() {
        const { src } = this;
        return src
            ? html `<img src=${src} alt=""/>`
            : this.defaultPicture;
    }
}
__decorate([
    property({ type: String })
], MetalAvatar.prototype, "src", void 0);
__decorate([
    property({ type: Boolean })
], MetalAvatar.prototype, "premium", void 0);
__decorate([
    property({ type: Object })
], MetalAvatar.prototype, "defaultPicture", void 0);
const styles = css `
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:host {
		display: block;
		width: var(--avatar-size, 3em);
		height: var(--avatar-size, 3em);
		max-width: var(--avatar-max-width, 100%);
		max-height: var(--avatar-max-height, 100%);
		overflow: hidden;
	}

	:host([premium]) {
		border: 2px solid yellow;
	}

	:host([hidden]) {
		display: none;
	}

	svg, img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
//# sourceMappingURL=metal-avatar.js.map