import { makeReader } from "../toolbox/pubsub.js";
const expiryGraceSeconds = 60;
export var UserMode;
(function (UserMode) {
    UserMode[UserMode["Error"] = 0] = "Error";
    UserMode[UserMode["Loading"] = 1] = "Loading";
    UserMode[UserMode["LoggedIn"] = 2] = "LoggedIn";
    UserMode[UserMode["LoggedOut"] = 3] = "LoggedOut";
})(UserMode || (UserMode = {}));
export function createUserModel({ tokenStorage, loginPopupRoutine, decodeAccessToken, }) {
    let authContext;
    const state = {
        getAuthContext: null,
        mode: UserMode.Loading,
    };
    const { reader, update } = makeReader(state);
    const userLoading = () => {
        state.mode = UserMode.Loading;
        state.getAuthContext = null;
        update();
    };
    const userLogin = ({ getAuthContext }) => {
        state.mode = UserMode.LoggedIn;
        state.getAuthContext = getAuthContext;
        update();
    };
    const userError = (error) => {
        state.mode = UserMode.Error;
        state.getAuthContext = null;
        console.error(error);
        update();
    };
    const userLogout = () => {
        state.mode = UserMode.LoggedOut;
        state.getAuthContext = null;
        update();
    };
    /** Receive and decode an access token for login
     * - return an async getter which seamlessly refreshes expired tokens
     * - we pass around a getter instead of an auth context, because auth
     *   context can expire, and so consumers are expected to use this getter
     *   for each new interacton */
    function processAccessToken(accessToken) {
        authContext = decodeAccessToken(accessToken);
        return {
            async getAuthContext() {
                const gracedExp = (authContext.exp - expiryGraceSeconds);
                const expired = gracedExp < (Date.now() / 1000);
                if (expired) {
                    const accessToken = await tokenStorage.passiveCheck();
                    authContext = decodeAccessToken(accessToken);
                }
                return authContext;
            }
        };
    }
    return {
        reader,
        /** Initial passive check, to see if we're already logged in */
        async start() {
            update();
            userLoading();
            try {
                const accessToken = await tokenStorage.passiveCheck();
                if (accessToken) {
                    userLogin(processAccessToken(accessToken));
                }
                else {
                    userLogout();
                }
            }
            catch (error) {
                console.error("user-model error in start()");
                console.error(error);
                userError(error);
            }
        },
        /** Process a new token as a login
         * - some services might return new tokens from the auth server for you */
        async receiveLoginWithAccessToken(accessToken) {
            const detail = processAccessToken(accessToken);
            await tokenStorage.writeAccessToken(accessToken);
            userLogin(detail);
        },
        /** Trigger a user login routine */
        async login() {
            userLogout();
            // userLoading()
            try {
                const authTokens = await loginPopupRoutine();
                await tokenStorage.writeTokens(authTokens);
                userLogin(processAccessToken(authTokens.accessToken));
            }
            catch (error) {
                console.error(error);
                // userError(error)
            }
        },
        /** Trigger a user logout routine */
        async logout() {
            userLoading();
            try {
                await tokenStorage.clearTokens();
                authContext = null;
                userLogout();
            }
            catch (error) {
                console.error(error);
                userError(error);
            }
        },
    };
}
//# sourceMappingURL=user-model.js.map