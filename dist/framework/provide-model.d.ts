import { SimpleModel } from "../interfaces.js";
import { ComponentWithModel } from "./mixin-model-subscription.js";
export declare function provideModel<C extends new (...args: any[]) => ComponentWithModel, M extends SimpleModel = SimpleModel>(model: M, Constructor: C): C;
