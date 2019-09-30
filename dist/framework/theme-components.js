import { mixinCss } from "./mixin-css.js";
import { objectMap } from "../toolbox/object-map.js";
export function themeComponents(theme, components) {
    return objectMap(components, Component => mixinCss(theme, Component));
}
//# sourceMappingURL=theme-components.js.map