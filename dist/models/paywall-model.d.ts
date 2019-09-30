import { PaywallGuardianTopic } from "authoritarian/dist/interfaces.js";
import { PaywallModel } from "../interfaces.js";
export declare enum PaywallMode {
    Loading = 0,
    Error = 1,
    LoggedOut = 2,
    NotPremium = 3,
    Premium = 4
}
export declare function createPaywallModel({ paywallGuardian }: {
    paywallGuardian: PaywallGuardianTopic;
}): PaywallModel;
