import { LitElement } from "lit-element";
const _unsubscribe = Symbol();
export class ComponentWithModel extends LitElement {
    subscribeToReader(reader) { }
}
export function mixinModelSubscription(Constructor) {
    var _a, _b;
    return _b = class extends Constructor {
            constructor() {
                super(...arguments);
                this[_a] = [];
                this.model = this.constructor.model;
            }
            subscribeToReader(reader) {
                this[_unsubscribe].push(reader.subscribe(() => this.requestUpdate()));
            }
            connectedCallback() {
                super.connectedCallback();
                const { model } = this;
                if (!model)
                    throw new Error("component model missing");
                if (model.reader)
                    this.subscribeToReader(model.reader);
            }
            disconnectedCallback() {
                for (const unsubscribe of this[_unsubscribe] || []) {
                    unsubscribe();
                }
                this[_unsubscribe] = [];
                super.disconnectedCallback();
            }
        },
        _a = _unsubscribe,
        _b;
}
//# sourceMappingURL=mixin-model-subscription.js.map