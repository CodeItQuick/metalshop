export class Debouncer {
    constructor({ action, delay }) {
        this._timeout = null;
        this.queue = () => {
            if (this._timeout !== null) {
                clearTimeout(this._timeout);
                this._timeout = null;
            }
            this._timeout = setTimeout(() => {
                this._action();
                this._timeout = null;
            }, this._delay);
        };
        this._action = action;
        this._delay = delay;
    }
}
//# sourceMappingURL=debouncer.js.map