import { TokenStorageTopic } from "authoritarian/dist/interfaces.js";
import { UserModel, LoginPopupRoutine, DecodeAccessToken } from "../interfaces.js";
export declare enum UserMode {
    Error = 0,
    Loading = 1,
    LoggedIn = 2,
    LoggedOut = 3
}
export declare function createUserModel({ tokenStorage, loginPopupRoutine, decodeAccessToken, }: {
    tokenStorage: TokenStorageTopic;
    loginPopupRoutine: LoginPopupRoutine;
    decodeAccessToken: DecodeAccessToken;
}): UserModel;
