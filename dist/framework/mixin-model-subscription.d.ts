import { LitElement } from "lit-element";
import { Reader } from "../toolbox/pubsub.js";
import { SimpleModel, ConstructorFor } from "../interfaces.js";
export declare abstract class ComponentWithModel<M extends SimpleModel = SimpleModel> extends LitElement {
    static model: SimpleModel;
    model: M;
    subscribeToReader(reader: Reader): void;
}
export declare function mixinModelSubscription<M extends SimpleModel, C extends ConstructorFor<LitElement>>(Constructor: C): typeof LitElement & ConstructorFor<ComponentWithModel<M>> & C;
