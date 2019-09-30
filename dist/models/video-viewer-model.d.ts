import { VimeoGovernorTopic } from "authoritarian/dist/interfaces.js";
import { UserModel, VideoViewerModel } from "../interfaces.js";
export declare enum PrivilegeMode {
    LoggedOut = 0,
    Unprivileged = 1,
    Privileged = 2
}
export declare function createVideoViewerModel({ user, vimeoGovernor }: {
    user: UserModel;
    vimeoGovernor: VimeoGovernorTopic;
}): VideoViewerModel;
