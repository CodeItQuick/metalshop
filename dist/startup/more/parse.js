import { AuthoritarianStartupError } from "../../system/errors.js";
const err = (message) => new AuthoritarianStartupError(message);
export function parse(element) {
    if (!element)
        throw err(`<metal-config> required, missing`);
    return {
        mock: element.getAttribute("mock"),
        authServer: element.getAttribute("auth-server"),
        vimeoServer: element.getAttribute("vimeo-server"),
        profileServer: element.getAttribute("profile-server"),
        paywallServer: element.getAttribute("paywall-server"),
        scheduleServer: element.getAttribute("schedule-server"),
        questionsBoardServer: element.getAttribute("questions-server"),
    };
}
//# sourceMappingURL=parse.js.map