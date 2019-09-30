import { pubsub } from "../toolbox/pubsub.js";
import { makeReader } from "../toolbox/pubsub.js";
import { AuthoritarianProfileError } from "../system/errors.js";
import { UserMode } from "./user-model.js";
export function createProfileModel({ profileMagistrate }) {
    let getAuthContext;
    let cancel = false;
    const state = {
        error: null,
        admin: false,
        loading: true,
        profile: null,
        premium: false,
        adminClaim: false,
    };
    const computeAdmin = () => {
        state.admin = state.adminClaim && state.profile && state.profile.adminMode;
    };
    const { reader, update } = makeReader(state);
    const { publish: publishReset, subscribe: subscribeReset, } = pubsub();
    async function loadProfile() {
        const { user } = await getAuthContext();
        const { userId } = user;
        const profile = await profileMagistrate.getProfile({ userId });
        if (!profile) {
            const error = new AuthoritarianProfileError(`failed to load profile`);
            console.error(error);
            state.error = error;
        }
        computeAdmin();
        update();
        return profile;
    }
    return {
        reader,
        update,
        subscribeReset,
        async saveProfile(profile) {
            try {
                state.loading = true;
                update();
                const { accessToken } = await getAuthContext();
                await profileMagistrate.setProfile({ accessToken, profile });
                state.profile = profile;
            }
            catch (error) {
                state.error = error;
                state.profile = null;
                console.error(error);
            }
            state.loading = false;
            computeAdmin();
            update();
        },
        async receiveUserUpdate({ mode, getAuthContext: getContext }) {
            getAuthContext = getContext;
            if (mode === UserMode.LoggedIn) {
                publishReset();
                cancel = false;
                state.loading = true;
                update();
                const { user } = await getAuthContext();
                state.adminClaim = !!user.claims.admin;
                state.premium = !!user.claims.premium;
                update();
                try {
                    const profile = await loadProfile();
                    state.profile = cancel ? null : profile;
                }
                catch (error) {
                    console.error(error);
                    state.error = error;
                }
                state.loading = false;
            }
            else if (mode === UserMode.Loading) {
                cancel = true;
                state.error = null;
                state.loading = true;
                state.profile = null;
                state.premium = false;
            }
            else if (mode === UserMode.Error) {
                cancel = true;
                state.error = new AuthoritarianProfileError("profile error");
                state.loading = true;
                state.profile = null;
                state.premium = false;
            }
            else {
                state.error = null;
                state.loading = false;
                state.profile = null;
                state.premium = false;
            }
            computeAdmin();
            update();
        },
    };
}
//# sourceMappingURL=profile-model.js.map