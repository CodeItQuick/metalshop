import { select } from "../../toolbox/selects.js";
import { parse } from "./parse.js";
import { initialize } from "./initialize.js";
export async function ascertainOptionsFromDom({ selector }) {
    // grab the <metal-config> element
    const element = select(selector);
    // make sense of the config element's attributes
    const config = parse(element);
    // instantiate microservice facilities, or mocks
    return initialize(config);
}
//# sourceMappingURL=ascertain-options-from-dom.js.map