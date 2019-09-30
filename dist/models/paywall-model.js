import { pubsub, makeReader } from "../toolbox/pubsub.js";
import { UserMode } from "./user-model.js";
export var PaywallMode;
(function (PaywallMode) {
    PaywallMode[PaywallMode["Loading"] = 0] = "Loading";
    PaywallMode[PaywallMode["Error"] = 1] = "Error";
    PaywallMode[PaywallMode["LoggedOut"] = 2] = "LoggedOut";
    PaywallMode[PaywallMode["NotPremium"] = 3] = "NotPremium";
    PaywallMode[PaywallMode["Premium"] = 4] = "Premium";
})(PaywallMode || (PaywallMode = {}));
export function createPaywallModel({ paywallGuardian }) {
    let getAuthContext;
    const state = {
        mode: PaywallMode.LoggedOut
    };
    const { reader, update } = makeReader(state);
    const { publish: publishLoginWithAccessToken, subscribe: subscribeLoginWithAccessToken, } = pubsub();
    // TODO paypal
    const paypalToken = `paypal-lol-fake-token`;
    return {
        reader,
        update,
        subscribeLoginWithAccessToken,
        async makeUserPremium() {
            state.mode = PaywallMode.Loading;
            update();
            const { accessToken } = await getAuthContext();
            const newAccessToken = await paywallGuardian.grantUserPremium({
                paypalToken,
                accessToken
            });
            await publishLoginWithAccessToken(newAccessToken);
            update();
        },
        async revokeUserPremium() {
            state.mode = PaywallMode.Loading;
            update();
            const { accessToken } = await getAuthContext();
            const newAccessToken = await paywallGuardian.revokeUserPremium({
                paypalToken,
                accessToken
            });
            await publishLoginWithAccessToken(newAccessToken);
            update();
        },
        async receiveUserUpdate({ mode, getAuthContext: getContext }) {
            getAuthContext = getContext;
            if (mode === UserMode.LoggedIn) {
                state.mode = PaywallMode.Loading;
                update();
                const context = await getAuthContext();
                const premium = !!context.user.claims.premium;
                state.mode = premium
                    ? PaywallMode.Premium
                    : PaywallMode.NotPremium;
            }
            else {
                state.mode = PaywallMode.LoggedOut;
            }
            update();
        },
    };
}
//# sourceMappingURL=paywall-model.js.map