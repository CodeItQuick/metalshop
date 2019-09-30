export declare class Debouncer {
    private _delay;
    private _action;
    private _timeout;
    constructor({ action, delay }: {
        delay: number;
        action: () => void;
    });
    queue: () => void;
}
