import { LitElement } from "lit-element";
import { ConstructorFor } from "../interfaces.js";
export declare enum LoadableState {
    Loading = 0,
    Error = 1,
    Ready = 2
}
export declare class LoadableElementError extends Error {
}
export declare class LoadableSignature extends LitElement {
    errorMessage: string;
    loadingMessage: string;
    loadableState: LoadableState;
    renderReady(): void;
}
/**
 * Add a loading spinner and error state to a lit element
 */
export declare function mixinLoadable<C extends ConstructorFor<LitElement>>(Constructor: C): typeof LitElement & ConstructorFor<LoadableSignature> & C;
