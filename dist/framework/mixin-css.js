export function mixinCss(styles, Component) {
    const css = Array.isArray(styles) ? styles : [styles];
    const C = Component;
    return class ComponentWithStyle extends C {
        static get styles() {
            return [
                ...css,
                super.styles || []
            ];
        }
    };
}
//# sourceMappingURL=mixin-css.js.map